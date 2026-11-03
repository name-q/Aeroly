import React from 'react';
import './index.less';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

export type ScreenMap = Partial<Record<Breakpoint, boolean>>;

const responsiveArray: Breakpoint[] = ['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const responsiveMap: Record<Breakpoint, string> = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
  xxxl: '(min-width: 1920px)',
};

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const;
const RowJustify = ['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'] as const;

type RowAlign = (typeof RowAligns)[number];
type RowJustifyType = (typeof RowJustify)[number];
type ResponsiveLike<T> = Partial<Record<Breakpoint, T>>;

export type Gutter = number | string | undefined | Partial<Record<Breakpoint, number>>;

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid spacing; `[horizontal, vertical]`, supports responsive objects */
  gutter?: Gutter | [Gutter, Gutter];
  /** Vertical alignment */
  align?: RowAlign | ResponsiveLike<RowAlign>;
  /** Horizontal arrangement */
  justify?: RowJustifyType | ResponsiveLike<RowJustifyType>;
  /** Whether to wrap automatically */
  wrap?: boolean;
}

type ColSpanType = number | string;
type FlexType = number | 'none' | 'auto' | (string & {});

export interface ColSize {
  flex?: FlexType;
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Partial<Record<Breakpoint, ColSpanType | ColSize>> {
  /** Flex layout style */
  flex?: FlexType;
  /** Number of cells to occupy, 0 means `display: none` */
  span?: ColSpanType;
  /** Raster order */
  order?: ColSpanType;
  /** Number of cells to the left of the grid */
  offset?: ColSpanType;
  /** Number of cells that raster is moved to the right */
  push?: ColSpanType;
  /** Number of cells that raster is moved to the left */
  pull?: ColSpanType;
}

const isPlainObject = (v: unknown): v is Record<string, any> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export function useBreakpoint(): ScreenMap | null {
  const [screens, setScreens] = React.useState<ScreenMap | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const entries = (Object.keys(responsiveMap) as Breakpoint[]).map(
      (bp) => [bp, window.matchMedia(responsiveMap[bp])] as const,
    );
    const update = () => {
      const next: ScreenMap = {};
      entries.forEach(([bp, mql]) => {
        next[bp] = mql.matches;
      });
      setScreens(next);
    };
    update();
    entries.forEach(([, mql]) => mql.addEventListener?.('change', update));
    return () => entries.forEach(([, mql]) => mql.removeEventListener?.('change', update));
  }, []);

  return screens;
}

function getMergedPropByScreen<T extends string>(
  prop: T | ResponsiveLike<T> | undefined,
  screens: ScreenMap | null,
): T | '' {
  if (typeof prop === 'string') return prop;
  if (isPlainObject(prop)) {
    for (const bp of responsiveArray) {
      if (screens?.[bp] && prop[bp] !== undefined) return prop[bp] as T;
    }
  }
  return '';
}

type Gap = number | string | undefined;

function useGutter(gutter: RowProps['gutter'], screens: ScreenMap | null): [Gap, Gap] {
  const results: [Gap, Gap] = [undefined, undefined];
  const normalized = Array.isArray(gutter) ? gutter : [gutter, undefined];
  const merged: ScreenMap = screens || {
    xs: true, sm: true, md: true, lg: true, xl: true, xxl: true, xxxl: true,
  };

  normalized.forEach((g, index) => {
    if (isPlainObject(g)) {
      for (const bp of responsiveArray) {
        if (merged[bp] && g[bp] !== undefined) {
          results[index] = g[bp] as number;
          break;
        }
      }
    } else {
      results[index] = g as Gap;
    }
  });
  return results;
}

const half = (g: Gap, sign: 1 | -1) =>
  typeof g === 'number' ? `${(g / 2) * sign}px` : `calc(${g} / ${2 * sign})`;

interface RowContextState {
  gutter?: [Gap, Gap];
  wrap?: boolean;
}

const RowContext = React.createContext<RowContextState>({});

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ gutter = 0, align, justify, wrap, className, style, children, ...rest }, ref) => {
    const hasResponsive =
      isPlainObject(align) ||
      isPlainObject(justify) ||
      (Array.isArray(gutter) ? gutter : [gutter]).some(isPlainObject);
    const screens = useBreakpoint();
    const activeScreens = hasResponsive ? screens : null;

    const mergedAlign = getMergedPropByScreen(align, activeScreens);
    const mergedJustify = getMergedPropByScreen(justify, activeScreens);
    const [gutterH, gutterV] = useGutter(gutter, activeScreens);

    const cls = [
      'aero-row',
      wrap === false ? 'aero-row-no-wrap' : '',
      mergedJustify ? `aero-row-${mergedJustify}` : '',
      mergedAlign ? `aero-row-${mergedAlign}` : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const rowStyle: React.CSSProperties = {};
    if (gutterH) rowStyle.marginInline = half(gutterH, -1);
    if (gutterV) rowStyle.rowGap = gutterV;

    const ctx = React.useMemo<RowContextState>(
      () => ({ gutter: [gutterH, gutterV], wrap }),
      [gutterH, gutterV, wrap],
    );

    return (
      <RowContext.Provider value={ctx}>
        <div ref={ref} className={cls} style={{ ...rowStyle, ...style }} {...rest}>
          {children}
        </div>
      </RowContext.Provider>
    );
  },
);

Row.displayName = 'Row';

function parseFlex(flex: FlexType): string {
  if (flex === 'auto') return '1 1 auto';
  if (typeof flex === 'number') return `${flex} ${flex} auto`;
  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) return `0 0 ${flex}`;
  return flex;
}

const sizes: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'];

const isSet = (v: unknown) => v !== undefined && v !== null && v !== '';

export const Col = React.forwardRef<HTMLDivElement, ColProps>((props, ref) => {
  const { gutter, wrap } = React.useContext(RowContext);
  const {
    span,
    order,
    offset,
    push,
    pull,
    flex,
    className,
    style,
    children,
    xs,
    sm,
    md,
    lg,
    xl,
    xxl,
    xxxl,
    ...rest
  } = props;

  const sizeProps = { xs, sm, md, lg, xl, xxl, xxxl };
  const sizeCls: string[] = [];
  const sizeStyle: Record<string, string> = {};

  sizes.forEach((size) => {
    const raw = sizeProps[size];
    let cfg: ColSize = {};
    if (typeof raw === 'number' || typeof raw === 'string') cfg = { span: raw };
    else if (isPlainObject(raw)) cfg = raw;

    if (isSet(cfg.span)) sizeCls.push(`aero-col-${size}-${cfg.span}`);
    if (isSet(cfg.order)) sizeCls.push(`aero-col-${size}-order-${cfg.order}`);
    if (isSet(cfg.offset)) sizeCls.push(`aero-col-${size}-offset-${cfg.offset}`);
    if (isSet(cfg.push)) sizeCls.push(`aero-col-${size}-push-${cfg.push}`);
    if (isSet(cfg.pull)) sizeCls.push(`aero-col-${size}-pull-${cfg.pull}`);
    if (isSet(cfg.flex)) {
      sizeCls.push(`aero-col-${size}-flex`);
      sizeStyle[`--aero-col-${size}-flex`] = parseFlex(cfg.flex!);
    }
  });

  const cls = [
    'aero-col',
    isSet(span) ? `aero-col-${span}` : '',
    order ? `aero-col-order-${order}` : '',
    offset ? `aero-col-offset-${offset}` : '',
    push ? `aero-col-push-${push}` : '',
    pull ? `aero-col-pull-${pull}` : '',
    ...sizeCls,
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = {};
  if (gutter?.[0]) mergedStyle.paddingInline = half(gutter[0], 1);
  if (flex || flex === 0) {
    mergedStyle.flex = parseFlex(flex);
    if (wrap === false) mergedStyle.minWidth = 0;
  }

  return (
    <div ref={ref} className={cls} style={{ ...mergedStyle, ...style, ...sizeStyle }} {...rest}>
      {children}
    </div>
  );
});

Col.displayName = 'Col';

const Grid = { Row, Col, useBreakpoint };
export default Grid;

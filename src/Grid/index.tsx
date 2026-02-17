import React from 'react';
import './index.less';

// ---- Types ----

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ColResponsive {
  span?: number;
  offset?: number;
}

export interface RowProps {
  /** Grid gutter，数字为 px，支持语义 token；传数组 [水平, 垂直] 分别控制 */
  gutter?: number | 'xs' | 'sm' | 'md' | 'lg' | [number | 'xs' | 'sm' | 'md' | 'lg', number | 'xs' | 'sm' | 'md' | 'lg'];
  /** Main axis alignment */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Cross-axis alignment */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface ColProps {
  /** Grid column span（共 24 格），0 表示隐藏 */
  span?: number;
  /** 左侧偏移格数 */
  offset?: number;
  /** CSS flex 属性，设置后 span 失效 */
  flex?: number | string;
  /** ≥0px Responsive config */
  xs?: number | ColResponsive;
  /** ≥576px Responsive config */
  sm?: number | ColResponsive;
  /** ≥768px Responsive config */
  md?: number | ColResponsive;
  /** ≥992px Responsive config */
  lg?: number | ColResponsive;
  /** ≥1200px Responsive config */
  xl?: number | ColResponsive;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Constants ----

const TOTAL_COLS = 24;

const gapTokens: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// ---- Helpers ----

function resolveGap(val: number | string): number {
  return typeof val === 'number' ? val : (gapTokens[val] ?? 0);
}

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = React.useState<Breakpoint>(() => {
    if (typeof window === 'undefined') return 'md';
    const w = window.innerWidth;
    if (w >= breakpoints.xl) return 'xl';
    if (w >= breakpoints.lg) return 'lg';
    if (w >= breakpoints.md) return 'md';
    if (w >= breakpoints.sm) return 'sm';
    return 'xs';
  });

  React.useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      let next: Breakpoint = 'xs';
      if (w >= breakpoints.xl) next = 'xl';
      else if (w >= breakpoints.lg) next = 'lg';
      else if (w >= breakpoints.md) next = 'md';
      else if (w >= breakpoints.sm) next = 'sm';
      setBp(next);
    };
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return bp;
}

// ---- Context ----

const RowContext = React.createContext<{ gutterH: number }>({ gutterH: 0 });

// ---- Row ----

const Row: React.FC<RowProps> = ({
  gutter,
  justify,
  align,
  children,
  className,
  style,
}) => {
  let gutterH = 0;
  let gutterV = 0;

  if (gutter !== undefined) {
    if (Array.isArray(gutter)) {
      gutterH = resolveGap(gutter[0]);
      gutterV = resolveGap(gutter[1]);
    } else {
      gutterH = resolveGap(gutter);
    }
  }

  const s: React.CSSProperties = { ...style };
  if (gutterH > 0) s.columnGap = gutterH;
  if (gutterV > 0) s.rowGap = gutterV;
  if (justify) s.justifyContent = justifyMap[justify];
  if (align) s.alignItems = alignMap[align];

  const cls = ['aero-row', className || ''].filter(Boolean).join(' ');

  return (
    <RowContext.Provider value={{ gutterH }}>
      <div className={cls} style={s}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

// ---- Col ----

const bpOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

const Col: React.FC<ColProps> = ({
  span,
  offset,
  flex,
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  className,
  style,
}) => {
  const { gutterH } = React.useContext(RowContext);
  const currentBp = useBreakpoint();

  // 解析Responsive config
  const responsiveMap: Partial<Record<Breakpoint, ColResponsive>> = {};
  const rawMap = { xs, sm, md, lg, xl };
  for (const key of bpOrder) {
    const val = rawMap[key];
    if (val !== undefined) {
      responsiveMap[key] = typeof val === 'number' ? { span: val } : val;
    }
  }

  let resolvedSpan = span;
  let resolvedOffset = offset;
  const hasResponsive = Object.keys(responsiveMap).length > 0;

  if (hasResponsive) {
    const idx = bpOrder.indexOf(currentBp);
    for (let i = idx; i >= 0; i--) {
      const cfg = responsiveMap[bpOrder[i]];
      if (cfg) {
        if (cfg.span !== undefined) resolvedSpan = cfg.span;
        if (cfg.offset !== undefined) resolvedOffset = cfg.offset;
        break;
      }
    }
  }

  const s: React.CSSProperties = { ...style };

  if (flex !== undefined) {
    if (typeof flex === 'number') {
      s.flex = `${flex} 1 0%`;
    } else if (/^\d+(\.\d+)?(px|%)$/.test(flex)) {
      s.flex = `0 0 ${flex}`;
    } else {
      s.flex = flex;
    }
  } else if (resolvedSpan !== undefined) {
    if (resolvedSpan === 0) {
      s.display = 'none';
    } else {
      // 用 calc 扣除 gap 占用的空间
      const colCount = TOTAL_COLS / resolvedSpan;
      const gapTotal = gutterH * (colCount - 1) / colCount;
      s.flex = `0 0 calc(${(resolvedSpan / TOTAL_COLS) * 100}% - ${gapTotal}px)`;
      s.maxWidth = `calc(${(resolvedSpan / TOTAL_COLS) * 100}% - ${gapTotal}px)`;
    }
  }

  if (resolvedOffset && resolvedOffset > 0) {
    s.marginLeft = `${(resolvedOffset / TOTAL_COLS) * 100}%`;
  }

  const cls = ['aero-col', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} style={s}>
      {children}
    </div>
  );
};

// ---- Export ----

export type { Breakpoint, ColResponsive };

const Grid = { Row, Col };
export default Grid;
export { Row, Col };

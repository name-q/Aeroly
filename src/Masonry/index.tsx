import React from 'react';
import './index.less';

// ---- Types ----

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface MasonryProps {
  /** Column count, supports responsive object */
  columns?: number | Partial<Record<Breakpoint, number>>;
  /** Gap, number in px, supports semantic tokens */
  gutter?: number | 'xs' | 'sm' | 'md' | 'lg';
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Constants ----

const gapTokens: Record<string, number> = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const bpOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];

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

function resolveColumns(
  columns: Partial<Record<Breakpoint, number>>,
  currentBp: Breakpoint,
): number {
  const idx = bpOrder.indexOf(currentBp);
  for (let i = idx; i >= 0; i--) {
    const val = columns[bpOrder[i]];
    if (val !== undefined) return val;
  }
  return 3;
}

// ---- Component ----

const Masonry: React.FC<MasonryProps> = ({
  columns = 3,
  gutter = 'md',
  children,
  className,
  style,
}) => {
  const bp = useBreakpoint();
  const cols = typeof columns === 'number' ? columns : resolveColumns(columns, bp);
  const gap = resolveGap(gutter);

  const s: React.CSSProperties = {
    ...style,
    columnCount: cols,
    columnGap: gap,
  };

  const cls = ['aero-masonry', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} style={s}>
      {React.Children.map(children, (child) => (
        <div className="aero-masonry-item" style={{ marginBottom: gap }}>
          {child}
        </div>
      ))}
    </div>
  );
};

export default Masonry;

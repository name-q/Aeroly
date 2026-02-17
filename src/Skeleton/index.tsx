import React from 'react';
import './index.less';

// ---- Types ----

export interface SkeletonProps {
  /** Whether to enable shimmer animation, default true */
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonBlockProps {
  /** Width, supports number (px) or string */
  width?: number | string;
  /** Height, supports number (px) or string */
  height?: number | string;
  /** Border radius, default 8px */
  borderRadius?: number | string;
  /** Whether to en shimmer animation, inherits from parent by default */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonCircleProps {
  /** Diameter, default 40 */
  size?: number;
  /** Whether to en shimmer animation, inherits from parent by default */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonTextProps {
  /** Number of rows，Default 3 */
  rows?: number;
  /** Width per row, array for individual widths, percentage or number */
  widths?: (number | string)[];
  /** Line height, default 16 */
  lineHeight?: number;
  /** Row gap, default 12 */
  gap?: number;
  /** Whether to en shimmer animation, inherits from parent by default */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// ---- Context ----

const SkeletonContext = React.createContext<{ active: boolean }>({ active: true });

// ---- Helpers ----

const PREFIX = 'aero-skeleton';

function toSize(v: number | string): string {
  return typeof v === 'number' ? `${v}px` : v;
}

// ---- Sub Components ----

const Block: React.FC<SkeletonBlockProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 8,
  active: activeProp,
  className,
  style,
}) => {
  const ctx = React.useContext(SkeletonContext);
  const active = activeProp ?? ctx.active;

  const cls = [
    `${PREFIX}-block`,
    active ? `${PREFIX}-block--active` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      style={{
        width: toSize(width),
        height: toSize(height),
        borderRadius: toSize(borderRadius),
        ...style,
      }}
    />
  );
};

const Circle: React.FC<SkeletonCircleProps> = ({
  size = 40,
  active: activeProp,
  className,
  style,
}) => {
  const ctx = React.useContext(SkeletonContext);
  const active = activeProp ?? ctx.active;

  const cls = [
    `${PREFIX}-circle`,
    active ? `${PREFIX}-circle--active` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cls}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    />
  );
};

const Text: React.FC<SkeletonTextProps> = ({
  rows = 3,
  widths,
  lineHeight = 16,
  gap = 12,
  active: activeProp,
  className,
  style,
}) => {
  const ctx = React.useContext(SkeletonContext);
  const active = activeProp ?? ctx.active;

  // Default width: last row 60%, others 100%
  const getWidth = (i: number): string => {
    if (widths && widths[i] !== undefined) return toSize(widths[i]);
    return i === rows - 1 && rows > 1 ? '60%' : '100%';
  };

  const cls = [
    `${PREFIX}-text`,
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={{ gap, ...style }}>
      {Array.from({ length: rows }, (_, i) => (
        <div
          key={i}
          className={[
            `${PREFIX}-block`,
            active ? `${PREFIX}-block--active` : '',
          ].filter(Boolean).join(' ')}
          style={{
            width: getWidth(i),
            height: lineHeight,
            borderRadius: lineHeight / 2,
          }}
        />
      ))}
    </div>
  );
};

// ---- Skeleton ----

const Skeleton: React.FC<SkeletonProps> & {
  Block: typeof Block;
  Circle: typeof Circle;
  Text: typeof Text;
} = ({
  active = true,
  children,
  className,
  style,
}) => {
  const cls = [
    PREFIX,
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <SkeletonContext.Provider value={{ active }}>
      <div className={cls} style={style}>
        {children}
      </div>
    </SkeletonContext.Provider>
  );
};

Skeleton.Block = Block;
Skeleton.Circle = Circle;
Skeleton.Text = Text;

export default Skeleton;

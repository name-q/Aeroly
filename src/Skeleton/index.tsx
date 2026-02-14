import React from 'react';
import './index.less';

// ---- Types ----

export interface SkeletonProps {
  /** 是否启用光影动画，默认 true */
  active?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonBlockProps {
  /** 宽度，支持数字(px)或字符串 */
  width?: number | string;
  /** 高度，支持数字(px)或字符串 */
  height?: number | string;
  /** 圆角，默认 8px */
  borderRadius?: number | string;
  /** 是否启用光影动画，默认继承父级 */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonCircleProps {
  /** 直径，默认 40 */
  size?: number;
  /** 是否启用光影动画，默认继承父级 */
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface SkeletonTextProps {
  /** 行数，默认 3 */
  rows?: number;
  /** 每行宽度，可传数组分别指定，百分比或数字 */
  widths?: (number | string)[];
  /** 行高，默认 16 */
  lineHeight?: number;
  /** 行间距，默认 12 */
  gap?: number;
  /** 是否启用光影动画，默认继承父级 */
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

  // 默认宽度：最后一行 60%，其余 100%
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

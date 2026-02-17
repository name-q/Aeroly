import React from 'react';
import './index.less';

// ---- Types ----

export interface FlexProps {
  /** 主轴Direction */
  direction?: 'row' | 'column';
  /** 主轴分布 */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Cross-axis alignment */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  /** Gap，数字为 px，支持语义化 token */
  gap?: number | 'xs' | 'sm' | 'md' | 'lg';
  /** Whether to wrap */
  wrap?: boolean;
  /** 水平+垂直双向居中的快捷方式 */
  center?: boolean;
  /** 撑满父容器Width */
  full?: boolean;
  /** Whether为行内弹性盒 */
  inline?: boolean;
  /** CSS flex 属性（用于作为Children时控制伸缩） */
  flex?: number | string;
  /** margin auto 抽象，用于推开相邻元素 */
  auto?: boolean | 'left' | 'right' | 'top' | 'bottom';
  /** Render的 HTML 标签 */
  component?: React.ElementType;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Maps ----

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
  baseline: 'baseline',
};

// ---- Component ----

const Flex: React.FC<FlexProps> = ({
  direction,
  justify,
  align,
  gap,
  wrap = false,
  center = false,
  full = false,
  inline = false,
  flex,
  auto,
  component: Component = 'div',
  children,
  className,
  style,
}) => {
  const s: React.CSSProperties = {};

  // direction
  if (direction === 'column') s.flexDirection = 'column';

  // center 快捷方式（优先级低于显式 justify/align）
  if (center) {
    s.justifyContent = 'center';
    s.alignItems = 'center';
  }

  // justify / align 显式覆盖
  if (justify) s.justifyContent = justifyMap[justify] || justify;
  if (align) s.alignItems = alignMap[align] || align;

  // gap
  if (gap !== undefined) {
    s.gap = typeof gap === 'number' ? gap : gapTokens[gap];
  }

  // wrap
  if (wrap) s.flexWrap = 'wrap';

  // full
  if (full) s.width = '100%';

  // flex（作为Children时）
  if (flex !== undefined) {
    if (typeof flex === 'number') {
      s.flex = `${flex} 1 0%`;
    } else if (/^\d+(\.\d+)?(px|%)$/.test(flex)) {
      s.flex = `0 0 ${flex}`;
    } else {
      s.flex = flex;
    }
  }

  // auto margin
  if (auto === true) {
    s.margin = 'auto';
  } else if (auto === 'left') {
    s.marginLeft = 'auto';
  } else if (auto === 'right') {
    s.marginRight = 'auto';
  } else if (auto === 'top') {
    s.marginTop = 'auto';
  } else if (auto === 'bottom') {
    s.marginBottom = 'auto';
  }

  const cls = [
    'aero-flex',
    inline ? 'aero-flex--inline' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={cls} style={{ ...s, ...style }}>
      {children}
    </Component>
  );
};

export default Flex;

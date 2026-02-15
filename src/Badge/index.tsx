import React from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface BadgeProps {
  /** 展示的数字，0 时隐藏 */
  count?: number;
  /** 封顶数字，超过显示 `${overflowCount}+` */
  overflowCount?: number;
  /** 不展示数字，只显示小红点 */
  dot?: boolean;
  /** 当 count 为 0 时是否显示 */
  showZero?: boolean;
  /** 光影掠过动画 */
  shimmer?: boolean;
  /** 自定义颜色 */
  color?: string;
  /** 自定义显示内容（覆盖 count） */
  text?: React.ReactNode;
  /** 设置状态点（独立使用，无 children） */
  status?: 'default' | 'processing' | 'success' | 'warning' | 'error';
  /** 状态点旁的文本 */
  statusText?: React.ReactNode;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 偏移 [right, top] */
  offset?: [number, number];
  /** 包裹的子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  overflowCount = 99,
  dot = false,
  showZero = false,
  shimmer = false,
  color,
  text,
  status,
  statusText,
  size: sizeProp,
  offset,
  children,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  // 状态点模式（独立使用）
  if (status && !children) {
    return (
      <span
        className={['aero-badge-status', `aero-badge-status--${size}`, className].filter(Boolean).join(' ')}
        style={style}
      >
        <span
          className={[
            'aero-badge-status-dot',
            `aero-badge-status-dot--${status}`,
            shimmer ? 'aero-badge-status-dot--shimmer' : '',
          ].filter(Boolean).join(' ')}
          style={color ? { background: color } : undefined}
        />
        {statusText && <span className="aero-badge-status-text">{statusText}</span>}
      </span>
    );
  }

  // 是否显示徽标
  const hasCount = count !== undefined && (count > 0 || showZero);
  const showBadge = dot || hasCount || text !== undefined;

  // 显示内容
  let displayContent: React.ReactNode = null;
  if (text !== undefined) {
    displayContent = text;
  } else if (hasCount) {
    displayContent = count! > overflowCount ? `${overflowCount}+` : count;
  }

  const badgeStyle: React.CSSProperties = {};
  if (color) badgeStyle.background = color;
  if (offset) {
    badgeStyle.right = -offset[0];
    badgeStyle.top = offset[1];
  }

  const cls = [
    'aero-badge',
    `aero-badge--${size}`,
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} style={style}>
      {children}
      {showBadge && (
        <sup
          className={[
            'aero-badge-count',
            dot ? 'aero-badge-count--dot' : '',
            !children ? 'aero-badge-count--standalone' : '',
            shimmer ? 'aero-badge-count--shimmer' : '',
          ].filter(Boolean).join(' ')}
          style={badgeStyle}
        >
          {!dot && displayContent}
        </sup>
      )}
    </span>
  );
};

export default Badge;

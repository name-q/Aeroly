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
  /** 当 count 为 0 时Whether visible */
  showZero?: boolean;
  /** 光影掠过动画 */
  shimmer?: boolean;
  /** Custom color */
  color?: string;
  /** CustomDisplay content（覆盖 count） */
  text?: React.ReactNode;
  /** 设置Status点（独立使用，无 children） */
  status?: 'default' | 'processing' | 'success' | 'warning' | 'error';
  /** Status点旁的文本 */
  statusText?: React.ReactNode;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** 偏移 [right, top] */
  offset?: [number, number];
  /** 包裹的Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
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
  // Status点Mode（独立使用）
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

  // Whether visible徽标
  const hasCount = count !== undefined && (count > 0 || showZero);
  const showBadge = dot || hasCount || text !== undefined;

  // Display content
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

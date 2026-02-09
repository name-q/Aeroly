import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './index.less';

export interface IconProps {
  /** Lucide 图标组件 */
  icon: LucideIcon;
  /** 图标尺寸，默认 16 */
  size?: number | string;
  /** 图标颜色，默认 currentColor */
  color?: string;
  /** 线条粗细，默认 2 */
  strokeWidth?: number;
  /** 旋转角度（度） */
  rotate?: number;
  /** 是否旋转动画 */
  spin?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 16,
  color,
  strokeWidth,
  rotate,
  spin = false,
  className,
  style,
}) => {
  const classNames = [
    'aero-icon',
    spin ? 'aero-icon--spin' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = {
    ...(rotate !== undefined
      ? { transform: `rotate(${rotate}deg)` }
      : undefined),
    ...style,
  };

  return (
    <span className={classNames} style={mergedStyle} role="img" aria-hidden>
      <IconComponent size={size} color={color} strokeWidth={strokeWidth} />
    </span>
  );
};

export default Icon;

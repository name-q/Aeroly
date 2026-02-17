import React from 'react';
import type { LucideIcon } from 'lucide-react';
import './index.less';

export interface IconProps {
  /** Lucide IconComponent */
  icon: LucideIcon;
  /** IconSize，Default 16 */
  size?: number | string;
  /** Icon颜Color，Default currentColor */
  color?: string;
  /** 线条粗细，Default 2 */
  strokeWidth?: number;
  /** Rotation angle（度） */
  rotate?: number;
  /** Whether旋转动画 */
  spin?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
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

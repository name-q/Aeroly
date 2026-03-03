import React, { useState } from 'react';
import { X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type TagType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type TagSize = 'small' | 'medium' | 'large';

export interface TagProps {
  /** Label content */
  children: React.ReactNode;
  /** Type */
  type?: TagType;
  /** Size */
  size?: TagSize;
  /** Whether closable */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Whether visible (controlled) */
  visible?: boolean;
  /** Custom color（覆盖 type） */
  color?: string;
  /** Whether圆角胶囊 */
  round?: boolean;
  /** Whether有边框 */
  bordered?: boolean;
  /** Click callback */
  onClick?: (e: React.MouseEvent) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// 运行时解析任意 CSS 颜色值为 "r, g, b"，用于 rgba() 淡化背景
let _ctx: CanvasRenderingContext2D | null | undefined;
const rgbCache: Record<string, string | null> = {};

function parseColorToRgb(color: string): string | null {
  const key = color.toLowerCase();
  if (key in rgbCache) return rgbCache[key];

  if (_ctx === undefined) {
    _ctx = typeof document !== 'undefined'
      ? document.createElement('canvas').getContext('2d')
      : null;
  }
  if (!_ctx) return (rgbCache[key] = null);

  // 两轮检测：区分 "black" 和无效值
  _ctx.fillStyle = '#000';
  _ctx.fillStyle = color;
  const v = _ctx.fillStyle;
  if (v === '#000000') {
    _ctx.fillStyle = '#fff';
    _ctx.fillStyle = color;
    if (_ctx.fillStyle === '#ffffff') return (rgbCache[key] = null);
  }

  const hex = _ctx.fillStyle;
  if (hex.startsWith('#')) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (rgbCache[key] = `${r}, ${g}, ${b}`);
  }
  const m = hex.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  return (rgbCache[key] = m ? `${m[1]}, ${m[2]}, ${m[3]}` : null);
}

const Tag: React.FC<TagProps> = ({
  children,
  type = 'default',
  size = 'small',
  closable = false,
  onClose,
  visible,
  color,
  round = false,
  bordered = true,
  onClick,
  className,
  style,
}) => {
  const [internalVisible, setInternalVisible] = useState(true);
  const isControlled = visible !== undefined;
  const show = isControlled ? visible : internalVisible;

  if (!show) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalVisible(false);
    onClose?.();
  };

  const customStyle: React.CSSProperties = { ...style };
  const isCustomColor = color !== undefined;
  if (color) {
    const rgb = parseColorToRgb(color);
    if (rgb) {
      customStyle.backgroundColor = `rgba(${rgb}, 0.08)`;
      customStyle.borderColor = `rgba(${rgb}, 0.2)`;
      customStyle.color = color;
    } else {
      customStyle.backgroundColor = color;
      customStyle.borderColor = 'transparent';
      customStyle.color = '#fff';
    }
  }

  const cls = [
    'aero-tag',
    isCustomColor ? '' : `aero-tag--${type}`,
    `aero-tag--${size}`,
    round ? 'aero-tag--round' : '',
    bordered ? '' : 'aero-tag--borderless',
    onClick ? 'aero-tag--clickable' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <span className={cls} style={customStyle} onClick={onClick}>
      <span className="aero-tag-content">{children}</span>
      {closable && (
        <span className="aero-tag-close" onClick={handleClose}>
          <Icon icon={X} size={size === 'small' ? 10 : 12} />
        </span>
      )}
    </span>
  );
};

export default Tag;

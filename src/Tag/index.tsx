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
  if (color) {
    customStyle.backgroundColor = color.startsWith('#') || color.startsWith('rgb')
      ? `${color}18` : color;
    customStyle.borderColor = color.startsWith('#') || color.startsWith('rgb')
      ? `${color}40` : 'transparent';
    customStyle.color = color;
  }

  const cls = [
    'aero-tag',
    `aero-tag--${type}`,
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

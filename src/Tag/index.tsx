import React, { useState } from 'react';
import { X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type TagType = 'default' | 'info' | 'success' | 'warning' | 'error';
export type TagSize = 'small' | 'medium' | 'large';

export interface TagProps {
  /** 标签内容 */
  children: React.ReactNode;
  /** 类型 */
  type?: TagType;
  /** 尺寸 */
  size?: TagSize;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 是否显示（受控） */
  visible?: boolean;
  /** 自定义颜色（覆盖 type） */
  color?: string;
  /** 是否圆角胶囊 */
  round?: boolean;
  /** 是否有边框 */
  bordered?: boolean;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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

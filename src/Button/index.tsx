import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export interface ButtonProps {
  /** 按钮内容 */
  children?: React.ReactNode;
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'text';
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 图标（Lucide 图标组件） */
  icon?: LucideIcon;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 原生 button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  htmlType = 'button',
  className,
  style,
}) => {
  const isDisabled = disabled || loading;

  const classNames = [
    'aero-button',
    `aero-button--${type}`,
    `aero-button--${size}`,
    isDisabled ? 'aero-button--disabled' : '',
    loading ? 'aero-button--loading' : '',
    icon && !children ? 'aero-button--icon-only' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  return (
    <button
      type={htmlType}
      className={classNames}
      style={style}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {loading ? (
        <Icon icon={Loader} spin size={iconSize} />
      ) : icon ? (
        <Icon icon={icon} size={iconSize} />
      ) : null}
      {children && <span className="aero-button-content">{children}</span>}
    </button>
  );
};

export default Button;

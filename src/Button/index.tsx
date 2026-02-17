import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Loader } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface ButtonProps {
  /** 按钮Content */
  children?: React.ReactNode;
  /** Button type */
  type?: 'primary' | 'default' | 'text';
  /** 按钮Size */
  size?: 'small' | 'medium' | 'large';
  /** Whether保持胶囊圆角（Default跟随全局圆角） */
  pill?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  /** Whether loading */
  loading?: boolean;
  /** Icon（Lucide Iconcomponent) */
  icon?: LucideIcon;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 原生 button type */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'default',
  size: sizeProp,
  pill = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  htmlType = 'button',
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isDisabled = disabled || loading;

  const classNames = [
    'aero-button',
    `aero-button--${type}`,
    `aero-button--${size}`,
    pill ? 'aero-button--pill' : '',
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

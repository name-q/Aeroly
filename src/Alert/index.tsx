import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, CircleAlert, CircleX, Info, X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** 提示内容 */
  children: React.ReactNode;
  /** 提示类型 */
  type?: AlertType;
  /** 辅助描述文字 */
  description?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义图标 */
  icon?: LucideIcon;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否开启文字光影掠过效果 */
  shimmer?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const iconMap: Record<AlertType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
};

const Alert: React.FC<AlertProps> = ({
  children,
  type = 'info',
  description,
  closable = false,
  onClose,
  icon,
  showIcon = true,
  shimmer = true,
  className,
  style,
}) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  if (!visible) return null;

  const handleClose = () => {
    setClosing(true);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (closing && e.propertyName === 'opacity') {
      setVisible(false);
      onClose?.();
    }
  };

  const IconComp = icon || iconMap[type];

  const classNames = [
    'aero-alert',
    `aero-alert--${type}`,
    shimmer ? 'aero-alert--shimmer' : '',
    description ? 'aero-alert--with-description' : '',
    closing ? 'aero-alert--closing' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      style={style}
      role="alert"
      onTransitionEnd={handleTransitionEnd}
    >
      {showIcon && (
        <span className="aero-alert-icon">
          <Icon icon={IconComp} size={description ? 20 : 16} />
        </span>
      )}
      <div className="aero-alert-body">
        <div className="aero-alert-message">
          {children}
        </div>
        {description && (
          <div className="aero-alert-description">{description}</div>
        )}
      </div>
      {closable && (
        <button type="button" className="aero-alert-close" onClick={handleClose}>
          <Icon icon={X} size={14} />
        </button>
      )}
    </div>
  );
};

export default Alert;

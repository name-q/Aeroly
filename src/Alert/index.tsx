import React, { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, CircleAlert, CircleX, Info, X } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  /** Tooltip content */
  children: React.ReactNode;
  /** Alert type */
  type?: AlertType;
  /** Helper description text */
  description?: React.ReactNode;
  /** Whether closable */
  closable?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Custom icon */
  icon?: LucideIcon;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Whether to enable text shimmer effect */
  shimmer?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
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
  size: sizeProp,
  shimmer = true,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
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
  const iconSize = size === 'small' ? 14 : size === 'large' ? 20 : 16;
  const descIconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const closeIconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;

  const classNames = [
    'aero-alert',
    `aero-alert--${type}`,
    `aero-alert--${size}`,
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
          <Icon icon={IconComp} size={description ? descIconSize : iconSize} />
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
          <Icon icon={X} size={closeIconSize} />
        </button>
      )}
    </div>
  );
};

export default Alert;

import React from 'react';
import { createRoot } from 'react-dom/client';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, CircleAlert, CircleX, Info, X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPlacement = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

export interface NotificationConfig {
  /** 标题 */
  title: React.ReactNode;
  /** 描述内容 */
  description?: React.ReactNode;
  /** 类型 */
  type?: NotificationType;
  /** 自动关闭延时（ms），0 则不自动关闭 */
  duration?: number;
  /** 自定义图标 */
  icon?: LucideIcon;
  /** 弹出位置 */
  placement?: NotificationPlacement;
  /** 关闭回调 */
  onClose?: () => void;
  /** 底部操作区 */
  footer?: React.ReactNode;
}

const iconMap: Record<NotificationType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
};

// ---- 单条通知 ----

interface NotificationItemProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  type: NotificationType;
  duration: number;
  icon?: LucideIcon;
  placement: NotificationPlacement;
  footer?: React.ReactNode;
  onClose: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  description,
  type,
  duration,
  icon,
  placement,
  footer,
  onClose,
}) => {
  const [visible, setVisible] = React.useState(false);
  const [closing, setClosing] = React.useState(false);

  React.useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        setClosing(true);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    setClosing(true);
  };

  const handleTransitionEnd = () => {
    if (closing || !visible) onClose();
  };

  const IconComp = icon || iconMap[type];
  const isRight = placement === 'topRight' || placement === 'bottomRight';

  return (
    <div
      className={[
        'aero-notification-item',
        `aero-notification-item--${type}`,
        visible ? 'aero-notification-item--visible' : '',
        isRight ? 'aero-notification-item--right' : 'aero-notification-item--left',
      ].filter(Boolean).join(' ')}
      onTransitionEnd={handleTransitionEnd}
    >
      <span className="aero-notification-item-icon">
        <Icon icon={IconComp} size={20} />
      </span>
      <div className="aero-notification-item-body">
        <div className="aero-notification-item-title">{title}</div>
        {description && (
          <div className="aero-notification-item-desc">{description}</div>
        )}
        {footer && (
          <div className="aero-notification-item-footer">{footer}</div>
        )}
      </div>
      <button
        type="button"
        className="aero-notification-item-close"
        onClick={handleClose}
      >
        <Icon icon={X} size={14} />
      </button>
    </div>
  );
};

// ---- 容器管理（按 placement 分组） ----

const containers: Partial<Record<NotificationPlacement, {
  el: HTMLDivElement;
  root: ReturnType<typeof createRoot>;
}>> = {};

let notificationList: { key: number; config: NotificationConfig }[] = [];
let seed = 0;

function getContainer(placement: NotificationPlacement) {
  if (!containers[placement]) {
    const el = document.createElement('div');
    el.className = `aero-notification-container aero-notification-container--${placement}`;
    document.body.appendChild(el);
    containers[placement] = { el, root: createRoot(el) };
  }
  return containers[placement]!;
}

function removeNotification(key: number, onClose?: () => void) {
  notificationList = notificationList.filter((n) => n.key !== key);
  onClose?.();
  renderAll();
}

function renderAll() {
  // 按 placement 分组渲染
  const groups: Partial<Record<NotificationPlacement, typeof notificationList>> = {};
  for (const item of notificationList) {
    const p = item.config.placement || 'topRight';
    if (!groups[p]) groups[p] = [];
    groups[p]!.push(item);
  }

  // 渲染有内容的容器
  for (const p of Object.keys(groups) as NotificationPlacement[]) {
    const { root } = getContainer(p);
    root.render(
      <React.Fragment>
        {groups[p]!.map(({ key, config }) => (
          <NotificationItem
            key={key}
            title={config.title}
            description={config.description}
            type={config.type || 'info'}
            duration={config.duration ?? 4500}
            icon={config.icon}
            placement={config.placement || 'topRight'}
            footer={config.footer}
            onClose={() => removeNotification(key, config.onClose)}
          />
        ))}
      </React.Fragment>,
    );
  }

  // 清空没有内容的容器
  for (const p of Object.keys(containers) as NotificationPlacement[]) {
    if (!groups[p] || groups[p]!.length === 0) {
      containers[p]!.root.render(null);
    }
  }
}

function open(config: NotificationConfig) {
  const key = seed++;
  notificationList = [...notificationList, { key, config }];
  renderAll();
}

// ---- 对外 API ----

const notification = {
  info: (title: React.ReactNode, description?: React.ReactNode, config?: Partial<NotificationConfig>) =>
    open({ ...config, title, description, type: 'info' }),
  success: (title: React.ReactNode, description?: React.ReactNode, config?: Partial<NotificationConfig>) =>
    open({ ...config, title, description, type: 'success' }),
  warning: (title: React.ReactNode, description?: React.ReactNode, config?: Partial<NotificationConfig>) =>
    open({ ...config, title, description, type: 'warning' }),
  error: (title: React.ReactNode, description?: React.ReactNode, config?: Partial<NotificationConfig>) =>
    open({ ...config, title, description, type: 'error' }),
  open,
};

export default notification;

import React from 'react';
import { createRoot } from 'react-dom/client';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, CircleAlert, CircleX, Info } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageConfig {
  /** 提示内容 */
  content: React.ReactNode;
  /** 提示类型 */
  type?: MessageType;
  /** 自动关闭延时（ms），设为 0 则不自动关闭 */
  duration?: number;
  /** 关闭回调 */
  onClose?: () => void;
  /** 自定义图标 */
  icon?: LucideIcon;
}

// 图标映射
const iconMap: Record<MessageType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
};

// ---- 单条消息组件 ----
interface MessageItemProps extends Required<Pick<MessageConfig, 'type' | 'duration'>> {
  content: React.ReactNode;
  icon?: LucideIcon;
  onClose: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  content,
  type,
  duration,
  icon,
  onClose,
}) => {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // 触发入场动画
    requestAnimationFrame(() => setVisible(true));

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleAnimationEnd = () => {
    if (!visible) onClose();
  };

  const IconComp = icon || iconMap[type];

  return (
    <div
      className={`aero-message-item aero-message-item--${type} ${visible ? 'aero-message-item--visible' : ''}`}
      onTransitionEnd={handleAnimationEnd}
    >
      <span className="aero-message-item-icon">
        <Icon icon={IconComp} size={16} />
      </span>
      <span className="aero-message-item-content">{content}</span>
    </div>
  );
};

// ---- 容器管理 ----
let containerRoot: ReturnType<typeof createRoot> | null = null;
let containerEl: HTMLDivElement | null = null;
let messageList: { key: number; config: MessageConfig }[] = [];
let seed = 0;

function getContainer() {
  if (!containerEl) {
    containerEl = document.createElement('div');
    containerEl.className = 'aero-message-container';
    document.body.appendChild(containerEl);
    containerRoot = createRoot(containerEl);
  }
  return containerRoot!;
}

function removeMessage(key: number, onClose?: () => void) {
  messageList = messageList.filter((m) => m.key !== key);
  onClose?.();
  render();
}

function render() {
  const root = getContainer();
  root.render(
    <React.Fragment>
      {messageList.map(({ key, config }) => (
        <MessageItem
          key={key}
          content={config.content}
          type={config.type || 'info'}
          duration={config.duration ?? 3000}
          icon={config.icon}
          onClose={() => removeMessage(key, config.onClose)}
        />
      ))}
    </React.Fragment>,
  );
}

function open(config: MessageConfig) {
  const key = seed++;
  messageList = [...messageList, { key, config }];
  render();
}

// ---- 对外 API ----
const message = {
  info: (content: React.ReactNode, duration?: number) =>
    open({ content, type: 'info', duration }),
  success: (content: React.ReactNode, duration?: number) =>
    open({ content, type: 'success', duration }),
  warning: (content: React.ReactNode, duration?: number) =>
    open({ content, type: 'warning', duration }),
  error: (content: React.ReactNode, duration?: number) =>
    open({ content, type: 'error', duration }),
  open,
};

export default message;

import React from 'react';
import { createRoot } from 'react-dom/client';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, CircleAlert, CircleX, Info } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type MessageType = 'info' | 'success' | 'warning' | 'error';

export interface MessageConfig {
  /** Tooltip content */
  content: React.ReactNode;
  /** Alert type */
  type?: MessageType;
  /** Auto close delay (ms), set to 0 for no auto close */
  duration?: number;
  /** Close callback */
  onClose?: () => void;
  /** Custom icon */
  icon?: LucideIcon;
}

// Icon mapping
const iconMap: Record<MessageType, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
};

// ---- Single message component ----
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
    // Trigger enter animation
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

// ---- Container management ----
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

// ---- Public API ----
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

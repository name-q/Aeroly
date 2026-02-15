import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { LucideIcon } from 'lucide-react';
import { X, Info, CircleCheck, CircleAlert, CircleX } from 'lucide-react';
import Icon from '../Icon';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

export interface ModalProps {
  /** 是否显示 */
  open: boolean;
  /** 显隐变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 底部操作区，传 null 隐藏 */
  footer?: React.ReactNode | null;
  /** 确认按钮文案 */
  okText?: React.ReactNode;
  /** 取消按钮文案 */
  cancelText?: React.ReactNode;
  /** 确认回调，返回 Promise 时按钮自动 loading */
  onOk?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
  /** 宽度 */
  width?: number | string;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 按 Esc 是否关闭 */
  keyboard?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 是否居中显示 */
  centered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> & {
  confirm: (config: ConfirmConfig) => void;
  info: (config: ConfirmConfig) => void;
  success: (config: ConfirmConfig) => void;
  warning: (config: ConfirmConfig) => void;
  error: (config: ConfirmConfig) => void;
} = ({
  open,
  onOpenChange,
  title,
  children,
  footer,
  okText,
  cancelText,
  onOk,
  onCancel,
  width = 420,
  mask = true,
  maskClosable = true,
  keyboard = true,
  closeIcon,
  centered = false,
  className,
  style,
}) => {
  const localeModal = useLocale('Modal');
  const finalOkText = okText ?? localeModal.okText;
  const finalCancelText = cancelText ?? localeModal.cancelText;
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [okLoading, setOkLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [open]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!open && e.propertyName === 'opacity') {
      setMounted(false);
    }
  };

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open || !keyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel?.();
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, onOpenChange, onCancel]);

  const handleOk = async () => {
    if (!onOk) {
      onOpenChange(false);
      return;
    }
    const result = onOk();
    if (result instanceof Promise) {
      setOkLoading(true);
      try {
        await result;
        onOpenChange(false);
      } catch {
        // onOk 返回 rejected promise 时不关闭弹窗
      } finally {
        setOkLoading(false);
      }
    } else {
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  if (!mounted) return null;

  const classNames = [
    'aero-modal-root',
    animating ? 'aero-modal-root--open' : '',
    centered ? 'aero-modal-root--centered' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const modalClassNames = [
    'aero-modal',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) {
      return <div className="aero-modal-footer">{footer}</div>;
    }
    return (
      <div className="aero-modal-footer">
        <button type="button" className="aero-modal-btn aero-modal-btn--cancel" onClick={handleCancel}>
          {finalCancelText}
        </button>
        <button
          type="button"
          className={`aero-modal-btn aero-modal-btn--ok${okLoading ? ' aero-modal-btn--loading' : ''}`}
          onClick={handleOk}
          disabled={okLoading}
        >
          {okLoading && <span className="aero-modal-btn-spinner" />}
          {finalOkText}
        </button>
      </div>
    );
  };

  return (
    <div className={classNames} onTransitionEnd={handleTransitionEnd}>
      {mask && (
        <div
          className="aero-modal-mask"
          onClick={maskClosable ? handleCancel : undefined}
        />
      )}
      <div className="aero-modal-wrap">
        <div className={modalClassNames} style={{ width, ...style }}>
          {title && (
            <div className="aero-modal-header">
              <div className="aero-modal-title">{title}</div>
            </div>
          )}
          <button type="button" className="aero-modal-close" onClick={handleCancel}>
            {closeIcon ?? <Icon icon={X} size={16} />}
          </button>
          <div className="aero-modal-body">{children}</div>
          {renderFooter()}
        </div>
      </div>
    </div>
  );
};

// ---- 命令式 confirm ----

export interface ConfirmConfig {
  /** 标题 */
  title?: React.ReactNode;
  /** 内容 */
  content?: React.ReactNode;
  /** 确认按钮文案 */
  okText?: React.ReactNode;
  /** 取消按钮文案 */
  cancelText?: React.ReactNode;
  /** 确认回调 */
  onOk?: () => void | Promise<void>;
  /** 取消回调 */
  onCancel?: () => void;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 图标类型 */
  type?: 'confirm' | 'info' | 'success' | 'warning' | 'error';
  /** 自定义图标 */
  icon?: LucideIcon;
}

const typeIconMap: Record<string, LucideIcon> = {
  confirm: CircleAlert,
  info: Info,
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
};

function openConfirm(config: ConfirmConfig) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const destroy = () => {
    root.unmount();
    container.remove();
  };

  const IconComp = config.icon || typeIconMap[config.type || 'confirm'];
  const type = config.type || 'confirm';
  const showCancel = type === 'confirm';

  const ConfirmModal = () => {
    const localeModal = useLocale('Modal');
    const [open, setOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(true);

    const handleOk = async () => {
      if (config.onOk) {
        const result = config.onOk();
        if (result instanceof Promise) {
          setLoading(true);
          try {
            await result;
          } finally {
            setLoading(false);
          }
        }
      }
      setOpen(false);
    };

    const handleCancel = () => {
      config.onCancel?.();
      setOpen(false);
    };

    const handleTransitionEnd = (e: React.TransitionEvent) => {
      if (!open && e.propertyName === 'opacity') {
        setMounted(false);
        destroy();
      }
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCancel();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!mounted) return null;

    return (
      <div
        className={`aero-modal-root aero-modal-root--centered${open ? ' aero-modal-root--open' : ''}`}
        onTransitionEnd={handleTransitionEnd}
      >
        {config.mask !== false && <div className="aero-modal-mask" />}
        <div className="aero-modal-wrap">
          <div className="aero-modal aero-modal--confirm">
            <div className="aero-modal-confirm-body">
              <span className={`aero-modal-confirm-icon aero-modal-confirm-icon--${type}`}>
                <Icon icon={IconComp} size={22} />
              </span>
              <div className="aero-modal-confirm-content">
                {config.title && (
                  <div className="aero-modal-confirm-title">{config.title}</div>
                )}
                {config.content && (
                  <div className="aero-modal-confirm-text">{config.content}</div>
                )}
              </div>
            </div>
            <div className="aero-modal-footer">
              {showCancel && (
                <button type="button" className="aero-modal-btn aero-modal-btn--cancel" onClick={handleCancel}>
                  {config.cancelText || localeModal.cancelText}
                </button>
              )}
              <button
                type="button"
                className={`aero-modal-btn aero-modal-btn--ok${loading ? ' aero-modal-btn--loading' : ''}`}
                onClick={handleOk}
                disabled={loading}
              >
                {loading && <span className="aero-modal-btn-spinner" />}
                {config.okText || localeModal.okText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 挂载后下一帧触发动画
  root.render(<ConfirmModal />);
}

Modal.confirm = (config) => openConfirm({ ...config, type: 'confirm' });
Modal.info = (config) => openConfirm({ ...config, type: 'info' });
Modal.success = (config) => openConfirm({ ...config, type: 'success' });
Modal.warning = (config) => openConfirm({ ...config, type: 'warning' });
Modal.error = (config) => openConfirm({ ...config, type: 'error' });

export default Modal;

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import type { LucideIcon } from 'lucide-react';
import { X, Info, CircleCheck, CircleAlert, CircleX } from 'lucide-react';
import Icon from '../Icon';
import { useLocale } from '../ConfigProvider/useConfig';
import { useLiquidGlass, LiquidGlassDecor } from '../liquid-glass';
import { useModalLayer } from './stack';
import './index.less';

export interface ModalProps {
  /** Whether visible */
  open: boolean;
  /** Visibility change callback */
  onOpenChange: (open: boolean) => void;
  /** Title */
  title?: React.ReactNode;
  /** Content */
  children?: React.ReactNode;
  /** Footer actions area，传 null 隐藏 */
  footer?: React.ReactNode | null;
  /** OK button text */
  okText?: React.ReactNode;
  /** Cancel button text */
  cancelText?: React.ReactNode;
  /** OK callback，返回 Promise 时按钮自动 loading */
  onOk?: () => void | Promise<void>;
  /** Cancel callback */
  onCancel?: () => void;
  /** Width */
  width?: number | string;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether clicking mask closes */
  maskClosable?: boolean;
  /** Whether pressing Esc closes */
  keyboard?: boolean;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Whether centered */
  centered?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
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
  mask = false,
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
  const lg = useLiquidGlass({ zIndex: 1000 });
  const layer = useModalLayer(open);
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

  // 无遮罩：不锁定 body 滚动，打开时底部页面可继续滚动以体现毛玻璃

  useEffect(() => {
    if (!open || !keyboard || !layer.isTop) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel?.();
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, layer.isTop, onOpenChange, onCancel]);

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

  return createPortal(
    <div className={classNames} style={{ zIndex: layer.zIndex }} onTransitionEnd={handleTransitionEnd}>
      {mask && layer.isTop && (
        <div
          className="aero-modal-mask"
          onClick={maskClosable ? handleCancel : undefined}
        />
      )}
      <div
        ref={lg.refs.surfaceRef}
        className={`${modalClassNames} aero-lg-surface${lg.isFull ? ' aero-lg-surface--full' : ''}`}
        style={{ width, ...style, ...lg.vars }}
        {...lg.surfaceProps}
      >
        {lg.isFull && <div ref={lg.refs.warpRef} className="aero-lg-warp" />}
        <div className="aero-lg-content">
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
      {mounted && <LiquidGlassDecor refs={lg.refs} zIndex={layer.zIndex} />}
    </div>,
    document.body,
  );
};

// ---- 命令式 confirm ----

export interface ConfirmConfig {
  /** Title */
  title?: React.ReactNode;
  /** Content */
  content?: React.ReactNode;
  /** OK button text */
  okText?: React.ReactNode;
  /** Cancel button text */
  cancelText?: React.ReactNode;
  /** OK callback */
  onOk?: () => void | Promise<void>;
  /** Cancel callback */
  onCancel?: () => void;
  /** Whether to show mask */
  mask?: boolean;
  /** IconType */
  type?: 'confirm' | 'info' | 'success' | 'warning' | 'error';
  /** Custom icon */
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
    const lg = useLiquidGlass({ zIndex: 1000 });
    const layer = useModalLayer(true);
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
      if (!layer.isTop) return undefined;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') handleCancel();
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [layer.isTop]);

    if (!mounted) return null;

    return (
      <div
        className={`aero-modal-root${open ? ' aero-modal-root--open' : ''}`}
        style={{ zIndex: layer.zIndex }}
        onTransitionEnd={handleTransitionEnd}
      >
        {config.mask === true && layer.isTop && (
          <div
            className="aero-modal-mask"
            onClick={handleCancel}
          />
        )}
        <div
          ref={lg.refs.surfaceRef}
          className={`aero-modal aero-modal--confirm aero-lg-surface${lg.isFull ? ' aero-lg-surface--full' : ''}`}
          style={lg.vars}
          {...lg.surfaceProps}
        >
          {lg.isFull && <div ref={lg.refs.warpRef} className="aero-lg-warp" />}
          <div className="aero-lg-content">
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
        <LiquidGlassDecor refs={lg.refs} zIndex={layer.zIndex} />
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

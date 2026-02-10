import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** 是否显示 */
  open: boolean;
  /** 显隐变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 标题 */
  title?: React.ReactNode;
  /** 抽屉内容 */
  children?: React.ReactNode;
  /** 弹出方向 */
  placement?: DrawerPlacement;
  /** 宽度（左右方向生效） */
  width?: number | string;
  /** 高度（上下方向生效） */
  height?: number | string;
  /** 底部操作区 */
  footer?: React.ReactNode;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 按 Esc 是否关闭 */
  keyboard?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  title,
  children,
  placement = 'right',
  width = 378,
  height = 378,
  footer,
  mask = true,
  maskClosable = true,
  keyboard = true,
  closeIcon,
  className,
  style,
}) => {
  // 锁定背景滚动
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Esc 关闭
  useEffect(() => {
    if (!open || !keyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, onOpenChange]);

  const isHorizontal = placement === 'left' || placement === 'right';

  const panelStyle: React.CSSProperties = {
    ...style,
    ...(isHorizontal ? { width } : { height }),
  };

  const classNames = [
    'aero-drawer',
    `aero-drawer--${placement}`,
    open ? 'aero-drawer--open' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      {mask && (
        <div
          className="aero-drawer-mask"
          onClick={maskClosable ? () => onOpenChange(false) : undefined}
        />
      )}
      <div className="aero-drawer-panel" style={panelStyle}>
        {(title || true) && (
          <div className="aero-drawer-header">
            <div className="aero-drawer-title">{title}</div>
            <button
              className="aero-drawer-close"
              onClick={() => onOpenChange(false)}
            >
              {closeIcon ?? <Icon icon={X} size={16} />}
            </button>
          </div>
        )}
        <div className="aero-drawer-body">{children}</div>
        {footer && <div className="aero-drawer-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Drawer;

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps {
  /** Whether visible */
  open: boolean;
  /** Visibility change callback */
  onOpenChange: (open: boolean) => void;
  /** Title */
  title?: React.ReactNode;
  /** Drawer content */
  children?: React.ReactNode;
  /** Placement */
  placement?: DrawerPlacement;
  /** Width (effective for left/right placement) */
  width?: number | string;
  /** Height (effective for top/bottom placement) */
  height?: number | string;
  /** Footer actions area */
  footer?: React.ReactNode;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether clicking mask closes */
  maskClosable?: boolean;
  /** Whether pressing Esc closes */
  keyboard?: boolean;
  /** Custom close icon */
  closeIcon?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
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
  // mounted controls DOM mount, animating controls enter animation
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      // Trigger enter animation on next frame to ensure DOM is mounted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) setMounted(false);
  };

  // Lock background scroll
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open || !keyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, onOpenChange]);

  if (!mounted) return null;

  const isHorizontal = placement === 'left' || placement === 'right';

  const panelStyle: React.CSSProperties = {
    ...style,
    ...(isHorizontal ? { width } : { height }),
  };

  const classNames = [
    'aero-drawer',
    `aero-drawer--${placement}`,
    animating ? 'aero-drawer--open' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onTransitionEnd={handleTransitionEnd}>
      {mask && (
        <div
          className="aero-drawer-mask"
          onClick={maskClosable ? () => onOpenChange(false) : undefined}
        />
      )}
      <div className="aero-drawer-panel" style={panelStyle}>
        {title ? (
          <div className="aero-drawer-header">
            <div className="aero-drawer-title">{title}</div>
            <button
              type="button"
              className="aero-drawer-close"
              onClick={() => onOpenChange(false)}
            >
              {closeIcon ?? <Icon icon={X} size={16} />}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="aero-drawer-close aero-drawer-close--float"
            onClick={() => onOpenChange(false)}
          >
            {closeIcon ?? <Icon icon={X} size={16} />}
          </button>
        )}
        <div className="aero-drawer-body">{children}</div>
        {footer && <div className="aero-drawer-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Drawer;

import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Plus, ArrowUp } from 'lucide-react';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import Badge from '../Badge';
import { throttle } from '../utils';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface FloatButtonProps {
  /** Icon */
  icon?: LucideIcon;
  /** Description text (below icon) */
  description?: React.ReactNode;
  /** Tooltip Hint */
  tooltip?: React.ReactNode;
  /** Tooltip Direction */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /** Badge count */
  badge?: number;
  /** Badge dot */
  dot?: boolean;
  /** Button shape */
  shape?: 'circle' | 'square';
  /** Button type */
  type?: 'default' | 'primary';
  /** Click callback */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Link URL */
  href?: string;
  /** Link target */
  target?: string;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface FloatButtonGroupProps {
  /** Icon when expanded, default Plus */
  icon?: LucideIcon;
  /** Close icon when expanded, default rotates icon 45° */
  closeIcon?: LucideIcon;
  /** Trigger mode */
  trigger?: 'hover' | 'click';
  /** Whether expanded (controlled) */
  open?: boolean;
  /** Expand change callback */
  onOpenChange?: (open: boolean) => void;
  /** Button shape */
  shape?: 'circle' | 'square';
  /** Tooltip Hint */
  tooltip?: React.ReactNode;
  /** Button type */
  type?: 'default' | 'primary';
  /** Child buttons */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface BackTopProps {
  /** Show when scroll height reaches this value, default 400 */
  visibilityHeight?: number;
  /** Scroll target, default window */
  target?: () => HTMLElement | Window;
  /** Button shape */
  shape?: 'circle' | 'square';
  /** Icon */
  icon?: LucideIcon;
  /** Tooltip Hint */
  tooltip?: React.ReactNode;
  /** Click callback */
  onClick?: () => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- FloatButton ----

const FloatButton: React.FC<FloatButtonProps> & {
  Group: typeof FloatButtonGroup;
  BackTop: typeof BackTop;
} = ({
  icon,
  description,
  tooltip,
  tooltipPlacement = 'left',
  badge,
  dot,
  shape = 'circle',
  type = 'default',
  onClick,
  href,
  target,
  className,
  style,
}) => {
  const cls = [
    'aero-float-btn',
    `aero-float-btn--${shape}`,
    `aero-float-btn--${type}`,
    description ? 'aero-float-btn--has-desc' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const iconSize = description ? 18 : 22;

  const inner = (
    <>
      {icon && <Icon icon={icon} size={iconSize} className="aero-float-btn-icon" />}
      {description && <span className="aero-float-btn-desc">{description}</span>}
    </>
  );

  const hasBadge = badge !== undefined || dot;

  const body = href ? (
    <a className={cls} style={style} href={href} target={target} rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <div className={cls} style={style} onClick={onClick} role="button" tabIndex={0}>
      {inner}
    </div>
  );

  const wrapped = hasBadge ? (
    <Badge count={badge} dot={dot} offset={[-4, 4]}>
      {body}
    </Badge>
  ) : (
    body
  );

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        {wrapped}
      </Tooltip>
    );
  }

  return wrapped;
};

// ---- FloatButton.Group ----

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  icon = Plus,
  closeIcon,
  trigger = 'click',
  open,
  onOpenChange,
  shape = 'circle',
  tooltip,
  type = 'default',
  children,
  className,
  style,
}) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? open! : internalOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(0);

  const setOpen = useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange],
  );

  // Click outside to close
  useEffect(() => {
    if (trigger !== 'click' || !isOpen) return;
    const handleDoc = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleDoc);
    return () => document.removeEventListener('mousedown', handleDoc);
  }, [trigger, isOpen, setOpen]);

  const handleTriggerClick = () => {
    if (trigger === 'click') setOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (trigger !== 'hover') return;
    clearTimeout(hoverTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (trigger !== 'hover') return;
    hoverTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  const cls = [
    'aero-float-btn-group',
    isOpen ? 'aero-float-btn-group--open' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const triggerCls = [
    'aero-float-btn',
    `aero-float-btn--${shape}`,
    `aero-float-btn--${type}`,
    'aero-float-btn--trigger',
    isOpen ? 'aero-float-btn--trigger-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const triggerBtn = (
    <div className={triggerCls} onClick={handleTriggerClick} role="button" tabIndex={0}>
      <Icon
        icon={isOpen && closeIcon ? closeIcon : icon}
        size={22}
        className="aero-float-btn-icon aero-float-btn-trigger-icon"
      />
    </div>
  );

  const wrappedTrigger = tooltip && !isOpen ? (
    <Tooltip title={tooltip} placement="left">
      {triggerBtn}
    </Tooltip>
  ) : (
    triggerBtn
  );

  // Calculate child button count for staggered animation
  const childArray = React.Children.toArray(children);

  return (
    <div
      ref={containerRef}
      className={cls}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aero-float-btn-group-items">
        {childArray.map((child, i) => (
          <div
            key={i}
            className="aero-float-btn-group-item"
            style={{
              transitionDelay: isOpen ? `${i * 30}ms` : `${(childArray.length - 1 - i) * 20}ms`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {wrappedTrigger}
    </div>
  );
};

// ---- FloatButton.BackTop ----

const BackTop: React.FC<BackTopProps> = ({
  visibilityHeight = 400,
  target,
  shape = 'circle',
  icon = ArrowUp,
  tooltip,
  onClick,
  className,
  style,
}) => {
  const localeFloat = useLocale('FloatButton');
  const finalTooltip = tooltip ?? localeFloat.backToTop;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = target ? target() : window;
    const getScrollTop = () => {
      if (el instanceof Window) return document.documentElement.scrollTop || document.body.scrollTop;
      return (el as HTMLElement).scrollTop;
    };

    const handleScroll = throttle(() => {
      setVisible(getScrollTop() >= visibilityHeight);
    }, 100);

    // Initial detection
    handleScroll();

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [visibilityHeight, target]);

  const handleClick = () => {
    const el = target ? target() : window;
    if (el instanceof Window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      (el as HTMLElement).scrollTo({ top: 0, behavior: 'smooth' });
    }
    onClick?.();
  };

  const cls = [
    'aero-float-btn-backtop',
    visible ? 'aero-float-btn-backtop--visible' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cls} style={style}>
      <FloatButton icon={icon} tooltip={finalTooltip} shape={shape} onClick={handleClick} />
    </div>
  );
};

FloatButton.Group = FloatButtonGroup;
FloatButton.BackTop = BackTop;

export default FloatButton;

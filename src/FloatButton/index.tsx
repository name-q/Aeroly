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
  /** 图标 */
  icon?: LucideIcon;
  /** 描述文字（图标下方） */
  description?: React.ReactNode;
  /** Tooltip 提示 */
  tooltip?: React.ReactNode;
  /** Tooltip 方向 */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
  /** 徽标数 */
  badge?: number;
  /** 徽标小红点 */
  dot?: boolean;
  /** 按钮形状 */
  shape?: 'circle' | 'square';
  /** 按钮类型 */
  type?: 'default' | 'primary';
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** 链接地址 */
  href?: string;
  /** 链接 target */
  target?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface FloatButtonGroupProps {
  /** 展开时的图标，默认 Plus */
  icon?: LucideIcon;
  /** 展开时的关闭图标，默认旋转 icon 45° */
  closeIcon?: LucideIcon;
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 是否展开（受控） */
  open?: boolean;
  /** 展开变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 按钮形状 */
  shape?: 'circle' | 'square';
  /** Tooltip 提示 */
  tooltip?: React.ReactNode;
  /** 按钮类型 */
  type?: 'default' | 'primary';
  /** 子按钮 */
  children: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface BackTopProps {
  /** 滚动高度达到此值时显示，默认 400 */
  visibilityHeight?: number;
  /** 滚动目标，默认 window */
  target?: () => HTMLElement | Window;
  /** 按钮形状 */
  shape?: 'circle' | 'square';
  /** 图标 */
  icon?: LucideIcon;
  /** Tooltip 提示 */
  tooltip?: React.ReactNode;
  /** 点击回调 */
  onClick?: () => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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

  // 点击外部关闭
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

  // 计算子按钮数量用于交错动画
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

    // 初始检测
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

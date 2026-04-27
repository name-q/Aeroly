import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './index.less';

// ---- Types ----

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** 弹出Content */
  content: React.ReactNode;
  /** Title */
  title?: React.ReactNode;
  /** Trigger mode */
  trigger?: 'hover' | 'click';
  /** Placement */
  placement?: PopoverPlacement;
  /** Whether visible (controlled) */
  open?: boolean;
  /** DefaultWhether visible（uncontrolled) */
  defaultOpen?: boolean;
  /** Visibility change callback */
  onOpenChange?: (open: boolean) => void;
  /** Gap between popup and trigger */
  offset?: number;
  /** Trigger element */
  children: React.ReactNode;
  /** 裸Mode：不包裹 inner/content，不限宽，不加 padding，直接Render content */
  raw?: boolean;
  /** 弹出层Custom class name */
  popupClassName?: string;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Position calculation ----

interface Pos { top: number; left: number; actualPlacement: PopoverPlacement }

function calcPosition(
  triggerRect: DOMRect,
  popRect: { width: number; height: number },
  placement: PopoverPlacement,
  offset: number,
): Pos {
  const { top: tTop, left: tLeft, width: tW, height: tH } = triggerRect;
  const { width: pW, height: pH } = popRect;
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  const tCenterX = tLeft + scrollX + tW / 2;
  const tCenterY = tTop + scrollY + tH / 2;

  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = tTop + scrollY - pH - offset;
      left = tCenterX - pW / 2;
      break;
    case 'bottom':
      top = tTop + scrollY + tH + offset;
      left = tCenterX - pW / 2;
      break;
    case 'left':
      top = tCenterY - pH / 2;
      left = tLeft + scrollX - pW - offset;
      break;
    case 'right':
      top = tCenterY - pH / 2;
      left = tLeft + scrollX + tW + offset;
      break;
  }

  return { top, left, actualPlacement: placement };
}

// 边界翻转 + 水平/垂直 clamp
function flipIfNeeded(
  triggerRect: DOMRect,
  popRect: { width: number; height: number },
  placement: PopoverPlacement,
  offset: number,
): Pos {
  const pos = calcPosition(triggerRect, popRect, placement, offset);
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const edgePadding = 8;

  let flipped: PopoverPlacement | null = null;

  if (placement === 'top' && pos.top - scrollY < 0) flipped = 'bottom';
  else if (placement === 'bottom' && pos.top - scrollY + popRect.height > vh) flipped = 'top';
  else if (placement === 'left' && pos.left - scrollX < 0) flipped = 'right';
  else if (placement === 'right' && pos.left - scrollX + popRect.width > vw) flipped = 'left';

  const result = flipped ? calcPosition(triggerRect, popRect, flipped, offset) : pos;

  // 水平方向 clamp（top/bottom placement）
  if (result.actualPlacement === 'top' || result.actualPlacement === 'bottom') {
    const minLeft = scrollX + edgePadding;
    const maxLeft = scrollX + vw - popRect.width - edgePadding;
    result.left = Math.max(minLeft, Math.min(result.left, maxLeft));
  }

  // 垂直方向 clamp（left/right placement）
  if (result.actualPlacement === 'left' || result.actualPlacement === 'right') {
    const minTop = scrollY + edgePadding;
    const maxTop = scrollY + vh - popRect.height - edgePadding;
    result.top = Math.max(minTop, Math.min(result.top, maxTop));
  }

  return result;
}

// 从 trigger wrapper 中获取定位目标，并裁剪到可见区域
function getTriggerRect(wrapper: HTMLElement): DOMRect {
  const wrapperRect = wrapper.getBoundingClientRect();
  let rect = wrapperRect;
  if (wrapperRect.width <= 0 || wrapperRect.height <= 0) {
    const firstChild = wrapper.firstElementChild as HTMLElement | null;
    if (firstChild) {
      const childRect = firstChild.getBoundingClientRect();
      if (childRect.width > 0 || childRect.height > 0) rect = childRect;
    }
  }

  let left = rect.left;
  let top = rect.top;
  let right = rect.right;
  let bottom = rect.bottom;

  // 向上遍历祖先，裁剪到最近的 overflow 容器的可见区域
  let ancestor = wrapper.parentElement;
  while (ancestor && ancestor !== document.body && ancestor !== document.documentElement) {
    const style = getComputedStyle(ancestor);
    const ox = style.overflowX;
    const oy = style.overflowY;
    if (ox === 'hidden' || ox === 'auto' || ox === 'scroll' ||
        oy === 'hidden' || oy === 'auto' || oy === 'scroll') {
      const aRect = ancestor.getBoundingClientRect();
      left = Math.max(left, aRect.left);
      top = Math.max(top, aRect.top);
      right = Math.min(right, aRect.right);
      bottom = Math.min(bottom, aRect.bottom);
    }
    ancestor = ancestor.parentElement;
  }

  // 最终裁剪到视口
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  left = Math.max(0, left);
  top = Math.max(0, top);
  right = Math.min(vw, right);
  bottom = Math.min(vh, bottom);

  return new DOMRect(left, top, Math.max(0, right - left), Math.max(0, bottom - top));
}

// ---- Popover ----

const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  trigger = 'hover',
  placement = 'top',
  open,
  defaultOpen = false,
  onOpenChange,
  offset = 8,
  children,
  raw = false,
  popupClassName,
  className,
  style,
}) => {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlled ? open! : internalOpen;

  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);

  const triggerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(0);

  const setOpen = useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange],
  );

  // Calculate position
  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const popEl = popRef.current;
    if (!triggerEl || !popEl) return;

    const triggerRect = getTriggerRect(triggerEl);
    const popRect = { width: popEl.offsetWidth, height: popEl.offsetHeight };
    const result = flipIfNeeded(triggerRect, popRect, placement, offset);
    setPos(result);
  }, [placement, offset]);
  // Mount/unmount animation
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [isOpen]);

  // 挂载后Calculate position
  useEffect(() => {
    if (mounted) {
      updatePosition();
    }
  }, [mounted, updatePosition]);

  // 滚动/resize 时更新位置
  useEffect(() => {
    if (!isOpen) return;
    const handleUpdate = () => updatePosition();
    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);
    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
  }, [isOpen, updatePosition]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!isOpen && e.propertyName === 'opacity') {
      setMounted(false);
      setPos(null);
    }
  };

  // ---- 触发逻辑 ----

  const handleMouseEnter = () => {
    if (trigger !== 'hover') return;
    clearTimeout(hoverTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (trigger !== 'hover') return;
    hoverTimer.current = window.setTimeout(() => setOpen(false), 100);
  };

  const handleClick = () => {
    if (trigger !== 'click') return;
    setOpen(!isOpen);
  };

  // Click outside to close（click Mode）
  useEffect(() => {
    if (trigger !== 'click' || !isOpen) return;
    const handleDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleDocClick);
    return () => document.removeEventListener('mousedown', handleDocClick);
  }, [trigger, isOpen, setOpen]);

  // 全屏 overlay（如 Image Preview）打开时关闭 hover Popover
  useEffect(() => {
    if (trigger !== 'hover' || !isOpen) return;
    const handleOverlayOpen = () => setOpen(false);
    document.addEventListener('aero-overlay-open', handleOverlayOpen);
    return () => document.removeEventListener('aero-overlay-open', handleOverlayOpen);
  }, [trigger, isOpen, setOpen]);

  const actualPlacement = pos?.actualPlacement || 'top';

  const popClassNames = [
    'aero-popover',
    raw ? 'aero-popover--raw' : '',
    animating ? 'aero-popover--open' : '',
    `aero-popover--${actualPlacement}`,
    popupClassName || '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const popup = mounted ? (
    <div
      ref={popRef}
      className={popClassNames}
      style={{
        ...style,
        top: pos ? pos.top : -9999,
        left: pos ? pos.left : -9999,
      }}
      onTransitionEnd={handleTransitionEnd}
      onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
      onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
    >
      {raw ? (
        content
      ) : (
        <div className="aero-popover-inner">
          {title && <div className="aero-popover-title">{title}</div>}
          <div className="aero-popover-content">{content}</div>
        </div>
      )}
    </div>
  ) : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="aero-popover-trigger"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
      {popup && createPortal(popup, document.body)}
    </>
  );
};

export default Popover;

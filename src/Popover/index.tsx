import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './index.less';

// ---- Types ----

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** 弹出内容 */
  content: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 弹出方向 */
  placement?: PopoverPlacement;
  /** 是否显示（受控） */
  open?: boolean;
  /** 默认是否显示（非受控） */
  defaultOpen?: boolean;
  /** 显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹层与触发元素的间距 */
  offset?: number;
  /** 触发元素 */
  children: React.ReactNode;
  /** 裸模式：不包裹 inner/content，不限宽，不加 padding，直接渲染 content */
  raw?: boolean;
  /** 弹出层自定义类名 */
  popupClassName?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 位置计算 ----

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

// 边界翻转
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

  let flipped: PopoverPlacement | null = null;

  if (placement === 'top' && pos.top - scrollY < 0) flipped = 'bottom';
  else if (placement === 'bottom' && pos.top - scrollY + popRect.height > vh) flipped = 'top';
  else if (placement === 'left' && pos.left - scrollX < 0) flipped = 'right';
  else if (placement === 'right' && pos.left - scrollX + popRect.width > vw) flipped = 'left';

  if (flipped) {
    return calcPosition(triggerRect, popRect, flipped, offset);
  }

  return pos;
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

  const triggerRef = useRef<HTMLElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<number>(0);

  const setOpen = useCallback(
    (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [isControlled, onOpenChange],
  );

  // 计算位置
  const updatePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    const popEl = popRef.current;
    if (!triggerEl || !popEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const popRect = { width: popEl.offsetWidth, height: popEl.offsetHeight };
    const result = flipIfNeeded(triggerRect, popRect, placement, offset);
    setPos(result);
  }, [placement, offset]);

  // 挂载/卸载动画
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

  // 挂载后计算位置
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

  // 点击外部关闭（click 模式）
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

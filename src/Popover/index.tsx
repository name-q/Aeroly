import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.less';

// ---- Types ----

export type PopoverPlacement =
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';

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
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 位置计算 ----

interface Pos { top: number; left: number; arrowTop: number; arrowLeft: number; actualPlacement: PopoverPlacement }

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

  // 触发元素中心
  const tCenterX = tLeft + scrollX + tW / 2;
  const tCenterY = tTop + scrollY + tH / 2;

  let top = 0;
  let left = 0;
  let arrowTop = 0;
  let arrowLeft = 0;

  const base = placement.replace(/Left|Right|Top|Bottom$/, '') as 'top' | 'bottom' | 'left' | 'right';

  // 主轴定位
  switch (base) {
    case 'top':
      top = tTop + scrollY - pH - offset;
      break;
    case 'bottom':
      top = tTop + scrollY + tH + offset;
      break;
    case 'left':
      left = tLeft + scrollX - pW - offset;
      break;
    case 'right':
      left = tLeft + scrollX + tW + offset;
      break;
  }

  // 交叉轴定位
  if (base === 'top' || base === 'bottom') {
    if (placement.endsWith('Left')) {
      left = tLeft + scrollX;
      arrowLeft = Math.min(tW / 2, pW - 20);
    } else if (placement.endsWith('Right')) {
      left = tLeft + scrollX + tW - pW;
      arrowLeft = Math.max(pW - tW / 2, 20);
    } else {
      left = tCenterX - pW / 2;
      arrowLeft = pW / 2;
    }
    arrowTop = base === 'top' ? pH : 0;
  } else {
    if (placement.endsWith('Top')) {
      top = tTop + scrollY;
      arrowTop = Math.min(tH / 2, pH - 16);
    } else if (placement.endsWith('Bottom')) {
      top = tTop + scrollY + tH - pH;
      arrowTop = Math.max(pH - tH / 2, 16);
    } else {
      top = tCenterY - pH / 2;
      arrowTop = pH / 2;
    }
    arrowLeft = base === 'left' ? pW : 0;
  }

  return { top, left, arrowTop, arrowLeft, actualPlacement: placement };
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

  const base = placement.replace(/Left|Right|Top|Bottom$/, '') as string;
  const suffix = placement.replace(/^(top|bottom|left|right)/, '');

  let flippedBase = base;

  // 检测是否溢出并翻转
  if (base === 'top' && pos.top - scrollY < 0) flippedBase = 'bottom';
  else if (base === 'bottom' && pos.top - scrollY + popRect.height > vh) flippedBase = 'top';
  else if (base === 'left' && pos.left - scrollX < 0) flippedBase = 'right';
  else if (base === 'right' && pos.left - scrollX + popRect.width > vw) flippedBase = 'left';

  if (flippedBase !== base) {
    const newPlacement = (flippedBase + suffix) as PopoverPlacement;
    return calcPosition(triggerRect, popRect, newPlacement, offset);
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

  // hover
  const handleMouseEnter = () => {
    if (trigger !== 'hover') return;
    clearTimeout(hoverTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    if (trigger !== 'hover') return;
    hoverTimer.current = window.setTimeout(() => setOpen(false), 100);
  };

  // click
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

  // 箭头方向
  const actualBase = pos?.actualPlacement.replace(/Left|Right|Top|Bottom$/, '') || 'top';

  const popClassNames = [
    'aero-popover',
    animating ? 'aero-popover--open' : '',
    `aero-popover--${actualBase}`,
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

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
      {mounted && (
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
          <div className="aero-popover-inner">
            {title && <div className="aero-popover-title">{title}</div>}
            <div className="aero-popover-content">{content}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popover;

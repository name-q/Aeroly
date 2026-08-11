import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Icon from '../Icon';
import { useLocale } from '../ConfigProvider/useConfig';
import { liquidGlassPanelOptions, useLiquidGlass, LiquidGlassDecor } from '../liquid-glass';
import './index.less';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStepConfig {
  /** 目标元素的 ref 或 CSS Selection器 */
  target?: React.RefObject<HTMLElement | null> | string | null;
  /** Title */
  title: React.ReactNode;
  /** Description */
  description?: React.ReactNode;
  /** Placement */
  placement?: TourPlacement;
  /** CustomContent（覆盖 title + description） */
  content?: React.ReactNode;
  /** Whether to show mask高亮 */
  mask?: boolean;
}

export interface TourProps {
  /** Whether visible */
  open: boolean;
  /** Visibility change callback */
  onOpenChange: (open: boolean) => void;
  /** 步骤配置 */
  steps: TourStepConfig[];
  /** Current step（Controlled） */
  current?: number;
  /** Step change callback */
  onChange?: (current: number) => void;
  /** Finish callback */
  onFinish?: () => void;
  /** Whether to show mask */
  mask?: boolean;
  /** 点击遮罩关闭 */
  maskClosable?: boolean;
  /** 按 Esc to close */
  keyboard?: boolean;
  /** 高亮区域内边距 */
  spotlightPadding?: number;
  /** 弹层与目标Gap */
  offset?: number;
  /** Custom class name */
  className?: string;
}

// ---- Position calculation ----

interface Pos {
  top: number;
  left: number;
  actualPlacement: TourPlacement;
}

function calcPosition(
  targetRect: DOMRect,
  popRect: { width: number; height: number },
  placement: TourPlacement,
  offset: number,
  spotlightPadding: number,
): Pos {
  // 所有坐标基于 viewport（父容器是 position: fixed; inset: 0）
  const tTop = targetRect.top;
  const tLeft = targetRect.left;
  const tW = targetRect.width;
  const tH = targetRect.height;
  const pW = popRect.width;
  const pH = popRect.height;
  const pad = spotlightPadding;

  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = tTop - pad - pH - offset;
      left = tLeft + tW / 2 - pW / 2;
      break;
    case 'bottom':
      top = tTop + tH + pad + offset;
      left = tLeft + tW / 2 - pW / 2;
      break;
    case 'left':
      top = tTop + tH / 2 - pH / 2;
      left = tLeft - pad - pW - offset;
      break;
    case 'right':
      top = tTop + tH / 2 - pH / 2;
      left = tLeft + tW + pad + offset;
      break;
  }

  return { top, left, actualPlacement: placement };
}

function flipIfNeeded(
  targetRect: DOMRect,
  popRect: { width: number; height: number },
  placement: TourPlacement,
  offset: number,
  spotlightPadding: number,
): Pos {
  const pos = calcPosition(targetRect, popRect, placement, offset, spotlightPadding);
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let flipped: TourPlacement | null = null;

  if (placement === 'top' && pos.top < 0) flipped = 'bottom';
  else if (placement === 'bottom' && pos.top + popRect.height > vh) flipped = 'top';
  else if (placement === 'left' && pos.left < 0) flipped = 'right';
  else if (placement === 'right' && pos.left + popRect.width > vw) flipped = 'left';

  if (flipped) {
    return calcPosition(targetRect, popRect, flipped, offset, spotlightPadding);
  }

  // 边界夹紧
  pos.left = Math.max(8, Math.min(pos.left, vw - popRect.width - 8));

  return pos;
}

// ---- 获取目标元素 ----

function getTargetElement(target?: React.RefObject<HTMLElement | null> | string | null): HTMLElement | null {
  if (!target) return null;
  if (typeof target === 'string') return document.querySelector<HTMLElement>(target);
  return target.current;
}

// ---- Tour Component ----

const Tour: React.FC<TourProps> = (props) => {
  const localeTour = useLocale('Tour');
  const {
    open,
    onOpenChange,
    steps,
    current: controlledCurrent,
    onChange,
    onFinish,
    keyboard = true,
    spotlightPadding = 6,
    offset = 12,
    className,
  } = props;
  const isControlled = controlledCurrent !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(0);
  const activeCurrent = isControlled ? controlledCurrent! : internalCurrent;

  const lg = useLiquidGlass({ ...liquidGlassPanelOptions, zIndex: 1061 });
  const [animating, setAnimating] = useState(false);
  const [idle, setIdle] = useState(!open);
  const [pos, setPos] = useState<Pos | null>(null);

  const popRef = useRef<HTMLDivElement | null>(null);

  const step = steps[activeCurrent];
  const total = steps.length;
  const isLast = activeCurrent === total - 1;
  const isFirst = activeCurrent === 0;

  // 设置Current step
  const setCurrent = useCallback(
    (idx: number) => {
      if (!isControlled) setInternalCurrent(idx);
      onChange?.(idx);
    },
    [isControlled, onChange],
  );

  // Reset步骤
  useEffect(() => {
    if (open) {
      setCurrent(0);
    }
  }, [open]);

  // Keep the glass surface mounted while preserving the exit movement.
  useEffect(() => {
    let enterFrame = 0;
    if (open) {
      setIdle(false);
      const mountFrame = requestAnimationFrame(() => {
        enterFrame = requestAnimationFrame(() => setAnimating(true));
      });
      return () => {
        cancelAnimationFrame(mountFrame);
        cancelAnimationFrame(enterFrame);
      };
    } else {
      setAnimating(false);
      const idleTimer = window.setTimeout(() => setIdle(true), 260);
      return () => clearTimeout(idleTimer);
    }
  }, [open]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!open && e.target === popRef.current && e.propertyName === 'transform') {
      setIdle(true);
    }
  };

  // Calculate position
  const updatePosition = useCallback(() => {
    if (!step) return;
    const targetEl = getTargetElement(step.target);
    const popEl = popRef.current;

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();

      // 滚动到可视区域
      const vh = window.innerHeight;
      if (rect.top < 0 || rect.bottom > vh) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 滚动后重新计算
        requestAnimationFrame(() => {
          const newRect = targetEl.getBoundingClientRect();
          if (popEl) {
            const popRect = { width: popEl.offsetWidth, height: popEl.offsetHeight };
            setPos(flipIfNeeded(newRect, popRect, step.placement || 'bottom', offset, spotlightPadding));
          }
        });
        return;
      }

      if (popEl) {
        const popRect = { width: popEl.offsetWidth, height: popEl.offsetHeight };
        setPos(flipIfNeeded(rect, popRect, step.placement || 'bottom', offset, spotlightPadding));
      }
    } else {
      // 无目标：居中显示
      if (popEl) {
        const pW = popEl.offsetWidth;
        const pH = popEl.offsetHeight;
        setPos({
          top: window.innerHeight / 2 - pH / 2,
          left: window.innerWidth / 2 - pW / 2,
          actualPlacement: 'bottom',
        });
      }
    }
  }, [step, offset, spotlightPadding]);

  useEffect(() => {
    if (!open) return undefined;
    const frame = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(frame);
  }, [open, activeCurrent, updatePosition]);

  // 滚动/resize 更新
  useEffect(() => {
    if (!open) return;
    const handle = () => updatePosition();
    window.addEventListener('scroll', handle, true);
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('scroll', handle, true);
      window.removeEventListener('resize', handle);
    };
  }, [open, updatePosition]);

  // 锁定 body 滚动
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onFinish?.();
      onOpenChange(false);
    } else {
      setCurrent(activeCurrent + 1);
    }
  }, [isLast, activeCurrent, onFinish, onOpenChange, setCurrent]);

  const handlePrev = useCallback(() => {
    if (!isFirst) {
      setCurrent(activeCurrent - 1);
    }
  }, [isFirst, activeCurrent, setCurrent]);

  const handleClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  // Keyboard
  useEffect(() => {
    if (!open || !keyboard) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, keyboard, handleNext, handlePrev, handleClose]);

  if (typeof document === 'undefined') return null;

  const actualPlacement = pos?.actualPlacement || 'bottom';

  const rootCls = [
    'aero-tour-root',
    'aero-lg-popup-host',
    'aero-lg-popup-staged',
    'aero-lg-popup-prewarmed',
    animating ? 'aero-tour-root--open' : '',
    idle ? 'aero-lg-popup-idle' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const popCls = [
    'aero-tour-popover',
    'aero-lg-popup-prewarmed',
    `aero-tour-popover--${actualPlacement}`,
    animating ? 'aero-tour-popover--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div
      className={rootCls}
      aria-hidden={!open}
      {...(!open ? { inert: '' } : {})}
      onTransitionEnd={handleTransitionEnd}
    >

      {/* Popover card */}
      <div
        ref={(node: HTMLDivElement | null) => {
          popRef.current = node;
          lg.refs.surfaceRef.current = node;
        }}
        className={`${popCls} aero-lg-surface aero-lg-panel${lg.isFull ? ' aero-lg-surface--full' : ''}`}
        style={{
          top: pos ? pos.top : -9999,
          left: pos ? pos.left : -9999,
          ...lg.vars,
        }}
        {...lg.surfaceProps}
      >
        {lg.isFull && <div ref={lg.refs.warpRef} className="aero-lg-warp" />}
        <div className="aero-lg-content">
          <button className="aero-tour-close" onClick={handleClose} tabIndex={-1}>
            <Icon icon={X} size={14} />
          </button>

          {step?.content ? (
            <div className="aero-tour-custom">{step.content}</div>
          ) : (
            <>
              {step?.title && <div className="aero-tour-title">{step.title}</div>}
              {step?.description && (
                <div className="aero-tour-description">{step.description}</div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="aero-tour-footer">
            {total > 1 && (
              <div className="aero-tour-indicators">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={`aero-tour-indicator ${i === activeCurrent ? 'aero-tour-indicator--active' : ''}`}
                  />
                ))}
              </div>
            )}
            <div className="aero-tour-actions">
              {!isFirst && (
                <button className="aero-tour-btn aero-tour-btn--prev" onClick={handlePrev}>
                  {localeTour.prevStep}
                </button>
              )}
              <button className="aero-tour-btn aero-tour-btn--next" onClick={handleNext}>
                {isLast ? localeTour.finish : localeTour.nextStep}
              </button>
            </div>
          </div>
        </div>
      </div>
      <LiquidGlassDecor refs={lg.refs} zIndex={1061} />
    </div>,
    document.body,
  );
};

export default Tour;

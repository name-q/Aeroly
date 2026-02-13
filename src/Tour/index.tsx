import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStepConfig {
  /** 目标元素的 ref 或 CSS 选择器 */
  target?: React.RefObject<HTMLElement | null> | string | null;
  /** 标题 */
  title: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 弹出方向 */
  placement?: TourPlacement;
  /** 自定义内容（覆盖 title + description） */
  content?: React.ReactNode;
  /** 是否显示遮罩高亮 */
  mask?: boolean;
}

export interface TourProps {
  /** 是否显示 */
  open: boolean;
  /** 显隐变化回调 */
  onOpenChange: (open: boolean) => void;
  /** 步骤配置 */
  steps: TourStepConfig[];
  /** 当前步骤（受控） */
  current?: number;
  /** 步骤变化回调 */
  onChange?: (current: number) => void;
  /** 完成回调 */
  onFinish?: () => void;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩关闭 */
  maskClosable?: boolean;
  /** 按 Esc 关闭 */
  keyboard?: boolean;
  /** 高亮区域内边距 */
  spotlightPadding?: number;
  /** 弹层与目标间距 */
  offset?: number;
  /** 自定义类名 */
  className?: string;
}

// ---- 位置计算 ----

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

// ---- Tour 组件 ----

const Tour: React.FC<TourProps> = ({
  open,
  onOpenChange,
  steps,
  current: controlledCurrent,
  onChange,
  onFinish,
  mask = true,
  maskClosable = false,
  keyboard = true,
  spotlightPadding = 6,
  offset = 12,
  className,
}) => {
  const isControlled = controlledCurrent !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(0);
  const activeCurrent = isControlled ? controlledCurrent! : internalCurrent;

  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const [spotlightRect, setSpotlightRect] = useState<DOMRect | null>(null);

  const popRef = useRef<HTMLDivElement>(null);

  const step = steps[activeCurrent];
  const total = steps.length;
  const isLast = activeCurrent === total - 1;
  const isFirst = activeCurrent === 0;
  const stepMask = step?.mask ?? mask;

  // 设置当前步骤
  const setCurrent = useCallback(
    (idx: number) => {
      if (!isControlled) setInternalCurrent(idx);
      onChange?.(idx);
    },
    [isControlled, onChange],
  );

  // 重置步骤
  useEffect(() => {
    if (open) {
      setCurrent(0);
    }
  }, [open]);

  // 挂载/卸载动画
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
      setPos(null);
      setSpotlightRect(null);
    }
  };

  // 计算位置
  const updatePosition = useCallback(() => {
    if (!step) return;
    const targetEl = getTargetElement(step.target);
    const popEl = popRef.current;

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setSpotlightRect(rect);

      // 滚动到可视区域
      const vh = window.innerHeight;
      if (rect.top < 0 || rect.bottom > vh) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 滚动后重新计算
        requestAnimationFrame(() => {
          const newRect = targetEl.getBoundingClientRect();
          setSpotlightRect(newRect);
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
      setSpotlightRect(null);
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
    if (mounted) {
      // 延迟一帧让 popRef 渲染
      requestAnimationFrame(() => updatePosition());
    }
  }, [mounted, activeCurrent, updatePosition]);

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

  // 键盘
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

  const handleMaskClick = () => {
    if (maskClosable) onOpenChange(false);
  };

  if (!mounted) return null;

  // Spotlight: clip-path 在 mask 上挖洞，让目标区域不被模糊
  const getMaskClipPath = (): string | undefined => {
    if (!spotlightRect) return undefined;
    const pad = spotlightPadding;
    const x = spotlightRect.left - pad;
    const y = spotlightRect.top - pad;
    const w = spotlightRect.width + pad * 2;
    const h = spotlightRect.height + pad * 2;
    const r = 8; // border-radius
    // polygon: 外框(全屏) → 内框(圆角矩形近似，用8段折线模拟圆角)
    return `path(evenodd, 'M0 0H${window.innerWidth}V${window.innerHeight}H0V0Z M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z')`;
  };

  const spotlightStyle: React.CSSProperties = spotlightRect
    ? {
        top: spotlightRect.top - spotlightPadding,
        left: spotlightRect.left - spotlightPadding,
        width: spotlightRect.width + spotlightPadding * 2,
        height: spotlightRect.height + spotlightPadding * 2,
      }
    : { display: 'none' };

  const actualPlacement = pos?.actualPlacement || 'bottom';

  const rootCls = [
    'aero-tour-root',
    animating ? 'aero-tour-root--open' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const popCls = [
    'aero-tour-popover',
    `aero-tour-popover--${actualPlacement}`,
    animating ? 'aero-tour-popover--open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return createPortal(
    <div className={rootCls} onTransitionEnd={handleTransitionEnd}>
      {/* Mask */}
      {stepMask && (
        <div
          className="aero-tour-mask"
          onClick={handleMaskClick}
          style={{ clipPath: getMaskClipPath() }}
        />
      )}
      {/* Spotlight border hint */}
      {stepMask && spotlightRect && (
        <div className="aero-tour-spotlight" style={spotlightStyle} />
      )}

      {/* Popover card */}
      <div
        ref={popRef}
        className={popCls}
        style={{
          top: pos ? pos.top : -9999,
          left: pos ? pos.left : -9999,
        }}
      >
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
                上一步
              </button>
            )}
            <button className="aero-tour-btn aero-tour-btn--next" onClick={handleNext}>
              {isLast ? '完成' : '下一步'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Tour;

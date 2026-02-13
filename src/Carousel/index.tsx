import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export type CarouselEffect = 'slide' | 'fade';
export type CarouselDirection = 'horizontal' | 'vertical';

export interface CarouselItem {
  key: string;
  children?: React.ReactNode;
}

export interface CarouselRef {
  next(): void;
  prev(): void;
  goTo(index: number): void;
}

export interface CarouselProps {
  /** 轮播项数据 */
  items: CarouselItem[];
  /** 当前索引（受控） */
  current?: number;
  /** 默认索引（非受控） */
  defaultCurrent?: number;
  /** 切换回调 */
  onChange?: (current: number) => void;
  /** 切换前回调 */
  beforeChange?: (from: number, to: number) => void;
  /** 切换效果 */
  effect?: CarouselEffect;
  /** 方向 */
  direction?: CarouselDirection;
  /** 自动播放 */
  autoplay?: boolean;
  /** 自动播放间隔 ms */
  autoplayInterval?: number;
  /** 箭头显示方式 */
  arrows?: boolean | 'hover';
  /** 指示点 */
  dots?: boolean;
  /** 指示点位置 */
  dotsPosition?: 'bottom' | 'top' | 'left' | 'right' | 'inner';
  /** 循环 */
  loop?: boolean;
  /** 垂直模式高度 */
  height?: number | string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      items,
      current,
      defaultCurrent = 0,
      onChange,
      beforeChange,
      effect = 'slide',
      direction = 'horizontal',
      autoplay = false,
      autoplayInterval = 3000,
      arrows = 'hover',
      dots = true,
      dotsPosition = 'inner',
      loop = true,
      height,
      className,
      style,
    },
    ref,
  ) => {
    const isControlled = current !== undefined;
    const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
    const activeCurrent = isControlled ? current! : internalCurrent;

    const [hovered, setHovered] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const [viewportHeight, setViewportHeight] = useState(0);

    // Loop clone offset: track = [clone-last, ...items, clone-first]
    const useClone = loop && effect === 'slide';
    const total = items.length;

    // displayIndex for slide track position
    const getDisplayIndex = useCallback(
      (idx: number) => (useClone ? idx + 1 : idx),
      [useClone],
    );

    const [displayIndex, setDisplayIndex] = useState(getDisplayIndex(activeCurrent));
    const [noTransition, setNoTransition] = useState(false);

    // Sync displayIndex when activeCurrent changes (non-loop or fade)
    useEffect(() => {
      if (!useClone) {
        setDisplayIndex(getDisplayIndex(activeCurrent));
      }
    }, [activeCurrent, useClone, getDisplayIndex]);

    // Measure viewport height for vertical mode
    const isVertical = direction === 'vertical';
    useEffect(() => {
      if (!isVertical || effect !== 'slide') return;
      const el = viewportRef.current;
      if (!el) return;
      const measure = () => setViewportHeight(el.clientHeight);
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, [isVertical, effect]);

    const goTo = useCallback(
      (index: number) => {
        if (isTransitioning) return;
        const clamped = Math.max(0, Math.min(index, total - 1));
        beforeChange?.(activeCurrent, clamped);
        if (!isControlled) setInternalCurrent(clamped);
        onChange?.(clamped);

        if (useClone) {
          setIsTransitioning(true);
          setDisplayIndex(getDisplayIndex(clamped));
        }
      },
      [activeCurrent, total, isControlled, useClone, isTransitioning, beforeChange, onChange, getDisplayIndex],
    );

    const next = useCallback(() => {
      if (isTransitioning) return;
      if (loop) {
        const nextIdx = (activeCurrent + 1) % total;
        beforeChange?.(activeCurrent, nextIdx);
        if (!isControlled) setInternalCurrent(nextIdx);
        onChange?.(nextIdx);

        if (useClone) {
          setIsTransitioning(true);
          setDisplayIndex(getDisplayIndex(activeCurrent) + 1);
        }
      } else if (activeCurrent < total - 1) {
        goTo(activeCurrent + 1);
      }
    }, [activeCurrent, total, loop, useClone, isTransitioning, isControlled, beforeChange, onChange, getDisplayIndex, goTo]);

    const prev = useCallback(() => {
      if (isTransitioning) return;
      if (loop) {
        const prevIdx = (activeCurrent - 1 + total) % total;
        beforeChange?.(activeCurrent, prevIdx);
        if (!isControlled) setInternalCurrent(prevIdx);
        onChange?.(prevIdx);

        if (useClone) {
          setIsTransitioning(true);
          setDisplayIndex(getDisplayIndex(activeCurrent) - 1);
        }
      } else if (activeCurrent > 0) {
        goTo(activeCurrent - 1);
      }
    }, [activeCurrent, total, loop, useClone, isTransitioning, isControlled, beforeChange, onChange, getDisplayIndex, goTo]);

    useImperativeHandle(ref, () => ({ next, prev, goTo }), [next, prev, goTo]);

    // Handle loop clone snap-back
    const handleTransitionEnd = useCallback(() => {
      if (!useClone) {
        setIsTransitioning(false);
        return;
      }
      // Went past last → snap to clone-first → real first
      if (displayIndex >= total + 1) {
        setNoTransition(true);
        setDisplayIndex(1);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNoTransition(false);
            setIsTransitioning(false);
          });
        });
      }
      // Went before first → snap to clone-last → real last
      else if (displayIndex <= 0) {
        setNoTransition(true);
        setDisplayIndex(total);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setNoTransition(false);
            setIsTransitioning(false);
          });
        });
      } else {
        setIsTransitioning(false);
      }
    }, [useClone, displayIndex, total]);

    // Autoplay
    useEffect(() => {
      if (!autoplay || hovered || total <= 1) return;
      const timer = setInterval(() => {
        if (loop) {
          // Use functional update to always get latest
          next();
        } else {
          // Non-loop: stop at end
          next();
        }
      }, autoplayInterval);
      return () => clearInterval(timer);
    }, [autoplay, autoplayInterval, hovered, total, loop, next]);

    // Touch / pointer drag
    const pointerStart = useRef<{ x: number; y: number } | null>(null);

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        pointerStart.current = { x: e.clientX, y: e.clientY };
      },
      [],
    );

    useEffect(() => {
      const handlePointerMove = () => {};
      const handlePointerUp = (e: PointerEvent) => {
        if (!pointerStart.current) return;
        const dx = e.clientX - pointerStart.current.x;
        const dy = e.clientY - pointerStart.current.y;
        const delta = direction === 'horizontal' ? dx : dy;
        if (Math.abs(delta) > 50) {
          if (delta < 0) next();
          else prev();
        }
        pointerStart.current = null;
      };

      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      return () => {
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
      };
    }, [direction, next, prev]);

    // Keyboard
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const isH = direction === 'horizontal';
        if (
          (isH && e.key === 'ArrowRight') ||
          (!isH && e.key === 'ArrowDown')
        ) {
          e.preventDefault();
          next();
        } else if (
          (isH && e.key === 'ArrowLeft') ||
          (!isH && e.key === 'ArrowUp')
        ) {
          e.preventDefault();
          prev();
        }
      },
      [direction, next, prev],
    );

    // Build slide list (with clones for loop slide)
    const slides = useClone
      ? [
          { ...items[total - 1], key: '__clone-last' },
          ...items,
          { ...items[0], key: '__clone-first' },
        ]
      : items;

    const translateProp = isVertical ? 'translateY' : 'translateX';

    const getTransformValue = () => {
      if (isVertical && viewportHeight > 0) {
        return `translateY(-${displayIndex * viewportHeight}px)`;
      }
      return `${translateProp}(-${displayIndex * 100}%)`;
    };

    const trackStyle: React.CSSProperties =
      effect === 'slide'
        ? {
            flexDirection: isVertical ? 'column' : 'row',
            transform: getTransformValue(),
            transition: noTransition ? 'none' : `transform 400ms ${getCssTimingFunction()}`,
          }
        : {};

    // Arrow visibility
    const canPrev = loop || activeCurrent > 0;
    const canNext = loop || activeCurrent < total - 1;

    const arrowsCls =
      arrows === 'hover'
        ? 'aero-carousel__arrows--hover'
        : arrows
          ? 'aero-carousel__arrows--always'
          : 'aero-carousel__arrows--hidden';

    const dotsVertical = dotsPosition === 'left' || dotsPosition === 'right';
    const dotsInner = dotsPosition === 'inner';

    const dotsNode = dots && total > 1 && (
      <div
        className={`aero-carousel__dots ${dotsVertical ? 'aero-carousel__dots--vertical' : ''}`}
      >
        {items.map((item, i) => (
          <button
            key={item.key}
            className={`aero-carousel__dot ${i === activeCurrent ? 'aero-carousel__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            tabIndex={-1}
          />
        ))}
      </div>
    );

    const rootCls = [
      'aero-carousel',
      `aero-carousel--${effect}`,
      `aero-carousel--${direction}`,
      `aero-carousel--dots-${dotsPosition}`,
      arrowsCls,
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const PrevIcon = isVertical ? ChevronUp : ChevronLeft;
    const NextIcon = isVertical ? ChevronDown : ChevronRight;

    return (
      <div
        ref={rootRef}
        className={rootCls}
        style={style}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={handlePointerDown}
        role="region"
        aria-roledescription="carousel"
        aria-label="Carousel"
      >
        <div
          className="aero-carousel__viewport"
          ref={viewportRef}
          style={isVertical && height ? { height } : undefined}
        >
          {effect === 'slide' ? (
            <div
              ref={trackRef}
              className="aero-carousel__track"
              style={trackStyle}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((item, i) => (
                <div
                  className="aero-carousel__slide"
                  key={item.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${useClone ? i : i + 1} of ${total}`}
                >
                  {item.children}
                </div>
              ))}
            </div>
          ) : (
            <div className="aero-carousel__fade-container">
              {items.map((item, i) => (
                <div
                  className={`aero-carousel__slide aero-carousel__slide--fade ${i === activeCurrent ? 'aero-carousel__slide--active' : ''}`}
                  key={item.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${i + 1} of ${total}`}
                  style={i === 0 ? { position: 'relative' } : undefined}
                >
                  {item.children}
                </div>
              ))}
            </div>
          )}

          {/* Arrows */}
          {arrows !== false && (
            <>
              <button
                className="aero-carousel__arrow aero-carousel__arrow--prev"
                onClick={prev}
                disabled={!canPrev}
                aria-label="Previous slide"
                tabIndex={-1}
              >
                <Icon icon={PrevIcon} size={18} />
              </button>
              <button
                className="aero-carousel__arrow aero-carousel__arrow--next"
                onClick={next}
                disabled={!canNext}
                aria-label="Next slide"
                tabIndex={-1}
              >
                <Icon icon={NextIcon} size={18} />
              </button>
            </>
          )}
          {dotsInner && dotsNode}
        </div>

        {!dotsInner && dotsNode}
      </div>
    );
  },
);

function getCssTimingFunction() {
  return 'cubic-bezier(0.4, 0, 0.2, 1)';
}

Carousel.displayName = 'Carousel';

export default Carousel;

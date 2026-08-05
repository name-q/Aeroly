import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { LiquidGlassRefs } from './useLiquidGlass';

interface LiquidGlassDecorProps {
  refs: Pick<LiquidGlassRefs, 'surfaceRef' | 'edgeScreenRef' | 'edgeOverlayRef' | 'sheenRef'>;
  zIndex?: number;
}

/**
 * 液态玻璃装饰层：边缘捕光环（screen/overlay 两层）+ hover/active 高光。
 * 作为面板的 body 级兄弟节点渲染（fixed 定位），保证 mix-blend 与页面背板混色，
 * 而不是只和面板自身内容混色。位置由 surface rect 测量同步。
 */
export function LiquidGlassDecor({ refs, zIndex = 1050 }: LiquidGlassDecorProps) {
  const raf = useRef(0);
  const refsRef = useRef(refs);
  refsRef.current = refs;

  const applyRect = useCallback(() => {
    const el = refsRef.current.surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const radius = getComputedStyle(el).borderRadius;
    const list = [refsRef.current.edgeScreenRef, refsRef.current.edgeOverlayRef, refsRef.current.sheenRef];
    for (const ref of list) {
      const node = ref.current;
      if (!node) continue;
      node.style.left = `${rect.left}px`;
      node.style.top = `${rect.top}px`;
      node.style.width = `${rect.width}px`;
      node.style.height = `${rect.height}px`;
      node.style.borderRadius = radius;
      node.style.zIndex = String(zIndex);
    }
  }, [zIndex]);

  const schedule = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(applyRect);
  }, [applyRect]);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    applyRect();

    const el = refsRef.current.surfaceRef.current;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && el) {
      ro = new ResizeObserver(schedule);
      ro.observe(el);
    }
    window.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf.current);
    };
  }, [applyRect, schedule]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <>
      <span ref={refs.edgeScreenRef} className="aero-lg-edge aero-lg-edge--screen" />
      <span ref={refs.edgeOverlayRef} className="aero-lg-edge aero-lg-edge--overlay" />
      <span ref={refs.sheenRef} className="aero-lg-sheen" />
    </>,
    document.body,
  );
}

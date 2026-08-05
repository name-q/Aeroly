import { useCallback, useEffect, useRef } from 'react';
import type React from 'react';
import { getLiquidGlassSupport } from './support';
import { ensureLiquidGlassFilter, FILTER_ID, FILTER_ID_STRONG } from './inject';

export interface LiquidGlassRefs {
  surfaceRef: React.MutableRefObject<HTMLDivElement | null>;
  warpRef: React.MutableRefObject<HTMLSpanElement | null>;
  edgeScreenRef: React.MutableRefObject<HTMLSpanElement | null>;
  edgeOverlayRef: React.MutableRefObject<HTMLSpanElement | null>;
  sheenRef: React.MutableRefObject<HTMLSpanElement | null>;
}

export interface UseLiquidGlassOptions {
  /** 表面模糊半径（px），默认 40 */
  blur?: number;
  /** 饱和度（%），默认 140 */
  saturation?: number;
  /** 位移折射强度，>75 用强折射滤镜，默认 60 */
  displacementScale?: number;
  /** 色差强度，默认 2 */
  aberrationIntensity?: number;
  /** 弹性形变强度（0 关闭），默认 0。仅低频独立浮层启用 */
  elasticity?: number;
  /** 弹性激活半径（px），默认 200 */
  detectRadius?: number;
  /** 整体关闭液态效果 */
  disabled?: boolean;
  /** 单独关闭位移折射（保留表面模糊与装饰层） */
  displacementDisabled?: boolean;
  /** 装饰层 z-index，默认 1050 */
  zIndex?: number;
}

export interface UseLiquidGlassResult {
  refs: LiquidGlassRefs;
  /** 是否走完整位移折射（Chromium only） */
  isFull: boolean;
  support: { backdrop: boolean; displacement: boolean };
  /** 静态 CSS 变量，spread 到表面元素 style */
  vars: React.CSSProperties;
  /** 鼠标事件回调，spread 到表面或 pointerTarget */
  surfaceProps: {
    onMouseEnter: (e: React.MouseEvent) => void;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: (e: React.MouseEvent) => void;
    onMouseDown: (e: React.MouseEvent) => void;
    onMouseUp: (e: React.MouseEvent) => void;
  };
}

interface FrameInput {
  clientX: number;
  clientY: number;
}

export function useLiquidGlass(options: UseLiquidGlassOptions = {}): UseLiquidGlassResult {
  const support = getLiquidGlassSupport();
  const isFull = support.displacement && !options.disabled && !options.displacementDisabled;

  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const warpRef = useRef<HTMLSpanElement | null>(null);
  const edgeScreenRef = useRef<HTMLSpanElement | null>(null);
  const edgeOverlayRef = useRef<HTMLSpanElement | null>(null);
  const sheenRef = useRef<HTMLSpanElement | null>(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const state = useRef({ hovered: false, active: false, raf: 0 });

  useEffect(() => {
    ensureLiquidGlassFilter();
  }, []);

  const writeFrameVars = useCallback((angle: string, glowX: string, glowY: string) => {
    const nodes = [surfaceRef.current, edgeScreenRef.current, edgeOverlayRef.current, sheenRef.current];
    for (const node of nodes) {
      if (!node) continue;
      node.style.setProperty('--aero-lg-angle', angle);
      node.style.setProperty('--aero-lg-glow-x', glowX);
      node.style.setProperty('--aero-lg-glow-y', glowY);
    }
  }, []);

  const writeElastic = useCallback(
    (sx: number, sy: number, tx: number, ty: number) => {
      const nodes = [surfaceRef.current, edgeScreenRef.current, edgeOverlayRef.current, sheenRef.current];
      for (const node of nodes) {
        if (!node) continue;
        node.style.transformOrigin = 'center';
        node.style.transform = `translate(${tx}px, ${ty}px) scaleX(${sx}) scaleY(${sy})`;
      }
    },
    [],
  );

  const applyFrame = useCallback(
    (input: FrameInput) => {
      const el = surfaceRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = rect.width ? Math.max(-0.5, Math.min(0.5, (input.clientX - cx) / rect.width)) : 0;
      const ny = rect.height ? Math.max(-0.5, Math.min(0.5, (input.clientY - cy) / rect.height)) : 0;

      writeFrameVars(`${135 + nx * 120}deg`, `${50 + nx * 100}%`, `${50 + ny * 100}%`);

      const o = optionsRef.current;
      if (o.elasticity) {
        const rx = Math.max(0, Math.abs(input.clientX - cx) - rect.width / 2);
        const ry = Math.max(0, Math.abs(input.clientY - cy) - rect.height / 2);
        const edgeDist = Math.sqrt(rx * rx + ry * ry);
        const zone = o.detectRadius ?? 200;
        const fade = edgeDist > zone ? 0 : 1 - edgeDist / zone;
        const centerDist = Math.hypot(input.clientX - cx, input.clientY - cy);
        const intensity = Math.min(centerDist / 300, 1) * o.elasticity * fade;
        const sx = Math.max(0.8, 1 + Math.abs(nx) * intensity * 0.3 - Math.abs(ny) * intensity * 0.15);
        const sy = Math.max(0.8, 1 + Math.abs(ny) * intensity * 0.3 - Math.abs(nx) * intensity * 0.15);
        const tx = (input.clientX - cx) * o.elasticity * 0.1 * fade;
        const ty = (input.clientY - cy) * o.elasticity * 0.1 * fade;
        writeElastic(sx, sy, tx, ty);
      }
    },
    [writeFrameVars, writeElastic],
  );

  const scheduleFrame = useCallback(
    (input: FrameInput) => {
      cancelAnimationFrame(state.current.raf);
      state.current.raf = requestAnimationFrame(() => applyFrame(input));
    },
    [applyFrame],
  );

  const syncDecorState = useCallback(() => {
    const { hovered, active } = state.current;
    const el = surfaceRef.current;
    el?.classList.toggle('aero-lg-hovered', hovered);
    el?.classList.toggle('aero-lg-active', active);

    const edgeBase = 0.25;
    if (edgeScreenRef.current) edgeScreenRef.current.style.opacity = hovered ? '0.5' : String(edgeBase);
    if (edgeOverlayRef.current) edgeOverlayRef.current.style.opacity = hovered ? '0.55' : String(edgeBase);
    if (sheenRef.current) sheenRef.current.style.opacity = active ? '0.6' : hovered ? '1' : '0';
  }, []);

  const onMouseEnter = useCallback(() => {
    state.current.hovered = true;
    syncDecorState();
  }, [syncDecorState]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      scheduleFrame({ clientX: e.clientX, clientY: e.clientY });
    },
    [scheduleFrame],
  );

  const onMouseLeave = useCallback(() => {
    state.current.hovered = false;
    state.current.active = false;
    syncDecorState();
    if (optionsRef.current.elasticity) {
      const nodes = [surfaceRef.current, edgeScreenRef.current, edgeOverlayRef.current, sheenRef.current];
      for (const node of nodes) if (node) node.style.transform = '';
    }
  }, [syncDecorState]);

  const onMouseDown = useCallback(() => {
    state.current.active = true;
    syncDecorState();
  }, [syncDecorState]);

  const onMouseUp = useCallback(() => {
    state.current.active = false;
    syncDecorState();
  }, [syncDecorState]);

  const scale = options.displacementScale ?? 60;
  const vars = {
    '--aero-lg-blur': `${options.blur ?? 40}px`,
    '--aero-lg-sat': `${options.saturation ?? 140}%`,
    '--aero-lg-filter': isFull ? `url(#${scale > 75 ? FILTER_ID_STRONG : FILTER_ID})` : 'none',
  } as React.CSSProperties;

  return {
    refs: { surfaceRef, warpRef, edgeScreenRef, edgeOverlayRef, sheenRef },
    isFull,
    support,
    vars,
    surfaceProps: { onMouseEnter, onMouseMove, onMouseLeave, onMouseDown, onMouseUp },
  };
}

import { useCallback, useEffect, useId, useRef } from 'react';
import type React from 'react';
import { getLiquidGlassSupport } from './support';
import { attachLiquidGlassFilter } from './filter';

export interface LiquidGlassRefs {
  surfaceRef: React.MutableRefObject<HTMLDivElement | null>;
  warpRef: React.MutableRefObject<HTMLDivElement | null>;
}

export interface UseLiquidGlassOptions {
  /** 表面模糊半径（px），默认 20（40px 双层模糊会糊成色块，削弱玻璃感） */
  blur?: number;
  /** 饱和度（%），默认 140 */
  saturation?: number;
  /** 位移折射强度，>75 用强折射滤镜，默认 60 */
  displacementScale?: number;
  /** 色差强度，默认 0 */
  aberrationIntensity?: number;
  /** 弹性形变强度（0 关闭），默认 0。仅低频独立浮层启用 */
  elasticity?: number;
  /** 弹性激活半径（px），默认 200 */
  detectRadius?: number;
  /** 整体关闭液态效果 */
  disabled?: boolean;
  /** 单独关闭位移折射（保留表面模糊与装饰层） */
  displacementDisabled?: boolean;
  /** 兼容旧调用保留；装饰层现在在 surface 内部，不再使用 z-index */
  zIndex?: number;
}

export const liquidGlassPanelOptions = {
  blur: 20,
  saturation: 140,
  displacementScale: 58,
  aberrationIntensity: 2,
} as const;

export interface UseLiquidGlassResult {
  refs: LiquidGlassRefs;
  /** 是否走完整位移折射（Chromium only） */
  isFull: boolean;
  support: { backdrop: boolean; displacement: boolean };
  filterId: string;
  filterStyle: string;
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
  const isFull =
    support.displacement &&
    !options.disabled &&
    !options.displacementDisabled;

  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const warpRef = useRef<HTMLDivElement | null>(null);
  const rawFilterId = useId();
  const filterId = `aero-lg-${rawFilterId.replace(/[^a-zA-Z0-9_-]/g, '')}-filter`;

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const state = useRef({ hovered: false, active: false, raf: 0, input: null as FrameInput | null });

  useEffect(() => {
    if (!isFull) return undefined;
    const surface = surfaceRef.current;
    const warp = warpRef.current;
    if (!surface || !warp) return undefined;
    return attachLiquidGlassFilter(
      surface,
      warp,
      filterId,
      options.displacementScale ?? 42,
      options.aberrationIntensity ?? 0,
    );
  }, [filterId, isFull, options.aberrationIntensity, options.displacementScale]);

  useEffect(() => () => cancelAnimationFrame(state.current.raf), []);

  const writeFrameVars = useCallback((angle: string, glowX: string, glowY: string) => {
    const node = surfaceRef.current;
    if (!node) return;
    node.style.setProperty('--aero-lg-angle', angle);
    node.style.setProperty('--aero-lg-glow-x', glowX);
    node.style.setProperty('--aero-lg-glow-y', glowY);
  }, []);

  const writeElastic = useCallback(
    (sx: number, sy: number, tx: number, ty: number) => {
      const node = surfaceRef.current;
      if (!node) return;
      node.style.transformOrigin = 'center';
      node.style.transform = `translate(${tx}px, ${ty}px) scaleX(${sx}) scaleY(${sy})`;
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

  const scheduleFrame = useCallback((input: FrameInput) => {
    state.current.input = input;
    if (state.current.raf) return;
    state.current.raf = requestAnimationFrame(() => {
      state.current.raf = 0;
      const next = state.current.input;
      if (next) applyFrame(next);
    });
  }, [applyFrame]);

  const syncDecorState = useCallback(() => {
    const { hovered, active } = state.current;
    const el = surfaceRef.current;
    el?.classList.toggle('aero-lg-hovered', hovered);
    el?.classList.toggle('aero-lg-active', active);

    el?.style.setProperty('--aero-lg-edge-opacity', hovered ? '0.5' : '0.25');
    el?.style.setProperty('--aero-lg-sheen-opacity', active ? '0.6' : hovered ? '1' : '0');
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
      if (surfaceRef.current) surfaceRef.current.style.transform = '';
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

  const vars = {
    '--aero-lg-blur': `${options.blur ?? 20}px`,
    '--aero-lg-sat': `${options.saturation ?? 140}%`,
  } as React.CSSProperties;

  return {
    refs: { surfaceRef, warpRef },
    isFull,
    support,
    filterId,
    filterStyle: isFull ? `url(#${filterId})` : 'none',
    vars,
    surfaceProps: { onMouseEnter, onMouseMove, onMouseLeave, onMouseDown, onMouseUp },
  };
}

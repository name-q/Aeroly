import type { LiquidGlassRefs } from './useLiquidGlass';

interface LiquidGlassDecorProps {
  refs: Pick<LiquidGlassRefs, 'surfaceRef'>;
  zIndex?: number;
}

/**
 * 保留旧接入点以兼容现有组件。
 *
 * 边缘光和 hover sheen 现在由 .aero-lg-surface 的伪元素绘制。
 * 旧实现把三个 fixed span portal 到 body，多个 Modal 叠加时会产生
 * 重复混色和覆盖底层面板的矩形，因此这里不再创建任何 DOM。
 */
export function LiquidGlassDecor(_props: LiquidGlassDecorProps) {
  return null;
}

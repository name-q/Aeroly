// 浏览器液态玻璃能力检测：backdrop-filter 与位移折射（SVG displacement）分级支持
// 结果模块级缓存，只在首次调用时计算

export interface LiquidGlassSupport {
  backdrop: boolean;
  displacement: boolean;
}

let cached: LiquidGlassSupport | null = null;

export function getLiquidGlassSupport(): LiquidGlassSupport {
  if (cached) return cached;

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const isFirefox = /firefox/i.test(ua);
  const isSafari = /safari/i.test(ua) && !/chrome|crios|edg|opr/i.test(ua);

  const canCssSupports =
    typeof CSS !== 'undefined' && typeof CSS.supports === 'function';
  const backdrop = canCssSupports
    ? CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    : typeof document !== 'undefined' &&
      'WebkitBackdropFilter' in document.documentElement.style;

  // 位移折射依赖 feImage + feDisplacementMap 完整实现，仅 Chromium 可靠
  cached = { backdrop, displacement: backdrop && !isFirefox && !isSafari };
  return cached;
}

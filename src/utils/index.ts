/**
 * AeroUI 公共工具函数
 */

export { useDropdownPosition } from './useDropdownPosition';
export type { Placement, Alignment } from './useDropdownPosition';

/**
 * 节流：在 delay 时间窗口内最多执行一次
 * 适用于拖拽、滚动等高频事件
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): T {
  let last = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;

  const throttled = (...args: any[]) => {
    const now = Date.now();
    const remaining = delay - (now - last);

    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      last = now;
      fn(...args);
    } else if (!timer) {
      // 保证尾调用，拖拽松手时最后一次也能触发
      timer = setTimeout(() => {
        last = Date.now();
        timer = null;
        fn(...args);
      }, remaining);
    }
  };

  return throttled as T;
}

/**
 * 防抖：延迟 delay 后执行，期间重复调用会重置计时
 * 适用于输入搜索、窗口 resize 等场景
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): T {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn(...args);
    }, delay);
  };

  return debounced as T;
}

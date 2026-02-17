/**
 * AeroUI Public utilities
 */

export { useDropdownPosition } from './useDropdownPosition';
export type { Placement, Alignment } from './useDropdownPosition';

/**
 * Throttle: execute at most once within delay window
 * Suitable for high-frequency events like drag, scroll
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
      // Ensure trailing call, last invocation fires when drag ends
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
 * Debounce: execute after delay, repeated calls reset timer
 * 适用于InputSearch、窗口 resize 等场景
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

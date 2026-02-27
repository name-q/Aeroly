import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle, debounce } from '../index';

describe('throttle', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('executes immediately on first call', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('suppresses calls within delay window', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    // only the first fires immediately, trailing is pending
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('fires trailing call after delay', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled('a');
    throttled('b');
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith('b');
  });

  it('allows next immediate call after delay fully expires', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled(); // fires immediately (1)
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    // no trailing since no extra call was queued

    throttled(); // fires immediately again (2)
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes arguments correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);
    throttled(1, 'hello');
    expect(fn).toHaveBeenCalledWith(1, 'hello');
  });
});

describe('debounce', () => {
  beforeEach(() => { vi.useFakeTimers(); });
  afterEach(() => { vi.useRealTimers(); });

  it('does not execute immediately', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    expect(fn).not.toHaveBeenCalled();
  });

  it('executes after delay', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer on repeated calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes the latest arguments', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced('a');
    debounced('b');
    debounced('c');
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('c');
  });

  it('can fire multiple times with enough delay between calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(100);
    debounced();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

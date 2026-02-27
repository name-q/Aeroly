import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDropdownPosition } from '../useDropdownPosition';

function mockRect(overrides: Partial<DOMRect> = {}): DOMRect {
  return {
    top: 0, right: 0, bottom: 0, left: 0,
    width: 0, height: 0, x: 0, y: 0,
    toJSON: () => ({}),
    ...overrides,
  };
}

function createRef<T>(value: T) {
  return { current: value } as React.RefObject<T>;
}

describe('useDropdownPosition', () => {
  let rafCallbacks: FrameRequestCallback[] = [];

  beforeEach(() => {
    rafCallbacks = [];
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
  });

  afterEach(() => { vi.restoreAllMocks(); });

  function flushRAF() {
    rafCallbacks.forEach((cb) => cb(0));
    rafCallbacks = [];
  }

  it('defaults to bottom-left when closed', () => {
    const triggerRef = createRef(document.createElement('div'));
    const dropdownRef = createRef(document.createElement('div'));

    const { result } = renderHook(() => useDropdownPosition(triggerRef, dropdownRef, false));
    expect(result.current).toEqual({ placement: 'bottom', alignment: 'left' });
  });

  it('returns bottom-left when enough space below', () => {
    const trigger = document.createElement('div');
    const dropdown = document.createElement('div');

    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      mockRect({ top: 100, bottom: 140, left: 0, width: 200 }),
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      mockRect({ height: 300, width: 200 }),
    );

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    const triggerRef = createRef(trigger);
    const dropdownRef = createRef(dropdown);

    const { result } = renderHook(() => useDropdownPosition(triggerRef, dropdownRef, true));
    act(() => flushRAF());

    expect(result.current.placement).toBe('bottom');
    expect(result.current.alignment).toBe('left');
  });

  it('returns top when not enough space below', () => {
    const trigger = document.createElement('div');
    const dropdown = document.createElement('div');

    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      mockRect({ top: 600, bottom: 640, left: 0, width: 200 }),
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      mockRect({ height: 300, width: 200 }),
    );

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    const triggerRef = createRef(trigger);
    const dropdownRef = createRef(dropdown);

    const { result } = renderHook(() => useDropdownPosition(triggerRef, dropdownRef, true));
    act(() => flushRAF());

    expect(result.current.placement).toBe('top');
  });

  it('returns right alignment when dropdown overflows right edge', () => {
    const trigger = document.createElement('div');
    const dropdown = document.createElement('div');

    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue(
      mockRect({ top: 100, bottom: 140, left: 900, width: 200 }),
    );
    vi.spyOn(dropdown, 'getBoundingClientRect').mockReturnValue(
      mockRect({ height: 200, width: 400 }),
    );

    Object.defineProperty(window, 'innerHeight', { value: 800, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    const triggerRef = createRef(trigger);
    const dropdownRef = createRef(dropdown);

    const { result } = renderHook(() => useDropdownPosition(triggerRef, dropdownRef, true));
    act(() => flushRAF());

    expect(result.current.alignment).toBe('right');
  });
});

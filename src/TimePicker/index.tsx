import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, X } from 'lucide-react';
import Icon from '../Icon';
import { useDropdownPosition } from '../utils';
import { useLocale, useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface TimePickerProps {
  /** Current value (controlled, "HH:mm:ss" or "HH:mm") */
  value?: string;
  /** Default value（uncontrolled) */
  defaultValue?: string;
  /** Change callback */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether disabled */
  disabled?: boolean;
  /** Whether to allow clearing */
  allowClear?: boolean;
  /** Whether to show seconds */
  showSecond?: boolean;
  /** Hour step */
  hourStep?: number;
  /** Minute step */
  minuteStep?: number;
  /** Second step */
  secondStep?: number;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Status */
  status?: 'error' | 'warning';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function range(start: number, end: number, step: number): number[] {
  const arr: number[] = [];
  for (let i = start; i < end; i += step) arr.push(i);
  return arr;
}

function parseTime(val: string): [number, number, number] {
  const parts = val.split(':').map(Number);
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

// ---- Infinite scroll column ----

const ITEM_HEIGHT = 32;
const VISIBLE_COUNT = 7;
const REPEAT_COUNT = 100;
const CENTER_OFFSET = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

interface ColumnProps {
  items: number[];
  selected: number;
  onSelect: (val: number) => void;
}

const BUFFER = 10; // Extra items rendered above and below viewport

const Column: React.FC<ColumnProps> = ({ items, selected, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef<number>(0);
  const programmatic = useRef(false);
  const count = items.length;
  const midBase = Math.floor(REPEAT_COUNT / 2) * count;
  const prevSelected = useRef(selected);
  const mountedRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = count * REPEAT_COUNT * ITEM_HEIGHT;

  // Programmatic scroll: set flag, clear after scroll completes
  const scrollTo = useCallback((top: number, smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    programmatic.current = true;
    el.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      programmatic.current = false;
    }, smooth ? 300 : 50);
  }, []);

  // Calculate scroll position from value (based on current viewport, avoid jumping back to center)
  const getTopForValue = useCallback((val: number, nearCurrentScroll = false) => {
    const idx = items.indexOf(val);
    if (idx < 0) return 0;
    if (!nearCurrentScroll) {
      return (midBase + idx) * ITEM_HEIGHT - CENTER_OFFSET;
    }
    // Find nearest occurrence of value near current scrollTop
    const el = listRef.current;
    const currentTop = el ? el.scrollTop : 0;
    const currentCenter = Math.round((currentTop + CENTER_OFFSET) / ITEM_HEIGHT);
    // Group number corresponding to current center
    const groupIdx = Math.round((currentCenter - idx) / count);
    const nearestGlobal = groupIdx * count + idx;
    return nearestGlobal * ITEM_HEIGHT - CENTER_OFFSET;
  }, [items, midBase, count]);

  // First mount: position immediately
  useEffect(() => {
    mountedRef.current = true;
    const top = getTopForValue(selected);
    setScrollTop(top);
    scrollTo(top, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // External selected change (e.g. clicking "Now")
  useEffect(() => {
    if (!mountedRef.current) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      scrollTo(getTopForValue(selected, true), true);
    }
  }, [selected, scrollTo, getTopForValue]);

  // After user scroll stops: snap + select
  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;

    setScrollTop(el.scrollTop);

    if (programmatic.current) return;

    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      if (!el) return;

      const centerScroll = el.scrollTop + CENTER_OFFSET;
      const rawIdx = Math.round(centerScroll / ITEM_HEIGHT);
      const itemIdx = ((rawIdx % count) + count) % count;
      const val = items[itemIdx];

      // Snap
      const snapTop = rawIdx * ITEM_HEIGHT - CENTER_OFFSET;
      scrollTo(snapTop, true);

      // Select
      if (val !== prevSelected.current) {
        prevSelected.current = val;
        onSelect(val);
      }
    }, 100);
  }, [count, items, onSelect, scrollTo]);

  // Click to select (snap to nearest, no jump to center)
  const handleClick = useCallback(
    (val: number) => {
      prevSelected.current = val;
      onSelect(val);
      scrollTo(getTopForValue(val, true), true);
    },
    [onSelect, scrollTo, getTopForValue],
  );

  // Dynamically calculate render window based on scrollTop
  const viewportHeight = VISIBLE_COUNT * ITEM_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIdx = Math.min(
    count * REPEAT_COUNT,
    Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT) + BUFFER,
  );

  const cells: React.ReactNode[] = [];
  for (let globalIdx = startIdx; globalIdx < endIdx; globalIdx++) {
    const itemIdx = ((globalIdx % count) + count) % count;
    const val = items[itemIdx];
    cells.push(
      <div
        key={globalIdx}
        className={`aero-time-picker-cell${val === selected ? ' aero-time-picker-cell--active' : ''}`}
        style={{
          position: 'absolute',
          top: globalIdx * ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
        }}
        onClick={() => handleClick(val)}
      >
        {pad(val)}
      </div>,
    );
  }

  return (
    <div
      className="aero-time-picker-column"
      ref={listRef}
      onScroll={handleScroll}
      style={{ height: viewportHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {cells}
      </div>
    </div>
  );
};

// ---- TimePicker ----

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  allowClear = true,
  showSecond = true,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  size: sizeProp,
  status,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const localeTime = useLocale('TimePicker');
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = isControlled ? value! : internalValue;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { placement, alignment } = useDropdownPosition(wrapRef, dropdownRef, mounted);

  const [h, m, s] = currentValue ? parseTime(currentValue) : [0, 0, 0];

  const updateValue = useCallback(
    (hour: number, minute: number, second: number) => {
      const next = showSecond
        ? `${pad(hour)}:${pad(minute)}:${pad(second)}`
        : `${pad(hour)}:${pad(minute)}`;
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange, showSecond],
  );

  // Open/close animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [open]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!open && e.propertyName === 'opacity') {
      setMounted(false);
    }
  };

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue('');
    onChange?.('');
    setOpen(false);
  };

  const hours = range(0, 24, hourStep);
  const minutes = range(0, 60, minuteStep);
  const seconds = range(0, 60, secondStep);

  const rootClassNames = [
    'aero-time-picker',
    `aero-time-picker--${size}`,
    open ? 'aero-time-picker--open' : '',
    disabled ? 'aero-time-picker--disabled' : '',
    status ? `aero-time-picker--${status}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassNames} style={style} ref={wrapRef}>
      <div
        className="aero-time-picker-input"
        onClick={() => !disabled && setOpen(!open)}
      >
        <Icon icon={Clock} size={14} className="aero-time-picker-icon" />
        <span className={`aero-time-picker-value${!currentValue ? ' aero-time-picker-value--placeholder' : ''}`}>
          {currentValue || placeholder || localeTime.placeholder}
        </span>
        {allowClear && currentValue && !disabled && (
          <span className="aero-time-picker-clear" onClick={handleClear}>
            <Icon icon={X} size={12} />
          </span>
        )}
      </div>

      {mounted && (
        <div
          ref={dropdownRef}
          className={`aero-time-picker-dropdown aero-time-picker-dropdown--${placement} aero-time-picker-dropdown--${alignment}${animating ? ' aero-time-picker-dropdown--open' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="aero-time-picker-panel">
            <Column items={hours} selected={h} onSelect={(v) => updateValue(v, m, s)} />
            <Column items={minutes} selected={m} onSelect={(v) => updateValue(h, v, s)} />
            {showSecond && (
              <Column items={seconds} selected={s} onSelect={(v) => updateValue(h, m, v)} />
            )}
            <div className="aero-time-picker-indicator" />
          </div>
          <div className="aero-time-picker-footer">
            <button
              type="button"
              className="aero-time-picker-now"
              onClick={() => {
                const now = new Date();
                updateValue(now.getHours(), now.getMinutes(), now.getSeconds());
              }}
            >
              {localeTime.now}
            </button>
            <button
              type="button"
              className="aero-time-picker-ok"
              onClick={() => {
                if (!currentValue) {
                  updateValue(h, m, s);
                }
                setOpen(false);
              }}
            >
              {localeTime.confirm}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;

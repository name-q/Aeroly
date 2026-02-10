import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Clock, X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export interface TimePickerProps {
  /** 当前值（受控，"HH:mm:ss" 或 "HH:mm"） */
  value?: string;
  /** 默认值（非受控） */
  defaultValue?: string;
  /** 变化回调 */
  onChange?: (value: string) => void;
  /** 占位文案 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否显示秒 */
  showSecond?: boolean;
  /** 小时步长 */
  hourStep?: number;
  /** 分钟步长 */
  minuteStep?: number;
  /** 秒步长 */
  secondStep?: number;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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

// ---- 无限滚动列 ----

const ITEM_HEIGHT = 32;
const VISIBLE_COUNT = 7;
const REPEAT_COUNT = 100;
const CENTER_OFFSET = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;

interface ColumnProps {
  items: number[];
  selected: number;
  onSelect: (val: number) => void;
}

const BUFFER = 10; // 视口上下各多渲染的条目数

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

  // 程序化滚动：设标记，滚动完成后清除
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

  // 根据值计算滚动位置（基于当前视口附近，避免跳回中间）
  const getTopForValue = useCallback((val: number, nearCurrentScroll = false) => {
    const idx = items.indexOf(val);
    if (idx < 0) return 0;
    if (!nearCurrentScroll) {
      return (midBase + idx) * ITEM_HEIGHT - CENTER_OFFSET;
    }
    // 找到当前 scrollTop 附近最近的该值出现位置
    const el = listRef.current;
    const currentTop = el ? el.scrollTop : 0;
    const currentCenter = Math.round((currentTop + CENTER_OFFSET) / ITEM_HEIGHT);
    // 当前中心对应的组号
    const groupIdx = Math.round((currentCenter - idx) / count);
    const nearestGlobal = groupIdx * count + idx;
    return nearestGlobal * ITEM_HEIGHT - CENTER_OFFSET;
  }, [items, midBase, count]);

  // 首次挂载：立即定位
  useEffect(() => {
    mountedRef.current = true;
    const top = getTopForValue(selected);
    setScrollTop(top);
    scrollTo(top, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 外部 selected 变化（如点击"此刻"）
  useEffect(() => {
    if (!mountedRef.current) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      scrollTo(getTopForValue(selected, true), true);
    }
  }, [selected, scrollTo, getTopForValue]);

  // 用户滚动停止后：吸附 + 选中
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

      // 吸附
      const snapTop = rawIdx * ITEM_HEIGHT - CENTER_OFFSET;
      scrollTo(snapTop, true);

      // 选中
      if (val !== prevSelected.current) {
        prevSelected.current = val;
        onSelect(val);
      }
    }, 100);
  }, [count, items, onSelect, scrollTo]);

  // 点击选中（就近吸附，不跳回中间）
  const handleClick = useCallback(
    (val: number) => {
      prevSelected.current = val;
      onSelect(val);
      scrollTo(getTopForValue(val, true), true);
    },
    [onSelect, scrollTo, getTopForValue],
  );

  // 基于 scrollTop 动态计算渲染窗口
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
  size = 'medium',
  className,
  style,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = isControlled ? value! : internalValue;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

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

  // 打开/关闭动画
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

  // 点击外部关闭
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
          {currentValue || placeholder || '请选择时间'}
        </span>
        {allowClear && currentValue && !disabled && (
          <span className="aero-time-picker-clear" onClick={handleClear}>
            <Icon icon={X} size={12} />
          </span>
        )}
      </div>

      {mounted && (
        <div
          className={`aero-time-picker-dropdown${animating ? ' aero-time-picker-dropdown--open' : ''}`}
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
              此刻
            </button>
            <button
              type="button"
              className="aero-time-picker-ok"
              onClick={() => setOpen(false)}
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;

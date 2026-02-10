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

const Column: React.FC<ColumnProps> = ({ items, selected, onSelect }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef<number>(0);
  const programmatic = useRef(false); // 标记程序化滚动
  const count = items.length;
  const midBase = Math.floor(REPEAT_COUNT / 2) * count;
  // 记录上一次外部传入的 selected，用于判断是否需要程序化定位
  const prevSelected = useRef(selected);
  const mounted = useRef(false);

  // 程序化滚动：设标记，滚动完成后清除
  const scrollTo = useCallback((top: number, smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    programmatic.current = true;
    el.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    // smooth 滚动结束时间不可控，用较长的超时兜底
    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      programmatic.current = false;
    }, smooth ? 300 : 50);
  }, []);

  // 根据值计算滚动位置
  const getTopForValue = useCallback((val: number) => {
    const idx = items.indexOf(val);
    if (idx < 0) return 0;
    return (midBase + idx) * ITEM_HEIGHT - CENTER_OFFSET;
  }, [items, midBase]);

  // 首次挂载：立即定位（不触发 onSelect）
  useEffect(() => {
    mounted.current = true;
    scrollTo(getTopForValue(selected), false);
  }, []); // 只在挂载时执行一次

  // 外部 selected 变化（如点击"此刻"）：平滑滚动到新位置，不触发 onSelect
  useEffect(() => {
    if (!mounted.current) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      scrollTo(getTopForValue(selected), true);
    }
  }, [selected, scrollTo, getTopForValue]);

  // 用户滚动停止后：吸附 + 选中
  const handleScroll = useCallback(() => {
    // 程序化滚动产生的 scroll 事件，忽略
    if (programmatic.current) return;

    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      const el = listRef.current;
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

  // 点击选中
  const handleClick = useCallback(
    (val: number) => {
      prevSelected.current = val;
      onSelect(val);
      scrollTo(getTopForValue(val), true);
    },
    [onSelect, scrollTo, getTopForValue],
  );

  const totalHeight = count * REPEAT_COUNT * ITEM_HEIGHT;
  // 只渲染中间 20 组
  const renderCount = count * 20;
  const renderBase = midBase - count * 10;

  return (
    <div
      className="aero-time-picker-column"
      ref={listRef}
      onScroll={handleScroll}
      style={{ height: VISIBLE_COUNT * ITEM_HEIGHT }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {Array.from({ length: renderCount }, (_, i) => {
          const globalIdx = renderBase + i;
          const itemIdx = ((globalIdx % count) + count) % count;
          const val = items[itemIdx];
          return (
            <div
              key={i}
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
            </div>
          );
        })}
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

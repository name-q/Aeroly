import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

export interface DatePickerProps {
  /** 当前值（受控） */
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
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 显示格式，仅影响输入框显示 */
  format?: string;
  /** 禁用特定日期 */
  disabledDate?: (date: Date) => boolean;
  /** 是否显示时间选择 */
  showTime?: boolean | { showSecond?: boolean };
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 日期工具函数 ----

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

interface CalendarDay {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

function getCalendarDays(
  year: number,
  month: number,
  selectedYear: number,
  selectedMonth: number,
  selectedDay: number,
  disabledDate?: (date: Date) => boolean,
): CalendarDay[] {
  const today = new Date();
  const todayY = today.getFullYear();
  const todayM = today.getMonth();
  const todayD = today.getDate();

  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const days: CalendarDay[] = [];

  // 上月补齐
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const date = new Date(prevYear, prevMonth, d);
    days.push({
      year: prevYear,
      month: prevMonth,
      day: d,
      isCurrentMonth: false,
      isToday: prevYear === todayY && prevMonth === todayM && d === todayD,
      isSelected: prevYear === selectedYear && prevMonth === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  // 当月
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    days.push({
      year,
      month,
      day: d,
      isCurrentMonth: true,
      isToday: year === todayY && month === todayM && d === todayD,
      isSelected: year === selectedYear && month === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  // 下月补齐到 42 格
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(nextYear, nextMonth, d);
    days.push({
      year: nextYear,
      month: nextMonth,
      day: d,
      isCurrentMonth: false,
      isToday: nextYear === todayY && nextMonth === todayM && d === todayD,
      isSelected: nextYear === selectedYear && nextMonth === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  return days;
}

function parseDateTime(val: string): [number, number, number, number, number, number] {
  const [datePart, timePart] = val.split(' ');
  const dp = (datePart || '').split('-').map(Number);
  const tp = (timePart || '').split(':').map(Number);
  return [dp[0] || 0, (dp[1] || 1) - 1, dp[2] || 1, tp[0] || 0, tp[1] || 0, tp[2] || 0];
}

function formatDisplay(
  year: number, month: number, day: number,
  hour: number, minute: number, second: number,
  fmt: string,
): string {
  return fmt
    .replace('YYYY', String(year))
    .replace('MM', pad(month + 1))
    .replace('DD', pad(day))
    .replace('HH', pad(hour))
    .replace('mm', pad(minute))
    .replace('ss', pad(second))
    .replace('M', String(month + 1))
    .replace('D', String(day))
    .replace('H', String(hour))
    .replace('m', String(minute))
    .replace('s', String(second));
}

function toDateString(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function toDateTimeString(
  year: number, month: number, day: number,
  hour: number, minute: number, second: number,
  withSecond: boolean,
): string {
  const date = toDateString(year, month, day);
  return withSecond
    ? `${date} ${pad(hour)}:${pad(minute)}:${pad(second)}`
    : `${date} ${pad(hour)}:${pad(minute)}`;
}

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

type ViewType = 'day' | 'month' | 'year';

// ---- 无限滚动列（复制自 TimePicker） ----

const ITEM_HEIGHT = 32;
const VISIBLE_COUNT = 7;
const REPEAT_COUNT = 100;
const CENTER_OFFSET = Math.floor(VISIBLE_COUNT / 2) * ITEM_HEIGHT;
const BUFFER = 10;

interface ColumnProps {
  items: number[];
  selected: number;
  onSelect: (val: number) => void;
}

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

  const getTopForValue = useCallback((val: number, nearCurrentScroll = false) => {
    const idx = items.indexOf(val);
    if (idx < 0) return 0;
    if (!nearCurrentScroll) {
      return (midBase + idx) * ITEM_HEIGHT - CENTER_OFFSET;
    }
    const el = listRef.current;
    const currentTop = el ? el.scrollTop : 0;
    const currentCenter = Math.round((currentTop + CENTER_OFFSET) / ITEM_HEIGHT);
    const groupIdx = Math.round((currentCenter - idx) / count);
    const nearestGlobal = groupIdx * count + idx;
    return nearestGlobal * ITEM_HEIGHT - CENTER_OFFSET;
  }, [items, midBase, count]);

  useEffect(() => {
    mountedRef.current = true;
    const top = getTopForValue(selected);
    setScrollTop(top);
    scrollTo(top, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mountedRef.current) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      scrollTo(getTopForValue(selected, true), true);
    }
  }, [selected, scrollTo, getTopForValue]);

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

      const snapTop = rawIdx * ITEM_HEIGHT - CENTER_OFFSET;
      scrollTo(snapTop, true);

      if (val !== prevSelected.current) {
        prevSelected.current = val;
        onSelect(val);
      }
    }, 100);
  }, [count, items, onSelect, scrollTo]);

  const handleClick = useCallback(
    (val: number) => {
      prevSelected.current = val;
      onSelect(val);
      scrollTo(getTopForValue(val, true), true);
    },
    [onSelect, scrollTo, getTopForValue],
  );

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
        className={`aero-date-picker-time-cell${val === selected ? ' aero-date-picker-time-cell--active' : ''}`}
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
      className="aero-date-picker-time-column"
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

// ---- DayView ----

interface DayViewProps {
  viewYear: number;
  viewMonth: number;
  selectedYear: number;
  selectedMonth: number;
  selectedDay: number;
  disabledDate?: (date: Date) => boolean;
  onSelect: (year: number, month: number, day: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onTitleClick: () => void;
  onToday: () => void;
  showTime?: boolean;
  showSecond?: boolean;
  hour: number;
  minute: number;
  second: number;
  onHourChange: (v: number) => void;
  onMinuteChange: (v: number) => void;
  onSecondChange: (v: number) => void;
  onNow: () => void;
  onConfirm: () => void;
}

const hours24 = Array.from({ length: 24 }, (_, i) => i);
const minutes60 = Array.from({ length: 60 }, (_, i) => i);
const seconds60 = Array.from({ length: 60 }, (_, i) => i);

const DayView: React.FC<DayViewProps> = ({
  viewYear,
  viewMonth,
  selectedYear,
  selectedMonth,
  selectedDay,
  disabledDate,
  onSelect,
  onPrevMonth,
  onNextMonth,
  onTitleClick,
  onToday,
  showTime,
  showSecond,
  hour,
  minute,
  second,
  onHourChange,
  onMinuteChange,
  onSecondChange,
  onNow,
  onConfirm,
}) => {
  const days = useMemo(
    () => getCalendarDays(viewYear, viewMonth, selectedYear, selectedMonth, selectedDay, disabledDate),
    [viewYear, viewMonth, selectedYear, selectedMonth, selectedDay, disabledDate],
  );

  return (
    <>
      <div className="aero-date-picker-header">
        <button type="button" className="aero-date-picker-nav" onClick={onPrevMonth}>
          <Icon icon={ChevronLeft} size={14} />
        </button>
        <button type="button" className="aero-date-picker-title" onClick={onTitleClick}>
          {viewYear}年 {viewMonth + 1}月
        </button>
        <button type="button" className="aero-date-picker-nav" onClick={onNextMonth}>
          <Icon icon={ChevronRight} size={14} />
        </button>
      </div>
      <div className="aero-date-picker-weekdays">
        {WEEKDAYS.map((w) => (
          <span key={w} className="aero-date-picker-weekday">{w}</span>
        ))}
      </div>
      <div className="aero-date-picker-body">
        {days.map((d, i) => {
          const cls = [
            'aero-date-picker-cell',
            d.isCurrentMonth ? '' : 'aero-date-picker-cell--outside',
            d.isToday ? 'aero-date-picker-cell--today' : '',
            d.isSelected ? 'aero-date-picker-cell--active' : '',
            d.isDisabled ? 'aero-date-picker-cell--disabled' : '',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <span
              key={i}
              className={cls}
              onClick={d.isDisabled ? undefined : () => onSelect(d.year, d.month, d.day)}
            >
              {d.day}
            </span>
          );
        })}
      </div>

      {showTime ? (
        <>
          <div className="aero-date-picker-time">
            <div className="aero-date-picker-time-panel">
              <Column items={hours24} selected={hour} onSelect={onHourChange} />
              <Column items={minutes60} selected={minute} onSelect={onMinuteChange} />
              {showSecond && (
                <Column items={seconds60} selected={second} onSelect={onSecondChange} />
              )}
              <div className="aero-date-picker-time-indicator" />
            </div>
          </div>
          <div className="aero-date-picker-footer aero-date-picker-footer--showtime">
            <button type="button" className="aero-date-picker-now" onClick={onNow}>
              此刻
            </button>
            <button type="button" className="aero-date-picker-ok" onClick={onConfirm}>
              确定
            </button>
          </div>
        </>
      ) : (
        <div className="aero-date-picker-footer">
          <button type="button" className="aero-date-picker-today" onClick={onToday}>
            今天
          </button>
        </div>
      )}
    </>
  );
};

// ---- MonthView ----

interface MonthViewProps {
  viewYear: number;
  onSelect: (month: number) => void;
  onPrevYear: () => void;
  onNextYear: () => void;
  onTitleClick: () => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  viewYear,
  onSelect,
  onPrevYear,
  onNextYear,
  onTitleClick,
}) => (
  <>
    <div className="aero-date-picker-header">
      <button type="button" className="aero-date-picker-nav" onClick={onPrevYear}>
        <Icon icon={ChevronLeft} size={14} />
      </button>
      <button type="button" className="aero-date-picker-title" onClick={onTitleClick}>
        {viewYear}年
      </button>
      <button type="button" className="aero-date-picker-nav" onClick={onNextYear}>
        <Icon icon={ChevronRight} size={14} />
      </button>
    </div>
    <div className="aero-date-picker-grid">
      {MONTHS.map((label, i) => (
        <span
          key={i}
          className="aero-date-picker-grid-cell"
          onClick={() => onSelect(i)}
        >
          {label}
        </span>
      ))}
    </div>
  </>
);

// ---- YearView ----

interface YearViewProps {
  viewYear: number;
  onSelect: (year: number) => void;
  onPrevDecade: () => void;
  onNextDecade: () => void;
}

const YearView: React.FC<YearViewProps> = ({
  viewYear,
  onSelect,
  onPrevDecade,
  onNextDecade,
}) => {
  const startYear = Math.floor(viewYear / 10) * 10 - 1;
  const years: number[] = [];
  for (let i = 0; i < 12; i++) years.push(startYear + i);

  return (
    <>
      <div className="aero-date-picker-header">
        <button type="button" className="aero-date-picker-nav" onClick={onPrevDecade}>
          <Icon icon={ChevronLeft} size={14} />
        </button>
        <span className="aero-date-picker-title aero-date-picker-title--static">
          {startYear + 1} – {startYear + 10}
        </span>
        <button type="button" className="aero-date-picker-nav" onClick={onNextDecade}>
          <Icon icon={ChevronRight} size={14} />
        </button>
      </div>
      <div className="aero-date-picker-grid">
        {years.map((y, i) => {
          const isOutside = i === 0 || i === 11;
          return (
            <span
              key={y}
              className={`aero-date-picker-grid-cell${isOutside ? ' aero-date-picker-grid-cell--outside' : ''}`}
              onClick={() => onSelect(y)}
            >
              {y}
            </span>
          );
        })}
      </div>
    </>
  );
};

// ---- DatePicker ----

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder = '请选择日期',
  disabled = false,
  allowClear = true,
  size = 'medium',
  format: formatProp,
  disabledDate,
  showTime,
  className,
  style,
}) => {
  const hasTime = !!showTime;
  const withSecond = hasTime && (showTime === true || (showTime as { showSecond?: boolean }).showSecond !== false);

  const defaultFormat = hasTime
    ? (withSecond ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm')
    : 'YYYY-MM-DD';
  const format = formatProp || defaultFormat;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const currentValue = isControlled ? value! : internalValue;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [view, setView] = useState<ViewType>('day');
  const wrapRef = useRef<HTMLDivElement>(null);

  // 解析选中值（含时间部分）
  const [selY, selM, selD, selH, selMi, selS] = currentValue ? parseDateTime(currentValue) : [0, -1, 0, 0, 0, 0];

  // showTime 模式下暂存的日期+时间
  const [tempYear, setTempYear] = useState(0);
  const [tempMonth, setTempMonth] = useState(0);
  const [tempDay, setTempDay] = useState(0);
  const [tempHour, setTempHour] = useState(0);
  const [tempMinute, setTempMinute] = useState(0);
  const [tempSecond, setTempSecond] = useState(0);

  // viewDate：面板当前显示的年月
  const [viewYear, setViewYear] = useState(() => selY || new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (selM >= 0 ? selM : new Date().getMonth()));

  // 打开时同步 viewDate 到选中值，并初始化 temp 时间
  useEffect(() => {
    if (open) {
      if (currentValue) {
        const [y, m, d, h, mi, s] = parseDateTime(currentValue);
        setViewYear(y);
        setViewMonth(m);
        setTempYear(y);
        setTempMonth(m);
        setTempDay(d);
        setTempHour(h);
        setTempMinute(mi);
        setTempSecond(s);
      } else {
        const now = new Date();
        setViewYear(now.getFullYear());
        setViewMonth(now.getMonth());
        setTempYear(0);
        setTempMonth(0);
        setTempDay(0);
        setTempHour(now.getHours());
        setTempMinute(now.getMinutes());
        setTempSecond(now.getSeconds());
      }
      setView('day');
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const selectDate = useCallback(
    (year: number, month: number, day: number) => {
      if (hasTime) {
        // showTime 模式：只更新日期部分，不关闭面板
        setTempYear(year);
        setTempMonth(month);
        setTempDay(day);
      } else {
        const next = toDateString(year, month, day);
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
        setOpen(false);
      }
    },
    [isControlled, onChange, hasTime],
  );

  const handleConfirm = useCallback(() => {
    const next = toDateTimeString(tempYear, tempMonth, tempDay, tempHour, tempMinute, tempSecond, withSecond);
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  }, [tempYear, tempMonth, tempDay, tempHour, tempMinute, tempSecond, withSecond, isControlled, onChange]);

  const handleNow = useCallback(() => {
    const now = new Date();
    if (disabledDate && disabledDate(now)) return;
    setTempYear(now.getFullYear());
    setTempMonth(now.getMonth());
    setTempDay(now.getDate());
    setTempHour(now.getHours());
    setTempMinute(now.getMinutes());
    setTempSecond(now.getSeconds());
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  }, [disabledDate]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue('');
    onChange?.('');
    setOpen(false);
  };

  const handleToday = useCallback(() => {
    const now = new Date();
    if (disabledDate && disabledDate(now)) return;
    selectDate(now.getFullYear(), now.getMonth(), now.getDate());
  }, [selectDate, disabledDate]);

  // 显示文本
  const displayText = currentValue
    ? formatDisplay(selY, selM, selD, selH, selMi, selS, format)
    : '';

  const rootClassNames = [
    'aero-date-picker',
    `aero-date-picker--${size}`,
    open ? 'aero-date-picker--open' : '',
    disabled ? 'aero-date-picker--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassNames} style={style} ref={wrapRef}>
      <div
        className="aero-date-picker-input"
        onClick={() => !disabled && setOpen(!open)}
      >
        <Icon icon={Calendar} size={14} className="aero-date-picker-icon" />
        <span className={`aero-date-picker-value${!currentValue ? ' aero-date-picker-value--placeholder' : ''}`}>
          {displayText || placeholder}
        </span>
        {allowClear && currentValue && !disabled && (
          <span className="aero-date-picker-clear" onClick={handleClear}>
            <Icon icon={X} size={12} />
          </span>
        )}
      </div>

      {mounted && (
        <div
          className={`aero-date-picker-dropdown${animating ? ' aero-date-picker-dropdown--open' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {view === 'day' && (
            <DayView
              viewYear={viewYear}
              viewMonth={viewMonth}
              selectedYear={hasTime ? tempYear : selY}
              selectedMonth={hasTime ? tempMonth : selM}
              selectedDay={hasTime ? tempDay : selD}
              disabledDate={disabledDate}
              onSelect={selectDate}
              onPrevMonth={() => {
                if (viewMonth === 0) {
                  setViewYear((y) => y - 1);
                  setViewMonth(11);
                } else {
                  setViewMonth((m) => m - 1);
                }
              }}
              onNextMonth={() => {
                if (viewMonth === 11) {
                  setViewYear((y) => y + 1);
                  setViewMonth(0);
                } else {
                  setViewMonth((m) => m + 1);
                }
              }}
              onTitleClick={() => setView('month')}
              onToday={handleToday}
              showTime={hasTime}
              showSecond={withSecond}
              hour={tempHour}
              minute={tempMinute}
              second={tempSecond}
              onHourChange={setTempHour}
              onMinuteChange={setTempMinute}
              onSecondChange={setTempSecond}
              onNow={handleNow}
              onConfirm={handleConfirm}
            />
          )}

          {view === 'month' && (
            <MonthView
              viewYear={viewYear}
              onSelect={(m) => {
                setViewMonth(m);
                setView('day');
              }}
              onPrevYear={() => setViewYear((y) => y - 1)}
              onNextYear={() => setViewYear((y) => y + 1)}
              onTitleClick={() => setView('year')}
            />
          )}

          {view === 'year' && (
            <YearView
              viewYear={viewYear}
              onSelect={(y) => {
                setViewYear(y);
                setView('month');
              }}
              onPrevDecade={() => setViewYear((y) => y - 10)}
              onNextDecade={() => setViewYear((y) => y + 10)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import {
  pad, getCalendarDays, parseDateTime, formatDisplay,
  toDateString, toDateTimeString, WEEKDAYS, MONTHS,
  hours24, minutes60, seconds60,
} from './utils';
import Column, { ITEM_HEIGHT, VISIBLE_COUNT } from './Column';
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

type ViewType = 'day' | 'month' | 'year';

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
      <div className={`aero-date-picker-content${showTime ? ' aero-date-picker-content--with-time' : ''}`}>
        <div className="aero-date-picker-calendar">
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
        </div>

        {showTime && (
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
        )}
      </div>

      {showTime ? (
        <div className="aero-date-picker-footer aero-date-picker-footer--showtime">
          <button type="button" className="aero-date-picker-now" onClick={onNow}>
            此刻
          </button>
          <button type="button" className="aero-date-picker-ok" onClick={onConfirm}>
            确定
          </button>
        </div>
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
    let y = tempYear, m = tempMonth, d = tempDay;
    if (!y) {
      const now = new Date();
      y = now.getFullYear();
      m = now.getMonth();
      d = now.getDate();
    }
    const next = toDateTimeString(y, m, d, tempHour, tempMinute, tempSecond, withSecond);
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

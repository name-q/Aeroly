import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import {
  getCalendarDays, parseDateTime, formatDisplay,
  toDateString, toDateTimeString,
  hours24, minutes60, seconds60, CalendarDay,
} from '../DatePicker/utils';
import Column from '../DatePicker/Column';
import { useDropdownPosition } from '../utils';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

export interface DateRangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  onChange?: (value: [string, string]) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  allowClear?: boolean;
  size?: 'small' | 'medium' | 'large';
  format?: string;
  disabledDate?: (date: Date) => boolean;
  showTime?: boolean | { showSecond?: boolean };
  /** 状态 */
  status?: 'error' | 'warning';
  className?: string;
  style?: React.CSSProperties;
}

type Selecting = 'idle' | 'start-picked';

interface RangeCalendarDay extends CalendarDay {
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
}

function getRangeCalendarDays(
  year: number,
  month: number,
  startDate: string,
  endDate: string,
  hoverDate: string,
  selecting: Selecting,
  disabledDate?: (date: Date) => boolean,
): RangeCalendarDay[] {
  const days = getCalendarDays(year, month, 0, -1, 0, disabledDate);

  const effectiveEnd = selecting === 'start-picked' && hoverDate ? hoverDate : endDate;
  let rangeStart = startDate;
  let rangeEnd = effectiveEnd;

  if (rangeStart && rangeEnd && rangeStart > rangeEnd) {
    [rangeStart, rangeEnd] = [rangeEnd, rangeStart];
  }

  return days.map((d) => {
    const ds = d.dateStr;
    const isRangeStart = ds === rangeStart;
    const isRangeEnd = ds === rangeEnd;
    const isInRange = !!(rangeStart && rangeEnd && ds > rangeStart && ds < rangeEnd);

    return {
      ...d,
      isSelected: isRangeStart || isRangeEnd,
      isRangeStart,
      isRangeEnd,
      isInRange,
    };
  });
}

const PREFIX = 'aero-date-range-picker';

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  allowClear = true,
  size = 'medium',
  format: formatProp,
  disabledDate,
  showTime,
  status,
  className,
  style,
}) => {
  const localeDP = useLocale('DatePicker');
  const localeDRP = useLocale('DateRangePicker');
  const finalPlaceholder: [string, string] = placeholder ?? [localeDRP.startPlaceholder, localeDRP.endPlaceholder];
  const hasTime = !!showTime;
  const withSecond = hasTime && (showTime === true || (showTime as { showSecond?: boolean }).showSecond !== false);
  const defaultFormat = hasTime
    ? (withSecond ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD HH:mm')
    : 'YYYY-MM-DD';
  const format = formatProp || defaultFormat;

  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<[string, string]>(defaultValue || ['', '']);
  const currentValue = isControlled ? value! : internalValue;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { placement, alignment } = useDropdownPosition(wrapRef, dropdownRef, mounted);

  // 左面板年月
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth());

  // 范围选择状态
  const [selecting, setSelecting] = useState<Selecting>('idle');
  const [tempStart, setTempStart] = useState('');
  const [tempEnd, setTempEnd] = useState('');
  const [hoverDate, setHoverDate] = useState('');

  // 时间部分
  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMinute, setEndMinute] = useState(0);
  const [endSecond, setEndSecond] = useState(0);

  // 右面板 = 左面板 + 1 月
  const rightYear = viewMonth === 11 ? viewYear + 1 : viewYear;
  const rightMonth = viewMonth === 11 ? 0 : viewMonth + 1;

  // 打开时初始化
  useEffect(() => {
    if (open) {
      const [s, e] = currentValue;
      if (s) {
        const [y, m, , h, mi, sec] = parseDateTime(s);
        setViewYear(y);
        setViewMonth(m);
        setTempStart(s.split(' ')[0]);
        setStartHour(h);
        setStartMinute(mi);
        setStartSecond(sec);
      } else {
        const now = new Date();
        setViewYear(now.getFullYear());
        setViewMonth(now.getMonth());
        setTempStart('');
        setStartHour(0);
        setStartMinute(0);
        setStartSecond(0);
      }
      if (e) {
        const [, , , h, mi, sec] = parseDateTime(e);
        setTempEnd(e.split(' ')[0]);
        setEndHour(h);
        setEndMinute(mi);
        setEndSecond(sec);
      } else {
        setTempEnd('');
        setEndHour(0);
        setEndMinute(0);
        setEndSecond(0);
      }
      setSelecting('idle');
      setHoverDate('');
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // 动画
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

  const commitValue = useCallback((start: string, end: string) => {
    const val: [string, string] = [start, end];
    if (!isControlled) setInternalValue(val);
    onChange?.(val);
  }, [isControlled, onChange]);

  const selectDate = useCallback((year: number, month: number, day: number) => {
    const dateStr = toDateString(year, month, day);

    if (selecting === 'idle') {
      setTempStart(dateStr);
      setTempEnd('');
      setSelecting('start-picked');
    } else {
      // 第二次点击
      let s = tempStart;
      let e = dateStr;
      if (s > e) [s, e] = [e, s];
      setTempStart(s);
      setTempEnd(e);
      setSelecting('idle');
      setHoverDate('');

      if (!hasTime) {
        commitValue(s, e);
        setOpen(false);
      }
    }
  }, [selecting, tempStart, hasTime, commitValue]);

  const handleConfirm = useCallback(() => {
    const todayStr = (() => {
      const now = new Date();
      return toDateString(now.getFullYear(), now.getMonth(), now.getDate());
    })();
    const start = tempStart || todayStr;
    const end = tempEnd || start;
    let s: string, e: string;
    if (hasTime) {
      const [sy, sm, sd] = parseDateTime(start);
      const [ey, em, ed] = parseDateTime(end);
      s = toDateTimeString(sy, sm, sd, startHour, startMinute, startSecond, withSecond);
      e = toDateTimeString(ey, em, ed, endHour, endMinute, endSecond, withSecond);
    } else {
      s = start;
      e = end;
    }
    commitValue(s, e);
    setOpen(false);
  }, [tempStart, tempEnd, hasTime, withSecond, startHour, startMinute, startSecond, endHour, endMinute, endSecond, commitValue]);

  const handleNow = useCallback(() => {
    const now = new Date();
    if (disabledDate && disabledDate(now)) return;
    const dateStr = toDateString(now.getFullYear(), now.getMonth(), now.getDate());
    setTempStart(dateStr);
    setTempEnd(dateStr);
    setStartHour(now.getHours());
    setStartMinute(now.getMinutes());
    setStartSecond(now.getSeconds());
    setEndHour(now.getHours());
    setEndMinute(now.getMinutes());
    setEndSecond(now.getSeconds());
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
    setSelecting('idle');
  }, [disabledDate]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue(['', '']);
    onChange?.(['', '']);
    setOpen(false);
  };

  const handleMouseEnter = useCallback((dateStr: string) => {
    if (selecting === 'start-picked') {
      setHoverDate(dateStr);
    }
  }, [selecting]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // 左面板日历
  const leftDays = useMemo(
    () => getRangeCalendarDays(viewYear, viewMonth, tempStart, tempEnd, hoverDate, selecting, disabledDate),
    [viewYear, viewMonth, tempStart, tempEnd, hoverDate, selecting, disabledDate],
  );

  // 右面板日历
  const rightDays = useMemo(
    () => getRangeCalendarDays(rightYear, rightMonth, tempStart, tempEnd, hoverDate, selecting, disabledDate),
    [rightYear, rightMonth, tempStart, tempEnd, hoverDate, selecting, disabledDate],
  );

  // 显示文本
  const formatValue = (val: string) => {
    if (!val) return '';
    const [y, m, d, h, mi, s] = parseDateTime(val);
    return formatDisplay(y, m, d, h, mi, s, format);
  };

  const startText = formatValue(currentValue[0]);
  const endText = formatValue(currentValue[1]);

  const rootCls = [
    PREFIX,
    `${PREFIX}--${size}`,
    open ? `${PREFIX}--open` : '',
    disabled ? `${PREFIX}--disabled` : '',
    status ? `${PREFIX}--${status}` : '',
    className || '',
  ].filter(Boolean).join(' ');

  const renderCalendarPanel = (
    days: RangeCalendarDay[],
    panelYear: number,
    panelMonth: number,
    side: 'left' | 'right',
  ) => (
    <div className={`${PREFIX}-panel`}>
      <div className={`${PREFIX}-content${hasTime ? ` ${PREFIX}-content--with-time` : ''}`}>
        <div className={`${PREFIX}-calendar`}>
          <div className={`${PREFIX}-header`}>
            {side === 'left' ? (
              <button type="button" className={`${PREFIX}-nav`} onClick={prevMonth}>
                <Icon icon={ChevronLeft} size={14} />
              </button>
            ) : <span className={`${PREFIX}-nav-placeholder`} />}
            <span className={`${PREFIX}-title`}>
              {localeDP.yearFormat.replace('{year}', String(panelYear))} {localeDP.monthFormat.replace('{month}', String(panelMonth + 1))}
            </span>
            {side === 'right' ? (
              <button type="button" className={`${PREFIX}-nav`} onClick={nextMonth}>
                <Icon icon={ChevronRight} size={14} />
              </button>
            ) : <span className={`${PREFIX}-nav-placeholder`} />}
          </div>
          <div className={`${PREFIX}-weekdays`}>
            {localeDP.weekdays.map((w) => (
              <span key={w} className={`${PREFIX}-weekday`}>{w}</span>
            ))}
          </div>
          <div className={`${PREFIX}-body`}>
            {days.map((d, i) => {
              const sameStartEnd = d.isRangeStart && d.isRangeEnd;
              const cls = [
                `${PREFIX}-cell`,
                d.isCurrentMonth ? '' : `${PREFIX}-cell--outside`,
                d.isToday ? `${PREFIX}-cell--today` : '',
                d.isRangeStart ? `${PREFIX}-cell--range-start` : '',
                d.isRangeEnd ? `${PREFIX}-cell--range-end` : '',
                d.isInRange ? `${PREFIX}-cell--in-range` : '',
                (d.isRangeStart || d.isRangeEnd) ? `${PREFIX}-cell--active` : '',
                sameStartEnd ? `${PREFIX}-cell--same` : '',
                d.isDisabled ? `${PREFIX}-cell--disabled` : '',
              ].filter(Boolean).join(' ');

              return (
                <span
                  key={i}
                  className={cls}
                  onClick={d.isDisabled ? undefined : () => selectDate(d.year, d.month, d.day)}
                  onMouseEnter={() => handleMouseEnter(d.dateStr)}
                >
                  {d.day}
                </span>
              );
            })}
          </div>
        </div>

        {hasTime && (
          <div className={`${PREFIX}-time`}>
            <div className={`${PREFIX}-time-panel`}>
              <Column
                items={hours24}
                selected={side === 'left' ? startHour : endHour}
                onSelect={side === 'left' ? setStartHour : setEndHour}
                classPrefix={PREFIX}
              />
              <Column
                items={minutes60}
                selected={side === 'left' ? startMinute : endMinute}
                onSelect={side === 'left' ? setStartMinute : setEndMinute}
                classPrefix={PREFIX}
              />
              {withSecond && (
                <Column
                  items={seconds60}
                  selected={side === 'left' ? startSecond : endSecond}
                  onSelect={side === 'left' ? setStartSecond : setEndSecond}
                  classPrefix={PREFIX}
                />
              )}
              <div className={`${PREFIX}-time-indicator`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={rootCls} style={style} ref={wrapRef}>
      <div
        className={`${PREFIX}-input`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <Icon icon={Calendar} size={14} className={`${PREFIX}-icon`} />
        <span className={`${PREFIX}-start${!startText ? ` ${PREFIX}-start--placeholder` : ''}`}>
          {startText || finalPlaceholder[0]}
        </span>
        <span className={`${PREFIX}-separator`}>~</span>
        <span className={`${PREFIX}-end${!endText ? ` ${PREFIX}-end--placeholder` : ''}`}>
          {endText || finalPlaceholder[1]}
        </span>
        {allowClear && (currentValue[0] || currentValue[1]) && !disabled && (
          <span className={`${PREFIX}-clear`} onClick={handleClear}>
            <Icon icon={X} size={12} />
          </span>
        )}
      </div>

      {mounted && (
        <div
          ref={dropdownRef}
          className={`${PREFIX}-dropdown ${PREFIX}-dropdown--${placement} ${PREFIX}-dropdown--${alignment}${animating ? ` ${PREFIX}-dropdown--open` : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className={`${PREFIX}-panels`}>
            {renderCalendarPanel(leftDays, viewYear, viewMonth, 'left')}
            <div className={`${PREFIX}-divider`} />
            {renderCalendarPanel(rightDays, rightYear, rightMonth, 'right')}
          </div>

          {hasTime ? (
            <div className={`${PREFIX}-footer ${PREFIX}-footer--showtime`}>
              <button type="button" className={`${PREFIX}-now`} onClick={handleNow}>
                {localeDRP.now}
              </button>
              <button type="button" className={`${PREFIX}-ok`} onClick={handleConfirm}>
                {localeDRP.confirm}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;

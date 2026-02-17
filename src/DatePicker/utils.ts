export function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export interface CalendarDay {
  year: number;
  month: number;
  day: number;
  dateStr: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

export function getCalendarDays(
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

  // Fill previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const date = new Date(prevYear, prevMonth, d);
    days.push({
      year: prevYear,
      month: prevMonth,
      day: d,
      dateStr: toDateString(prevYear, prevMonth, d),
      isCurrentMonth: false,
      isToday: prevYear === todayY && prevMonth === todayM && d === todayD,
      isSelected: prevYear === selectedYear && prevMonth === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    days.push({
      year,
      month,
      day: d,
      dateStr: toDateString(year, month, d),
      isCurrentMonth: true,
      isToday: year === todayY && month === todayM && d === todayD,
      isSelected: year === selectedYear && month === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  // Fill next month to 42 cells
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    const date = new Date(nextYear, nextMonth, d);
    days.push({
      year: nextYear,
      month: nextMonth,
      day: d,
      dateStr: toDateString(nextYear, nextMonth, d),
      isCurrentMonth: false,
      isToday: nextYear === todayY && nextMonth === todayM && d === todayD,
      isSelected: nextYear === selectedYear && nextMonth === selectedMonth && d === selectedDay,
      isDisabled: disabledDate ? disabledDate(date) : false,
    });
  }

  return days;
}

export function parseDateTime(val: string): [number, number, number, number, number, number] {
  const [datePart, timePart] = val.split(' ');
  const dp = (datePart || '').split('-').map(Number);
  const tp = (timePart || '').split(':').map(Number);
  return [dp[0] || 0, (dp[1] || 1) - 1, dp[2] || 1, tp[0] || 0, tp[1] || 0, tp[2] || 0];
}

export function formatDisplay(
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

export function toDateString(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

export function toDateTimeString(
  year: number, month: number, day: number,
  hour: number, minute: number, second: number,
  withSecond: boolean,
): string {
  const date = toDateString(year, month, day);
  return withSecond
    ? `${date} ${pad(hour)}:${pad(minute)}:${pad(second)}`
    : `${date} ${pad(hour)}:${pad(minute)}`;
}

export const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
export const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export const hours24 = Array.from({ length: 24 }, (_, i) => i);
export const minutes60 = Array.from({ length: 60 }, (_, i) => i);
export const seconds60 = Array.from({ length: 60 }, (_, i) => i);

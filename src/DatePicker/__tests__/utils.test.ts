import { describe, it, expect } from 'vitest';
import {
  pad, getDaysInMonth, getFirstDayOfMonth,
  getCalendarDays, parseDateTime, formatDisplay,
  toDateString, toDateTimeString,
} from '../utils';

describe('DatePicker utils', () => {
  it('pad pads single digit', () => {
    expect(pad(5)).toBe('05');
    expect(pad(12)).toBe('12');
  });

  it('getDaysInMonth returns correct days', () => {
    expect(getDaysInMonth(2024, 1)).toBe(29); // Feb 2024 leap year
    expect(getDaysInMonth(2023, 1)).toBe(28); // Feb 2023
    expect(getDaysInMonth(2024, 0)).toBe(31); // Jan
    expect(getDaysInMonth(2024, 3)).toBe(30); // Apr
  });

  it('getFirstDayOfMonth returns day of week', () => {
    // 2024-01-01 is Monday
    expect(getFirstDayOfMonth(2024, 0)).toBe(1);
  });

  it('getCalendarDays returns 42 cells', () => {
    const days = getCalendarDays(2024, 5, 2024, 5, 15);
    expect(days.length).toBe(42);
  });

  it('getCalendarDays marks selected day', () => {
    const days = getCalendarDays(2024, 5, 2024, 5, 15);
    const selected = days.find((d) => d.isSelected);
    expect(selected?.day).toBe(15);
    expect(selected?.isCurrentMonth).toBe(true);
  });

  it('getCalendarDays marks disabled dates', () => {
    const disabledDate = (date: Date) => date.getDate() === 1;
    const days = getCalendarDays(2024, 5, 2024, 5, 15, disabledDate);
    const disabled = days.filter((d) => d.isDisabled && d.isCurrentMonth);
    expect(disabled.length).toBeGreaterThanOrEqual(1);
    expect(disabled[0].day).toBe(1);
  });

  it('parseDateTime parses date string', () => {
    expect(parseDateTime('2024-06-15')).toEqual([2024, 5, 15, 0, 0, 0]);
  });

  it('parseDateTime parses datetime string', () => {
    expect(parseDateTime('2024-06-15 14:30:45')).toEqual([2024, 5, 15, 14, 30, 45]);
  });

  it('formatDisplay formats correctly', () => {
    expect(formatDisplay(2024, 5, 15, 14, 30, 45, 'YYYY-MM-DD')).toBe('2024-06-15');
    expect(formatDisplay(2024, 5, 15, 14, 30, 45, 'YYYY-MM-DD HH:mm:ss')).toBe('2024-06-15 14:30:45');
  });

  it('toDateString formats date', () => {
    expect(toDateString(2024, 5, 15)).toBe('2024-06-15');
    expect(toDateString(2024, 0, 1)).toBe('2024-01-01');
  });

  it('toDateTimeString formats datetime', () => {
    expect(toDateTimeString(2024, 5, 15, 14, 30, 45, true)).toBe('2024-06-15 14:30:45');
    expect(toDateTimeString(2024, 5, 15, 14, 30, 0, false)).toBe('2024-06-15 14:30');
  });
});

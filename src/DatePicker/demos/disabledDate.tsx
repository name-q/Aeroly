/**
 * title: " "
 * description: 通过 `disabledDate` 禁用特定日期，例如禁用今天之前的日期或周末。
 */
import React from 'react';
import { DatePicker } from 'aeroly';

export default () => {
  const disablePast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const disableWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
      <DatePicker placeholder="禁用过去日期" disabledDate={disablePast} />
      <DatePicker placeholder="禁用周末" disabledDate={disableWeekend} />
    </div>
  );
};

/**
 * title: " "
 * description: Disable specific dates via `disabledDate`, e.g. disable past dates or weekends.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aeroui';

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
    <ConfigProvider locale={enUS}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
        <DatePicker placeholder="Disable past dates" disabledDate={disablePast} />
        <DatePicker placeholder="Disable weekends" disabledDate={disableWeekend} />
      </div>
    </ConfigProvider>
  );
};

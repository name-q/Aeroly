/**
 * title: " "
 * description: Disable dates before today via `disabledDate`.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aeroui';

const disabledDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export default () => (
  <ConfigProvider locale={enUS}>
    <DateRangePicker disabledDate={disabledDate} onChange={(val) => console.log('onChange', val)} />
  </ConfigProvider>
);

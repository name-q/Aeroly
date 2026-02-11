/**
 * title: " "
 * description: 通过 `disabledDate` 禁用今天之前的日期。
 */
import React from 'react';
import { DateRangePicker } from 'aero-ui';

const disabledDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export default () => (
  <DateRangePicker disabledDate={disabledDate} onChange={(val) => console.log('onChange', val)} />
);

/**
 * title: " "
 * description: With `showTime` enabled, you can select both date and time range. Click "OK" to confirm.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <DateRangePicker showTime onChange={(val) => console.log('onChange', val)} />
  </ConfigProvider>
);

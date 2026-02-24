/**
 * title: " "
 * description: Basic date range selection. Click two dates to select a range.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DateRangePicker onChange={(val) => console.log('onChange', val)} />
  </ConfigProvider>
);

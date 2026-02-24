/**
 * title: " "
 * description: Disabled state.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DateRangePicker disabled defaultValue={['2025-03-01', '2025-03-15']} />
  </ConfigProvider>
);

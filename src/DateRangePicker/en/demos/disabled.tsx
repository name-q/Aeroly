/**
 * title: " "
 * description: Disabled state.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DateRangePicker disabled defaultValue={['2025-03-01', '2025-03-15']} />
  </ConfigProvider>
);

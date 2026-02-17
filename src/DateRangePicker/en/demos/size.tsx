/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
      <DateRangePicker size="small" />
      <DateRangePicker size="medium" />
      <DateRangePicker size="large" />
    </div>
  </ConfigProvider>
);

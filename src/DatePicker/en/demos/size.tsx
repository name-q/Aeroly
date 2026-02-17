/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 720 }}>
      <DatePicker size="small" defaultValue="2025-03-01" />
      <DatePicker size="medium" defaultValue="2025-06-15" />
      <DatePicker size="large" defaultValue="2025-12-25" />
    </div>
  </ConfigProvider>
);

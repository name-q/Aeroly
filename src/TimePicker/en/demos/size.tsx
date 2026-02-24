/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <TimePicker size="small" defaultValue="08:00:00" />
      <TimePicker size="medium" defaultValue="12:30:00" />
      <TimePicker size="large" defaultValue="18:45:00" />
    </div>
  </ConfigProvider>
);

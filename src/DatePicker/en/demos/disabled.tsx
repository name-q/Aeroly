/**
 * title: " "
 * description: Set `disabled` to disable the entire picker.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DatePicker defaultValue="2025-01-01" disabled />
  </ConfigProvider>
);

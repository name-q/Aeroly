/**
 * title: " "
 * description: Not interactive when disabled.
 */
import React from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <TimePicker disabled defaultValue="10:00:00" />
  </ConfigProvider>
);

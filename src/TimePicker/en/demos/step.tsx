/**
 * title: " "
 * description: Set step intervals via `hourStep`, `minuteStep`, `secondStep`, e.g. one option every 15 minutes.
 */
import React from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <TimePicker minuteStep={15} secondStep={15} placeholder="15-minute step" />
  </ConfigProvider>
);

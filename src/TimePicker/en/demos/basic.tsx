/**
 * title: " "
 * description: Click the input to open the time selection panel, supporting scrollable hour, minute, and second columns.
 */
import React from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <TimePicker onChange={(val) => console.log('Selected:', val)} />
  </ConfigProvider>
);

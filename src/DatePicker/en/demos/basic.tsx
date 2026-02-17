/**
 * title: " "
 * description: Click the input to open the date picker panel, supporting day, month, and year view switching.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DatePicker onChange={(val) => console.log('Selected:', val)} />
  </ConfigProvider>
);

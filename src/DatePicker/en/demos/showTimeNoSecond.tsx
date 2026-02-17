/**
 * title: " "
 * description: Use `showTime={{ showSecond: false }}` to hide the seconds column, showing only hours and minutes.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <DatePicker
      showTime={{ showSecond: false }}
      placeholder="Select date & time"
      onChange={(val) => console.log('Selected:', val)}
    />
  </ConfigProvider>
);

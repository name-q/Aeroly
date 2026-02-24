/**
 * title: " "
 * description: With `showTime` enabled, the panel stays open after selecting a date. A time scroller appears at the bottom. Click "OK" to close the panel.
 */
import React from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <DatePicker
      showTime
      placeholder="Select date & time"
      onChange={(val) => console.log('Selected:', val)}
    />
  </ConfigProvider>
);

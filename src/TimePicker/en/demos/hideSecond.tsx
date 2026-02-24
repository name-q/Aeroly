/**
 * title: " "
 * description: Set `showSecond={false}` to hide the seconds column, selecting only hours and minutes.
 */
import React from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <TimePicker showSecond={false} placeholder="Select hour & minute" />
  </ConfigProvider>
);

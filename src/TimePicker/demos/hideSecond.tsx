/**
 * title: " "
 * description: 设置 `showSecond={false}` 隐藏秒列，只选择时和分。
 */
import React from 'react';
import { TimePicker } from 'aeroui';

export default () => (
  <TimePicker showSecond={false} placeholder="选择时分" />
);

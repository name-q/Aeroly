/**
 * title: " "
 * description: 通过 `hourStep`、`minuteStep`、`secondStep` 设置步长，例如每 15 分钟一个选项。
 */
import React from 'react';
import { TimePicker } from 'aero-ui';

export default () => (
  <TimePicker minuteStep={15} secondStep={15} placeholder="15 分钟步长" />
);

/**
 * title: " "
 * description: 开启 `showTime` 后可同时选择日期和时间，需点击"确定"提交。
 */
import React from 'react';
import { DateRangePicker } from 'aero-ui';

export default () => (
  <DateRangePicker showTime onChange={(val) => console.log('onChange', val)} />
);

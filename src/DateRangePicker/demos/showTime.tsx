/**
 * title: " "
 * description: 开启 `showTime` 后可同时选择日期和时间，需点击"确定"提交。
 */
import React from 'react';
import { DateRangePicker } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 380 }}>
    <DateRangePicker showTime onChange={(val) => console.log('onChange', val)} />
  </div>
);

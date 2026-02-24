/**
 * title: " "
 * description: 基础日期范围选择，点选两个日期即可。
 */
import React from 'react';
import { DateRangePicker } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 380 }}>
    <DateRangePicker onChange={(val) => console.log('onChange', val)} />
  </div>
);

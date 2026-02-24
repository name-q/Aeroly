/**
 * title: " "
 * description: 通过 `showTime={{ showSecond: false }}` 隐藏秒列，只显示时、分。
 */
import React from 'react';
import { DatePicker } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 280 }}>
    <DatePicker
      showTime={{ showSecond: false }}
      placeholder="请选择日期时间"
      onChange={(val) => console.log('选择:', val)}
    />
  </div>
);

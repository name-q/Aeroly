/**
 * title: " "
 * description: 设置 `showTime` 后，选择日期后面板不关闭，底部出现时间滚动列，点击"确定"关闭面板。
 */
import React from 'react';
import { DatePicker } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 280 }}>
    <DatePicker
      showTime
      placeholder="请选择日期时间"
      onChange={(val) => console.log('选择:', val)}
    />
  </div>
);

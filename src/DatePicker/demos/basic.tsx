/**
 * title: " "
 * description: 点击输入框弹出日期选择面板，支持日、月、年三级视图切换。
 */
import React from 'react';
import { DatePicker } from 'aero-ui';

export default () => (
  <div style={{ maxWidth: 280 }}>
    <DatePicker onChange={(val) => console.log('选择:', val)} />
  </div>
);

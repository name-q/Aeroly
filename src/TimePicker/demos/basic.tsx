/**
 * title: " "
 * description: 点击输入框弹出时间选择面板，支持时、分、秒滚动选择。
 */
import React from 'react';
import { TimePicker } from 'aero-ui';

export default () => (
  <TimePicker onChange={(val) => console.log('选择:', val)} />
);

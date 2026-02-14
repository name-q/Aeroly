/**
 * title: " "
 * description: 设置 `disabled` 禁用整个选择器。
 */
import React from 'react';
import { DatePicker } from 'aero-ui';

export default () => (
  <div style={{ maxWidth: 280 }}>
    <DatePicker defaultValue="2025-01-01" disabled />
  </div>
);

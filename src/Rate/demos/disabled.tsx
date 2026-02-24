/**
 * title: " "
 * description: `disabled` 完全禁用交互，`readOnly` 仅展示不可修改。
 */
import React from 'react';
import { Rate } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Rate defaultValue={3} disabled />
    <Rate defaultValue={4} readOnly />
  </div>
);

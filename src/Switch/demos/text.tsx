/**
 * title: " "
 * description: 通过 `checkedText` 和 `uncheckedText` 显示开关文案。
 */
import React from 'react';
import { Switch } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch checkedText="开" uncheckedText="关" defaultChecked />
    <Switch checkedText="ON" uncheckedText="OFF" />
  </div>
);

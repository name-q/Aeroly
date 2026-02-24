/**
 * title: " "
 * description: 禁用状态下开关不可操作。
 */
import React from 'react';
import { Switch } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch disabled />
    <Switch disabled defaultChecked />
  </div>
);

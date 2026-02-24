/**
 * title: " "
 * description: 基础开关，支持开启和关闭。
 */
import React from 'react';
import { Switch } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch />
    <Switch defaultChecked />
  </div>
);

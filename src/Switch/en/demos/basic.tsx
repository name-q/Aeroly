/**
 * title: " "
 * description: Basic switch, supports on and off.
 */
import React from 'react';
import { Switch } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch />
    <Switch defaultChecked />
  </div>
);

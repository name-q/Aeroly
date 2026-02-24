/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Switch } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch size="small" defaultChecked />
    <Switch size="medium" defaultChecked />
    <Switch size="large" defaultChecked />
  </div>
);

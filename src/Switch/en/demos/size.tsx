/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), and `large`.
 */
import React from 'react';
import { Switch } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch size="small" defaultChecked />
    <Switch size="medium" defaultChecked />
    <Switch size="large" defaultChecked />
  </div>
);

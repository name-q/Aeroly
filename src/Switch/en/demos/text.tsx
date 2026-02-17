/**
 * title: " "
 * description: Display switch labels via `checkedText` and `uncheckedText`.
 */
import React from 'react';
import { Switch } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch checkedText="ON" uncheckedText="OFF" defaultChecked />
    <Switch checkedText="ON" uncheckedText="OFF" />
  </div>
);

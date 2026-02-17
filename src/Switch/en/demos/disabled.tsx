/**
 * title: " "
 * description: The switch is not operable when disabled.
 */
import React from 'react';
import { Switch } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <Switch disabled />
    <Switch disabled defaultChecked />
  </div>
);

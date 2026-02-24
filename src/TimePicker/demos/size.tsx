/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { TimePicker } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <TimePicker size="small" defaultValue="08:00:00" />
    <TimePicker size="medium" defaultValue="12:30:00" />
    <TimePicker size="large" defaultValue="18:45:00" />
  </div>
);

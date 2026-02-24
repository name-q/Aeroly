/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { DatePicker } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16, maxWidth: 720 }}>
    <DatePicker size="small" defaultValue="2025-03-01" />
    <DatePicker size="medium" defaultValue="2025-06-15" />
    <DatePicker size="large" defaultValue="2025-12-25" />
  </div>
);

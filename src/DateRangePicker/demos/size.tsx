/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { DateRangePicker } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 380 }}>
    <DateRangePicker size="small" />
    <DateRangePicker size="medium" />
    <DateRangePicker size="large" />
  </div>
);

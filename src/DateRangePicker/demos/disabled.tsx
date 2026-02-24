/**
 * title: " "
 * description: 禁用状态。
 */
import React from 'react';
import { DateRangePicker } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 380 }}>
    <DateRangePicker disabled defaultValue={['2025-03-01', '2025-03-15']} />
  </div>
);

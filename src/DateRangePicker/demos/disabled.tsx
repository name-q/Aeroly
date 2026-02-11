/**
 * title: " "
 * description: 禁用状态。
 */
import React from 'react';
import { DateRangePicker } from 'aero-ui';

export default () => (
  <DateRangePicker disabled defaultValue={['2025-03-01', '2025-03-15']} />
);

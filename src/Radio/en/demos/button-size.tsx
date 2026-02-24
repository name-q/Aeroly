/**
 * title: " "
 * description: Button mode also supports three sizes.
 */
import React from 'react';
import { Radio } from 'aeroly';

const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group optionType="button" size="small" defaultValue="day" options={options} />
    <Radio.Group optionType="button" size="medium" defaultValue="week" options={options} />
    <Radio.Group optionType="button" size="large" defaultValue="month" options={options} />
  </div>
);

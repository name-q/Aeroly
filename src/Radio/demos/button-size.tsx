/**
 * title: " "
 * description: 按钮模式同样支持三种尺寸。
 */
import React from 'react';
import { Radio } from 'aeroui';

const options = [
  { value: 'day', label: '日' },
  { value: 'week', label: '周' },
  { value: 'month', label: '月' },
  { value: 'year', label: '年' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group optionType="button" size="small" defaultValue="day" options={options} />
    <Radio.Group optionType="button" size="medium" defaultValue="week" options={options} />
    <Radio.Group optionType="button" size="large" defaultValue="month" options={options} />
  </div>
);

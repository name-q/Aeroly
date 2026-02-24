/**
 * title: " "
 * description: 自定义步长和小数精度。
 */
import React from 'react';
import { InputNumber } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={5} step={5} min={0} max={100} placeholder="步长 5" />
    <InputNumber defaultValue={0.1} step={0.1} min={0} max={1} placeholder="步长 0.1" />
    <InputNumber defaultValue={1.5} step={0.01} precision={2} min={0} placeholder="精度 2 位" />
  </div>
);

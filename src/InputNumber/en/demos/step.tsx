/**
 * title: " "
 * description: Custom step size and decimal precision.
 */
import React from 'react';
import { InputNumber } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={5} step={5} min={0} max={100} placeholder="Step 5" />
    <InputNumber defaultValue={0.1} step={0.1} min={0} max={1} placeholder="Step 0.1" />
    <InputNumber defaultValue={1.5} step={0.01} precision={2} min={0} placeholder="Precision 2" />
  </div>
);

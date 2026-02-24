/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { InputNumber } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={10} size="small" min={0} max={100} />
    <InputNumber defaultValue={10} min={0} max={100} />
    <InputNumber defaultValue={10} size="large" min={0} max={100} />
  </div>
);

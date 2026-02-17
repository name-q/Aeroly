/**
 * title: " "
 * description: Customize display format via `formatter` and `parser`, e.g. currency and percentage.
 */
import React from 'react';
import { InputNumber } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber
      defaultValue={1000}
      min={0}
      prefix="$"
      formatter={(val) => val !== undefined ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
      parser={(text) => Number(text.replace(/,/g, ''))}
      placeholder="Amount"
    />
    <InputNumber
      defaultValue={50}
      min={0}
      max={100}
      formatter={(val) => val !== undefined ? `${val}%` : ''}
      parser={(text) => Number(text.replace('%', ''))}
      placeholder="Percentage"
    />
  </div>
);

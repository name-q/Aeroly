/**
 * title: " "
 * description: 通过 `formatter` 和 `parser` 自定义显示格式，如金额和百分比。
 */
import React from 'react';
import { InputNumber } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber
      defaultValue={1000}
      min={0}
      prefix="¥"
      formatter={(val) => val !== undefined ? `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}
      parser={(text) => Number(text.replace(/,/g, ''))}
      placeholder="金额"
    />
    <InputNumber
      defaultValue={50}
      min={0}
      max={100}
      formatter={(val) => val !== undefined ? `${val}%` : ''}
      parser={(text) => Number(text.replace('%', ''))}
      placeholder="百分比"
    />
  </div>
);

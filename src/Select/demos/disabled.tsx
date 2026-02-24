/**
 * title: " "
 * description: 禁用整个选择器，或禁用单个选项。
 */
import React from 'react';
import { Select } from 'aeroui';

export default () => {
  const options = [
    { label: '可选项 A', value: 'a' },
    { label: '禁用项 B', value: 'b', disabled: true },
    { label: '可选项 C', value: 'c' },
    { label: '禁用项 D', value: 'd', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} placeholder="部分选项禁用" />
      <Select options={options} disabled defaultValue="a" placeholder="整体禁用" />
    </div>
  );
};

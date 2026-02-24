/**
 * title: " "
 * description: 三种尺寸 `small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'a',
      label: '选项 A',
      children: [
        { value: 'a1', label: 'A-1' },
        { value: 'a2', label: 'A-2' },
      ],
    },
    {
      value: 'b',
      label: '选项 B',
      children: [
        { value: 'b1', label: 'B-1' },
        { value: 'b2', label: 'B-2' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Cascader options={options} size="small" placeholder="Small" />
      <Cascader options={options} size="medium" placeholder="Medium" />
      <Cascader options={options} size="large" placeholder="Large" />
    </div>
  );
};

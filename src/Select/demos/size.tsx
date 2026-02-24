/**
 * title: " "
 * description: 三种尺寸 `small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Select } from 'aeroui';

export default () => {
  const options = [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} size="small" placeholder="Small" />
      <Select options={options} size="medium" placeholder="Medium" />
      <Select options={options} size="large" placeholder="Large" />
    </div>
  );
};

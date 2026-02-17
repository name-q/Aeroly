/**
 * title: " "
 * description: Three sizes `small`, `medium` (default), and `large`.
 */
import React from 'react';
import { Cascader } from 'aero-ui';

export default () => {
  const options = [
    {
      value: 'a',
      label: 'Option A',
      children: [
        { value: 'a1', label: 'A-1' },
        { value: 'a2', label: 'A-2' },
      ],
    },
    {
      value: 'b',
      label: 'Option B',
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

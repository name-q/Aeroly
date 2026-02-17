/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { Select } from 'aero-ui';

export default () => {
  const options = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} size="small" placeholder="Small" />
      <Select options={options} size="medium" placeholder="Medium" />
      <Select options={options} size="large" placeholder="Large" />
    </div>
  );
};

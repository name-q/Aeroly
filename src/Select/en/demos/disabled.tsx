/**
 * title: " "
 * description: Disable the entire selector, or disable individual options.
 */
import React from 'react';
import { Select } from 'aeroly';

export default () => {
  const options = [
    { label: 'Option A', value: 'a' },
    { label: 'Option B (disabled)', value: 'b', disabled: true },
    { label: 'Option C', value: 'c' },
    { label: 'Option D (disabled)', value: 'd', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} placeholder="Some options disabled" />
      <Select options={options} disabled defaultValue="a" placeholder="Fully disabled" />
    </div>
  );
};

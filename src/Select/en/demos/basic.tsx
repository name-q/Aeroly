/**
 * title: " "
 * description: Basic single select. Click to expand the dropdown panel and choose an option.
 */
import React from 'react';
import { Select } from 'aeroly';

export default () => {
  const options = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
    { label: 'Grape', value: 'grape' },
    { label: 'Watermelon', value: 'watermelon' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} placeholder="Select a fruit" />
      <Select options={options} defaultValue="banana" allowClear placeholder="Clearable" />
    </div>
  );
};

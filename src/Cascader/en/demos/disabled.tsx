/**
 * title: " "
 * description: Disable the entire selector, or disable individual options.
 */
import React from 'react';
import { Cascader } from 'aero-ui';

export default () => {
  const options = [
    {
      value: 'fruit',
      label: 'Fruit',
      children: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana', disabled: true },
        { value: 'orange', label: 'Orange' },
      ],
    },
    {
      value: 'drink',
      label: 'Beverage',
      disabled: true,
      children: [
        { value: 'coffee', label: 'Coffee' },
        { value: 'tea', label: 'Tea' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Cascader options={options} placeholder="Some options disabled" />
      <Cascader options={options} disabled defaultValue={['fruit', 'apple']} placeholder="Fully disabled" />
    </div>
  );
};

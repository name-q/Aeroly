/**
 * title: " "
 * description: Set `changeOnSelect` to allow selecting any level, not just leaf nodes.
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'light',
      label: 'Lighting',
      children: [
        {
          value: 'desk',
          label: 'Desk Lamp',
          children: [
            { value: 'led', label: 'LED Desk Lamp' },
            { value: 'halogen', label: 'Halogen Desk Lamp' },
          ],
        },
        {
          value: 'ceiling',
          label: 'Ceiling Light',
          children: [
            { value: 'round', label: 'Round' },
            { value: 'square', label: 'Square' },
          ],
        },
      ],
    },
    {
      value: 'furniture',
      label: 'Furniture',
      children: [
        { value: 'chair', label: 'Chair' },
        { value: 'table', label: 'Table' },
      ],
    },
  ];

  return (
    <Cascader options={options} changeOnSelect placeholder="Select any level" allowClear />
  );
};

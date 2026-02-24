/**
 * title: " "
 * description: Use grouped options to categorize related options. Pass `{ label, options }` format.
 */
import React from 'react';
import { Select } from 'aeroly';

export default () => {
  const options = [
    {
      label: 'Frontend',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ],
    },
    {
      label: 'Backend',
      options: [
        { label: 'Node.js', value: 'node' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
      ],
    },
    {
      label: 'Mobile',
      options: [
        { label: 'React Native', value: 'rn' },
        { label: 'Flutter', value: 'flutter' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 320 }}>
      <Select options={options} placeholder="Select tech stack" showSearch />
    </div>
  );
};

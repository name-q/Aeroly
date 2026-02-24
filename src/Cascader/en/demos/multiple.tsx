/**
 * title: " "
 * description: Set `multiple` to enable multi-select mode, allowing multiple leaf paths to be selected.
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'frontend',
      label: 'Frontend',
      children: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ],
    },
    {
      value: 'backend',
      label: 'Backend',
      children: [
        { value: 'node', label: 'Node.js' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
      ],
    },
    {
      value: 'mobile',
      label: 'Mobile',
      children: [
        { value: 'rn', label: 'React Native' },
        { value: 'flutter', label: 'Flutter' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
      <Cascader
        options={options}
        multiple
        placeholder="Select tech stack"
        defaultValue={[['frontend', 'react'], ['backend', 'go']]}
      />
      <Cascader
        options={options}
        multiple
        allowClear
        maxTagCount={2}
        placeholder="Show up to 2 tags"
        defaultValue={[['frontend', 'react'], ['frontend', 'vue'], ['backend', 'node']]}
      />
    </div>
  );
};

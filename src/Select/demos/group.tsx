/**
 * title: " "
 * description: 使用分组选项，将相关选项归类展示。传入 `{ label, options }` 格式即可。
 */
import React from 'react';
import { Select } from 'aeroly';

export default () => {
  const options = [
    {
      label: '前端',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Angular', value: 'angular' },
      ],
    },
    {
      label: '后端',
      options: [
        { label: 'Node.js', value: 'node' },
        { label: 'Go', value: 'go' },
        { label: 'Rust', value: 'rust' },
      ],
    },
    {
      label: '移动端',
      options: [
        { label: 'React Native', value: 'rn' },
        { label: 'Flutter', value: 'flutter' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 320 }}>
      <Select options={options} placeholder="选择技术栈" showSearch />
    </div>
  );
};

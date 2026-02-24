/**
 * title: " "
 * description: 设置 `multiple` 开启多选模式，可同时选择多个叶子路径。
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'frontend',
      label: '前端',
      children: [
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ],
    },
    {
      value: 'backend',
      label: '后端',
      children: [
        { value: 'node', label: 'Node.js' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
      ],
    },
    {
      value: 'mobile',
      label: '移动端',
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
        placeholder="选择技术栈"
        defaultValue={[['frontend', 'react'], ['backend', 'go']]}
      />
      <Cascader
        options={options}
        multiple
        allowClear
        maxTagCount={2}
        placeholder="最多显示 2 个标签"
        defaultValue={[['frontend', 'react'], ['frontend', 'vue'], ['backend', 'node']]}
      />
    </div>
  );
};

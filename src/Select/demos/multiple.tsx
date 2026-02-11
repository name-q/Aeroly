/**
 * title: " "
 * description: 设置 `multiple` 开启多选模式，已选项以标签形式展示，点击标签上的关闭按钮可移除。
 */
import React from 'react';
import { Select } from 'aero-ui';

export default () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Select
        options={options}
        multiple
        placeholder="选择你喜欢的框架"
        defaultValue={['react', 'vue']}
      />
      <Select
        options={options}
        multiple
        allowClear
        maxTagCount={3}
        placeholder="最多显示 3 个标签"
        defaultValue={['react', 'vue', 'angular', 'svelte']}
      />
    </div>
  );
};

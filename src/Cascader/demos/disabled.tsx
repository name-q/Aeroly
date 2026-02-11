/**
 * title: " "
 * description: 禁用整个选择器，或禁用单个选项。
 */
import React from 'react';
import { Cascader } from 'aero-ui';

export default () => {
  const options = [
    {
      value: 'fruit',
      label: '水果',
      children: [
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉', disabled: true },
        { value: 'orange', label: '橙子' },
      ],
    },
    {
      value: 'drink',
      label: '饮料',
      disabled: true,
      children: [
        { value: 'coffee', label: '咖啡' },
        { value: 'tea', label: '茶' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Cascader options={options} placeholder="部分选项禁用" />
      <Cascader options={options} disabled defaultValue={['fruit', 'apple']} placeholder="整体禁用" />
    </div>
  );
};

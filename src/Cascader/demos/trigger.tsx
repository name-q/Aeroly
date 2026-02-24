/**
 * title: " "
 * description: 设置 `changeOnSelect` 允许选中任意层级，而非仅叶子节点。
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'light',
      label: '灯具',
      children: [
        {
          value: 'desk',
          label: '台灯',
          children: [
            { value: 'led', label: 'LED 台灯' },
            { value: 'halogen', label: '卤素台灯' },
          ],
        },
        {
          value: 'ceiling',
          label: '吸顶灯',
          children: [
            { value: 'round', label: '圆形' },
            { value: 'square', label: '方形' },
          ],
        },
      ],
    },
    {
      value: 'furniture',
      label: '家具',
      children: [
        { value: 'chair', label: '椅子' },
        { value: 'table', label: '桌子' },
      ],
    },
  ];

  return (
    <Cascader options={options} changeOnSelect placeholder="选择任意层级" allowClear />
  );
};

/**
 * title: " "
 * description: 基础单选，点击展开下拉面板选择选项。
 */
import React from 'react';
import { Select } from 'aeroly';

export default () => {
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橙子', value: 'orange' },
    { label: '葡萄', value: 'grape' },
    { label: '西瓜', value: 'watermelon' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select options={options} placeholder="请选择水果" />
      <Select options={options} defaultValue="banana" allowClear placeholder="可清除" />
    </div>
  );
};

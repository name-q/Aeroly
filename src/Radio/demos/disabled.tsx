/**
 * title: " "
 * description: 禁用单个选项或整组。
 */
import React from 'react';
import { Radio } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', gap: 16 }}>
      <Radio disabled>未选中禁用</Radio>
      <Radio disabled defaultChecked>选中禁用</Radio>
    </div>
    <Radio.Group
      options={['选项 A', '选项 B', '选项 C']}
      defaultValue="选项 A"
      disabled
    />
  </div>
);

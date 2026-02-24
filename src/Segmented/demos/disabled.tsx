/**
 * title: " "
 * description: 整体禁用或禁用单个选项。
 */
import React from 'react';
import { Segmented } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Segmented options={['可用', '禁用整体', '不可选']} disabled />
    <Segmented
      options={[
        { value: 'a', label: '选项 A' },
        { value: 'b', label: '选项 B', disabled: true },
        { value: 'c', label: '选项 C' },
      ]}
      defaultValue="a"
    />
  </div>
);

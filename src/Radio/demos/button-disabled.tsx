/**
 * title: " "
 * description: 按钮模式支持整体禁用和单项禁用。
 */
import React from 'react';
import { Radio } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group
      optionType="button"
      defaultValue="a"
      options={[
        { value: 'a', label: '选项 A' },
        { value: 'b', label: '选项 B', disabled: true },
        { value: 'c', label: '选项 C' },
      ]}
    />
    <Radio.Group
      optionType="button"
      defaultValue="x"
      disabled
      options={[
        { value: 'x', label: '全部禁用' },
        { value: 'y', label: '选项 Y' },
        { value: 'z', label: '选项 Z' },
      ]}
    />
  </div>
);

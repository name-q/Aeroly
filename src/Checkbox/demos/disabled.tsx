/**
 * title: " "
 * description: 禁用单个复选框或整组。
 */
import React from 'react';
import { Checkbox } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', gap: 16 }}>
      <Checkbox disabled>未选中禁用</Checkbox>
      <Checkbox disabled defaultChecked>选中禁用</Checkbox>
    </div>
    <Checkbox.Group
      options={['选项 A', '选项 B', '选项 C']}
      defaultValue={['选项 A']}
      disabled
    />
  </div>
);

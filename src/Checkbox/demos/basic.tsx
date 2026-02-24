/**
 * title: " "
 * description: 基础复选框，支持选中和取消。
 */
import React from 'react';
import { Checkbox } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Checkbox>同意用户协议</Checkbox>
    <Checkbox defaultChecked>默认选中</Checkbox>
  </div>
);

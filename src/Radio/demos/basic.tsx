/**
 * title: " "
 * description: 基础单选框，点击切换选中状态。
 */
import React from 'react';
import { Radio } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Radio defaultChecked>默认选中</Radio>
    <Radio>未选中</Radio>
  </div>
);

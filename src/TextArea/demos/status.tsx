/**
 * title: " "
 * description: 通过 `status` 设置校验状态。
 */
import React from 'react';
import { TextArea } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea status="error" defaultValue="错误状态" />
    <TextArea status="warning" defaultValue="警告状态" />
  </div>
);

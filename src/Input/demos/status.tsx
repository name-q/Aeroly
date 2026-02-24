/**
 * title: " "
 * description: 通过 `status` 设置校验状态，提供视觉反馈。
 */
import React from 'react';
import { Input } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input status="error" defaultValue="错误状态" />
    <Input status="warning" defaultValue="警告状态" />
  </div>
);

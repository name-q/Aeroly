/**
 * title: " "
 * description: 基础输入框，支持占位文本。
 */
import React from 'react';
import { Input } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input placeholder="请输入内容" />
    <Input defaultValue="带有默认值" />
  </div>
);

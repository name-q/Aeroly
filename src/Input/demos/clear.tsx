/**
 * title: " "
 * description: 设置 `allowClear` 可一键清空输入内容。
 */
import React from 'react';
import { Input } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
    <Input allowClear placeholder="输入后可清除" />
    <Input allowClear defaultValue="已有内容，点击清除" />
  </div>
);

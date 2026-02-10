/**
 * title: " "
 * description: 配合 `maxLength` 和 `showCount` 显示字数统计。
 */
import React from 'react';
import { Input } from 'aero-ui';

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Input maxLength={20} showCount placeholder="最多 20 个字符" />
  </div>
);

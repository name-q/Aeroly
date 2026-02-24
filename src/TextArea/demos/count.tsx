/**
 * title: " "
 * description: 配合 `maxLength` 和 `showCount` 显示字数统计。
 */
import React from 'react';
import { TextArea } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea maxLength={200} showCount placeholder="最多 200 个字符" autoSize={{ minRows: 2, maxRows: 8 }} />
  </div>
);

/**
 * title: " "
 * description: 通过 `addonBefore` 和 `addonAfter` 在输入框外侧添加附加内容。
 */
import React from 'react';
import { Input } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <Input addonBefore="https://" placeholder="域名" />
    <Input addonBefore="https://" addonAfter=".com" placeholder="网站名" />
  </div>
);

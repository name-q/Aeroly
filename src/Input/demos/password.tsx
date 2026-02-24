/**
 * title: " "
 * description: 设置 `type="password"` 自动显示密码可见性切换按钮。
 */
import React from 'react';
import { Input } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 360 }}>
    <Input type="password" placeholder="请输入密码" />
  </div>
);

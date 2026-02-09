/**
 * title: 加载与禁用
 * description: loading 状态自动显示旋转图标并禁用交互，disabled 直接禁用。
 */
import React from 'react';
import { Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button loading type="primary">提交中</Button>
    <Button loading>加载中</Button>
    <Button disabled>禁用</Button>
    <Button disabled type="primary">禁用</Button>
    <Button disabled type="text">禁用</Button>
  </div>
);

/**
 * title: " "
 * description: 独立使用状态点，`shimmer` 开启光影掠过动画。
 */
import React from 'react';
import { Badge } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Badge status="default" statusText="默认" />
    <Badge status="processing" statusText="进行中" shimmer />
    <Badge status="success" statusText="成功" />
    <Badge status="warning" statusText="警告" />
    <Badge status="error" statusText="错误" shimmer />
  </div>
);

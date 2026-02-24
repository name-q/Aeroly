/**
 * title: " "
 * description: 超过 `overflowCount` 显示为 `99+`，`showZero` 控制 0 时是否显示。
 */
import React from 'react';
import { Badge, Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={999} overflowCount={99}>
      <Button>99+</Button>
    </Badge>
    <Badge count={0} showZero>
      <Button>showZero</Button>
    </Badge>
    <Badge count={0}>
      <Button>默认隐藏</Button>
    </Badge>
  </div>
);

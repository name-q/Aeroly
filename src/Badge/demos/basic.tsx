/**
 * title: " "
 * description: 基础用法，右上角展示数字徽标。
 */
import React from 'react';
import { Badge, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={5}>
      <Button>消息</Button>
    </Badge>
    <Badge count={25}>
      <Button>通知</Button>
    </Badge>
    <Badge count={100}>
      <Button>待办</Button>
    </Badge>
  </div>
);

/**
 * title: " "
 * description: 不展示数字，只显示小红点。
 */
import React from 'react';
import { Badge, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge dot color="red">
      <Button>消息</Button>
    </Badge>
    <Badge dot color="red">
      <span style={{ fontSize: 14 }}>新功能</span>
    </Badge>
  </div>
);

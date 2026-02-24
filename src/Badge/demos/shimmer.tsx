/**
 * title: " "
 * description: 开启 `shimmer` 为徽标添加光影掠过动画，适合用于强提醒场景。
 */
import React from 'react';
import { Badge, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge count={5} shimmer>
      <Button>新消息</Button>
    </Badge>
    <Badge dot shimmer>
      <Button>有更新</Button>
    </Badge>
    <Badge text="NEW" shimmer>
      <Button>新功能</Button>
    </Badge>
  </div>
);

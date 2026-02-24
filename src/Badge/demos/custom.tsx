/**
 * title: " "
 * description: 通过 `color` 自定义颜色，`text` 自定义显示内容。
 */
import React from 'react';
import { Badge, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge color="#7c3aed" count={8}>
      <Button>紫色</Button>
    </Badge>
    <Badge color="#0891b2" count={3}>
      <Button>青色</Button>
    </Badge>
    <Badge text="NEW">
      <Button>自定义文本</Button>
    </Badge>
    <Badge text="HOT" color="#ea580c">
      <Button>热门</Button>
    </Badge>
  </div>
);

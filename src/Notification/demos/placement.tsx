/**
 * title: " "
 * description: 通过 `placement` 控制弹出位置，支持四个角。
 */
import React from 'react';
import { notification, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    <Button onClick={() => notification.open({ title: '右上角', description: 'topRight（默认）', placement: 'topRight' })}>
      右上角
    </Button>
    <Button onClick={() => notification.open({ title: '左上角', description: 'topLeft', placement: 'topLeft' })}>
      左上角
    </Button>
    <Button onClick={() => notification.open({ title: '右下角', description: 'bottomRight', placement: 'bottomRight' })}>
      右下角
    </Button>
    <Button onClick={() => notification.open({ title: '左下角', description: 'bottomLeft', placement: 'bottomLeft' })}>
      左下角
    </Button>
  </div>
);

/**
 * title: " "
 * description: `duration` 设为 `0` 则不自动关闭，需手动点击关闭按钮。
 */
import React from 'react';
import { notification, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Button onClick={() => notification.info('自定义时长', '2 秒后关闭', { duration: 2000 })}>
      2 秒关闭
    </Button>
    <Button onClick={() => notification.info('不自动关闭', '需要手动点击关闭按钮', { duration: 0 })}>
      不自动关闭
    </Button>
  </div>
);

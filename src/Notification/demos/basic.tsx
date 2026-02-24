/**
 * title: " "
 * description: 最简单的用法，4.5 秒后自动关闭。
 */
import React from 'react';
import { notification, Button } from 'aeroly';

export default () => (
  <Button onClick={() => notification.info('提示', '这是一条通知消息')}>
    打开通知
  </Button>
);

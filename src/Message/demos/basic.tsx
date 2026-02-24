/**
 * title: " "
 * description: 最简单的用法，一行代码弹出提示。
 */
import React from 'react';
import { Button, message } from 'aeroly';

export default () => (
  <Button type="primary" onClick={() => message.info('这是一条全局提示')}>
    弹出提示
  </Button>
);

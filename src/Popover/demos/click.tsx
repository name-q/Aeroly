/**
 * title: " "
 * description: 设置 `trigger="click"` 点击触发，点击外部区域关闭。
 */
import React from 'react';
import { Popover, Button } from 'aeroui';

export default () => (
  <Popover
    content="点击外部区域关闭"
    title="点击触发"
    trigger="click"
  >
    <Button>点击弹出</Button>
  </Popover>
);

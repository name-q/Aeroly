/**
 * title: " "
 * description: 鼠标移入触发，移出消失。
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';

export default () => (
  <Popover content="这是一段提示内容" title="提示">
    <Button>鼠标移入</Button>
  </Popover>
);

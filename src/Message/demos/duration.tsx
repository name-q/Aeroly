/**
 * title: " "
 * description: 第二个参数可自定义显示时长（ms），默认 3000ms。
 */
import React from 'react';
import { Button, message } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 12 }}>
    <Button onClick={() => message.success('1 秒后关闭', 1000)}>1 秒</Button>
    <Button onClick={() => message.success('10 秒后关闭', 10000)}>10 秒</Button>
  </div>
);

/**
 * title: " "
 * description: 提供 small、medium（默认）、large 三种尺寸。
 */
import React from 'react';
import { Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button size="small">小按钮</Button>
    <Button size="medium">中按钮</Button>
    <Button size="large">大按钮</Button>
  </div>
);

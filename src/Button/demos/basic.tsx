/**
 * title: 基础用法
 * description: 三种按钮类型：默认（毛玻璃）、主色、文本。
 */
import React from 'react';
import { Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button>默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="text">文本按钮</Button>
  </div>
);

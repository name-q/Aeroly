/**
 * title: " "
 * description: 用 `flex` 设置 CSS flex 简写，实现侧栏 + 内容区经典布局。
 */
import React from 'react';
import { Flex } from 'aeroly';

const box: React.CSSProperties = { height: 80, borderRadius: 8, color: '#fff', fontSize: 12 };

export default () => (
  <Flex gap="small">
    <Flex flex="0 0 100px" justify="center" align="center" style={{ ...box, background: '#50b8e7' }}>
      侧栏
    </Flex>
    <Flex flex={1} justify="center" align="center" style={{ ...box, background: '#36a3d4' }}>
      内容区
    </Flex>
  </Flex>
);

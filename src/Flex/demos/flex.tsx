/**
 * title: " "
 * description: 用 `flex` 控制子元素伸缩比例，实现侧栏 + 内容区经典布局。
 */
import React from 'react';
import { Flex } from 'aero-ui';

export default () => (
  <Flex gap="sm" full>
    <Flex
      center
      flex="0 0 100px"
      style={{ height: 80, borderRadius: 8, background: '#50b8e7', color: '#fff', fontSize: 12 }}
    >
      侧栏
    </Flex>
    <Flex
      center
      flex={1}
      style={{ height: 80, borderRadius: 8, background: '#36a3d4', color: '#fff', fontSize: 12 }}
    >
      内容区
    </Flex>
  </Flex>
);

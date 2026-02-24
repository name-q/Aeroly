/**
 * title: " "
 * description: `auto` 属性替代手写 `margin: auto`，直接加在子元素上推开相邻元素。
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

export default () => (
  <Flex direction="column" gap="md">
    <Flex
      gap="sm"
      full
      style={{
        padding: '12px 16px',
        borderRadius: 12,
        background: 'rgba(80,184,231,0.08)',
      }}
    >
      <Flex auto="right">
        <DemoBox w="auto" h={36} color="#50b8e7">Logo</DemoBox>
      </Flex>
      <DemoBox w="auto" h={36} color="#36a3d4">菜单</DemoBox>
      <DemoBox w="auto" h={36} color="#2b8ab5">用户</DemoBox>
    </Flex>
    <Flex
      direction="column"
      full
      style={{
        height: 140,
        padding: 16,
        borderRadius: 12,
        background: 'rgba(80,184,231,0.08)',
      }}
    >
      <Flex auto="bottom">
        <DemoBox w="auto" h={36}>内容</DemoBox>
      </Flex>
      <DemoBox w="auto" h={36} color="#36a3d4">底部</DemoBox>
    </Flex>
  </Flex>
);

/**
 * title: " "
 * description: 默认水平排列。用 `gap` 控制间距，支持 `small` `medium` `large` 预设、数字（px）和 CSS 字符串。
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

export default () => (
  <Flex vertical gap="large">
    <Flex gap="small">
      <DemoBox>small</DemoBox>
      <DemoBox>small</DemoBox>
      <DemoBox>small</DemoBox>
    </Flex>
    <Flex gap="medium">
      <DemoBox>medium</DemoBox>
      <DemoBox>medium</DemoBox>
      <DemoBox>medium</DemoBox>
    </Flex>
    <Flex gap={32}>
      <DemoBox>32</DemoBox>
      <DemoBox>32</DemoBox>
      <DemoBox>32</DemoBox>
    </Flex>
  </Flex>
);

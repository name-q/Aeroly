/**
 * title: " "
 * description: 设置 `vertical` 切换为纵向排列，此时子元素默认横向拉伸。
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

export default () => (
  <Flex vertical gap="small">
    <DemoBox w="auto" h={36}>第一行</DemoBox>
    <DemoBox w="auto" h={36}>第二行</DemoBox>
    <DemoBox w="auto" h={36}>第三行</DemoBox>
  </Flex>
);

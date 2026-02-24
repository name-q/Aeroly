/**
 * title: " "
 * description: 默认水平排列、垂直居中。用 `gap` 控制间距，支持数字（px）和语义 token（`xs` `sm` `md` `lg`）。
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroui';

export default () => (
  <Flex gap="md">
    <DemoBox>A</DemoBox>
    <DemoBox>B</DemoBox>
    <DemoBox>C</DemoBox>
  </Flex>
);

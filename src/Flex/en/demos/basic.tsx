/**
 * title: " "
 * description: Horizontal by default. Use `gap` for spacing, which accepts the `small` `medium` `large` presets, numbers (px) and CSS strings.
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

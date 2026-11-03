/**
 * title: " "
 * description: Set `vertical` to stack children vertically. Children stretch horizontally by default.
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

export default () => (
  <Flex vertical gap="small">
    <DemoBox w="auto" h={36}>Row 1</DemoBox>
    <DemoBox w="auto" h={36}>Row 2</DemoBox>
    <DemoBox w="auto" h={36}>Row 3</DemoBox>
  </Flex>
);

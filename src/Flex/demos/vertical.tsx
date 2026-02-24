/**
 * title: " "
 * description: `direction="column"` 切换纵向排列。
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

export default () => (
  <Flex direction="column" gap="sm" align="start">
    <DemoBox w="auto" h={36}>第一行</DemoBox>
    <DemoBox w="auto" h={36}>第二行</DemoBox>
    <DemoBox w="auto" h={36}>第三行</DemoBox>
  </Flex>
);

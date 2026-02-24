/**
 * title: " "
 * description: 三种尺寸的加载指示器。
 */
import React from 'react';
import { Spin, Flex } from 'aeroui';

export default () => (
  <Flex gap={32} align="center">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Flex>
);

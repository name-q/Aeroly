/**
 * title: " "
 * description: Use `flex` to control child stretch ratios, creating a classic sidebar + content layout.
 */
import React from 'react';
import { Flex } from 'aeroly';

export default () => (
  <Flex gap="sm" full>
    <Flex
      center
      flex="100px"
      style={{ height: 80, borderRadius: 8, background: '#50b8e7', color: '#fff', fontSize: 12 }}
    >
      Sidebar
    </Flex>
    <Flex
      center
      flex={1}
      style={{ height: 80, borderRadius: 8, background: '#36a3d4', color: '#fff', fontSize: 12 }}
    >
      Content
    </Flex>
  </Flex>
);

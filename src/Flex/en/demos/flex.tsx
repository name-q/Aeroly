/**
 * title: " "
 * description: Use `flex` to set the CSS flex shorthand for a classic sidebar + content layout.
 */
import React from 'react';
import { Flex } from 'aeroly';

const box: React.CSSProperties = { height: 80, borderRadius: 8, color: '#fff', fontSize: 12 };

export default () => (
  <Flex gap="small">
    <Flex flex="0 0 100px" justify="center" align="center" style={{ ...box, background: '#50b8e7' }}>
      Sidebar
    </Flex>
    <Flex flex={1} justify="center" align="center" style={{ ...box, background: '#36a3d4' }}>
      Content
    </Flex>
  </Flex>
);

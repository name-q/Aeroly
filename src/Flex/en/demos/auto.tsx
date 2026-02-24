/**
 * title: " "
 * description: The `auto` prop replaces hand-written `margin: auto`, applied directly on children to push adjacent elements apart.
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
      <DemoBox w="auto" h={36} color="#36a3d4">Menu</DemoBox>
      <DemoBox w="auto" h={36} color="#2b8ab5">User</DemoBox>
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
        <DemoBox w="auto" h={36}>Content</DemoBox>
      </Flex>
      <DemoBox w="auto" h={36} color="#36a3d4">Footer</DemoBox>
    </Flex>
  </Flex>
);

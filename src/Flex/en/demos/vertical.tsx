/**
 * title: " "
 * description: `direction="column"` switches to vertical layout.
 */
import React from 'react';
import { Flex, DemoBox } from 'aero-ui';

export default () => (
  <Flex direction="column" gap="sm" align="start">
    <DemoBox w="auto" h={36}>Row 1</DemoBox>
    <DemoBox w="auto" h={36}>Row 2</DemoBox>
    <DemoBox w="auto" h={36}>Row 3</DemoBox>
  </Flex>
);

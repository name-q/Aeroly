/**
 * title: " "
 * description: Horizontal layout with vertical centering by default. Use `gap` to control spacing — supports numbers (px) and semantic tokens (`xs` `sm` `md` `lg`).
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

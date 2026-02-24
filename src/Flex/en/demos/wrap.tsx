/**
 * title: " "
 * description: `wrap` allows children to wrap, combined with `gap` to control row and column spacing.
 */
import React from 'react';
import { Flex, DemoBox } from 'aeroly';

const colors = [
  '#50b8e7', '#73d13d', '#faad14', '#f5222d', '#722ed1',
  '#13c2c2', '#eb2f96', '#fa8c16', '#2f54eb', '#52c41a',
];

export default () => (
  <Flex wrap gap="sm" style={{ maxWidth: 400 }}>
    {colors.map((c, i) => (
      <DemoBox key={i} w={64} h={36} color={c} />
    ))}
  </Flex>
);

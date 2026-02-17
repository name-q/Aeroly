/**
 * title: " "
 * description: Three sizes of loading indicators.
 */
import React from 'react';
import { Spin, Flex } from 'aero-ui';

export default () => (
  <Flex gap={32} align="center">
    <Spin size="small" />
    <Spin />
    <Spin size="large" />
  </Flex>
);

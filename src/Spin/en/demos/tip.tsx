/**
 * title: " "
 * description: Add loading tip text via the `tip` property.
 */
import React from 'react';
import { Spin, Flex } from 'aeroui';

export default () => (
  <Flex gap={48} align="center">
    <Spin size="small" tip="Loading" />
    <Spin tip="Loading..." />
    <Spin size="large" tip="Please wait..." />
  </Flex>
);

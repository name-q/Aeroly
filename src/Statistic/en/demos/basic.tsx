/**
 * title: " "
 * description: Basic usage displaying values and titles.
 */
import React from 'react';
import { Statistic, Flex } from 'aeroly';

export default () => (
  <Flex gap="lg">
    <Statistic title="Active Users" value={112893} />
    <Statistic title="Account Balance" value={112893.12} precision={2} prefix="$" />
  </Flex>
);

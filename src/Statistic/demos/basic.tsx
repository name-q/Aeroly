/**
 * title: " "
 * description: 最基础的用法，展示数值和标题。
 */
import React from 'react';
import { Statistic, Flex } from 'aero-ui';

export default () => (
  <Flex gap="lg">
    <Statistic title="活跃用户" value={112893} />
    <Statistic title="账户余额" value={112893.12} precision={2} prefix="¥" />
  </Flex>
);

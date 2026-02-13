/**
 * title: " "
 * description: 通过 `tip` 属性添加加载提示文字。
 */
import React from 'react';
import { Spin, Flex } from 'aero-ui';

export default () => (
  <Flex gap={48} align="center">
    <Spin size="small" tip="加载中" />
    <Spin tip="加载中..." />
    <Spin size="large" tip="请稍候..." />
  </Flex>
);

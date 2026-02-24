/**
 * title: " "
 * description: 通过 `prefix` 和 `suffix` 添加前缀图标或后缀单位。
 */
import React from 'react';
import { Statistic, Flex } from 'aeroly';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default () => (
  <Flex gap="lg">
    <Statistic
      title="增长率"
      value={11.28}
      precision={2}
      status="success"
      prefix={<TrendingUp size={18} />}
      suffix="%"
    />
    <Statistic
      title="下降率"
      value={9.3}
      precision={2}
      status="error"
      prefix={<TrendingDown size={18} />}
      suffix="%"
    />
  </Flex>
);

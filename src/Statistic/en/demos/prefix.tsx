/**
 * title: " "
 * description: Add prefix icons or suffix units via `prefix` and `suffix`.
 */
import React from 'react';
import { Statistic, Flex } from 'aeroly';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default () => (
  <Flex gap="lg">
    <Statistic
      title="Growth Rate"
      value={11.28}
      precision={2}
      status="success"
      prefix={<TrendingUp size={18} />}
      suffix="%"
    />
    <Statistic
      title="Decline Rate"
      value={9.3}
      precision={2}
      status="error"
      prefix={<TrendingDown size={18} />}
      suffix="%"
    />
  </Flex>
);

/**
 * title: " "
 * description: Set `loading` to display a skeleton placeholder, suitable for data loading scenarios.
 */
import React, { useState } from 'react';
import { Statistic, Button, Flex } from 'aeroly';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Flex vertical gap={12} align="center">
      <Flex gap={16} align="center">
        <Statistic title="Total Sales" value={126560} prefix="$" loading={loading} />
        <Statistic title="Orders" value={8846} loading={loading} />
      </Flex>
      <Flex align="center">
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Done Loading' : 'Reload'}
        </Button>
      </Flex>
    </Flex>
  );
};

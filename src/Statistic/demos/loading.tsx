/**
 * title: " "
 * description: 设置 `loading` 显示骨架屏占位，适合数据加载中的场景。
 */
import React, { useState } from 'react';
import { Statistic, Button, Flex } from 'aeroly';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Flex direction="column" gap="md">
      <Flex gap="lg">
        <Statistic title="总销售额" value={126560} prefix="¥" loading={loading} />
        <Statistic title="订单量" value={8846} loading={loading} />
      </Flex>
      <Flex>
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? '加载完成' : '重新加载'}
        </Button>
      </Flex>
    </Flex>
  );
};

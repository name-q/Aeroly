/**
 * title: " "
 * description: 设置 `animated` 开启数值滚动动画，数值变化时平滑过渡。
 */
import React, { useState } from 'react';
import { Statistic, Button, Flex } from 'aeroui';

export default () => {
  const [value, setValue] = useState(100);

  return (
    <Flex direction="column" gap="md">
      <Statistic title="交易额" value={value} precision={2} prefix="¥" animated />
      <Flex gap="sm">
        <Button size="small" onClick={() => setValue((v) => v + Math.floor(Math.random() * 1000))}>
          增加
        </Button>
        <Button size="small" onClick={() => setValue((v) => Math.max(0, v - Math.floor(Math.random() * 500)))}>
          减少
        </Button>
      </Flex>
    </Flex>
  );
};

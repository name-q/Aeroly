/**
 * title: " "
 * description: `center` 一键双向居中。对比 `full` 开启前后的宽度差异。
 */
import React, { useState } from 'react';
import { Flex, Button, DemoBox } from 'aeroly';

export default () => {
  const [isFull, setIsFull] = useState(false);

  return (
    <Flex direction="column" gap="md">
      <Button onClick={() => setIsFull((v) => !v)}>
        full={isFull ? 'true' : 'false'}
      </Button>
      <Flex
        center
        full={isFull}
        style={{
          height: 140,
          borderRadius: 12,
          background: 'rgba(80,184,231,0.08)',
        }}
      >
        <DemoBox w={80} h={80}>居中</DemoBox>
      </Flex>
    </Flex>
  );
};

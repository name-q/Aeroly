/**
 * title: " "
 * description: `center` enables both horizontal and vertical centering. Compare the width difference with and without `full`.
 */
import React, { useState } from 'react';
import { Flex, Button, DemoBox } from 'aero-ui';

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
        <DemoBox w={80} h={80}>Center</DemoBox>
      </Flex>
    </Flex>
  );
};

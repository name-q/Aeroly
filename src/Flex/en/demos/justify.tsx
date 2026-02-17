/**
 * title: " "
 * description: Click to cycle through the six `justify` distribution modes and observe how the blocks reposition.
 */
import React, { useState } from 'react';
import { Flex, Button, DemoBox } from 'aero-ui';

const modes = ['start', 'center', 'end', 'between', 'around', 'evenly'] as const;

export default () => {
  const [idx, setIdx] = useState(0);
  const mode = modes[idx];

  return (
    <Flex direction="column" gap="md">
      <Button onClick={() => setIdx((i) => (i + 1) % modes.length)}>
        justify="{mode}"
      </Button>
      <Flex
        justify={mode}
        full
        style={{
          height: 64,
          borderRadius: 12,
          background: 'rgba(80,184,231,0.08)',
          padding: '0 12px',
        }}
      >
        <DemoBox w={48} h={48} />
        <DemoBox w={48} h={48} color="#36a3d4" />
        <DemoBox w={48} h={48} color="#2b8ab5" />
      </Flex>
    </Flex>
  );
};

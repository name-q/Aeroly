/**
 * title: " "
 * description: `justify` and `align` take the CSS `justify-content` / `align-items` values directly. Click to cycle through them.
 */
import React, { useState } from 'react';
import { Flex, Button, DemoBox } from 'aeroly';

const justifyOptions = ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const;
const alignOptions = ['flex-start', 'center', 'flex-end'] as const;

export default () => {
  const [justify, setJustify] = useState(0);
  const [align, setAlign] = useState(0);

  return (
    <Flex vertical gap="medium">
      <Flex gap="small">
        <Button onClick={() => setJustify((i) => (i + 1) % justifyOptions.length)}>
          justify="{justifyOptions[justify]}"
        </Button>
        <Button onClick={() => setAlign((i) => (i + 1) % alignOptions.length)}>
          align="{alignOptions[align]}"
        </Button>
      </Flex>
      <Flex
        justify={justifyOptions[justify]}
        align={alignOptions[align]}
        style={{
          height: 96,
          borderRadius: 12,
          background: 'rgba(80,184,231,0.08)',
          padding: '0 12px',
        }}
      >
        <DemoBox w={48} h={48} />
        <DemoBox w={48} h={32} color="#36a3d4" />
        <DemoBox w={48} h={64} color="#2b8ab5" />
      </Flex>
    </Flex>
  );
};

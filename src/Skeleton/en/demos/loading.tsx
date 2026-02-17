/**
 * title: " "
 * description: Control the toggle between skeleton and real content via `loading`. Skeleton only renders the placeholder; real content is conditionally rendered externally.
 */
import React, { useState } from 'react';
import { Skeleton, Switch, Flex } from 'aero-ui';

export default () => {
  const [loading, setLoading] = useState(true);

  const skeleton = (
    <Skeleton>
      <Flex gap={12} align="start" full>
        <Skeleton.Circle size={48} />
        <Flex direction="column" gap={8} flex={1} align="start">
          <Skeleton.Block width="50%" height={20} />
          <Skeleton.Text rows={3} />
        </Flex>
      </Flex>
    </Skeleton>
  );

  const content = (
    <Flex gap={12} align="start" full>
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=aero"
        alt="avatar"
        style={{ width: 48, height: 48, borderRadius: '50%' }}
      />
      <Flex direction="column" flex={1}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AeroUI Skeleton Component</div>
        <div style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
          Skeleton provides three atomic shapes: Block, Circle, and Text, which can be freely combined into any skeleton layout.
          Combined with loading state, it enables seamless transitions between loading and real content. The skeleton layout should closely match the real content structure.
        </div>
      </Flex>
    </Flex>
  );

  return (
    <Flex direction="column" gap={16}>
      <Flex align="center" gap={8}>
        <Switch checked={loading} onChange={setLoading} />
        <span>Loading</span>
      </Flex>
      {loading ? skeleton : content}
    </Flex>
  );
};

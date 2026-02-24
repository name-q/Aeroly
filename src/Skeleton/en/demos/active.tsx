/**
 * title: " "
 * description: Set `active={false}` to disable shimmer animation and show a static skeleton.
 */
import React from 'react';
import { Skeleton, Flex } from 'aeroui';

export default () => (
  <Flex gap={24}>
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>active (default)</div>
      <Skeleton>
        <Flex gap={12} align="start" full>
          <Skeleton.Circle size={40} />
          <Flex direction="column" gap={8} flex={1} align="start">
            <Skeleton.Block width="60%" height={18} />
            <Skeleton.Text rows={2} />
          </Flex>
        </Flex>
      </Skeleton>
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: 8, fontSize: 13, color: 'rgba(0,0,0,0.45)' }}>static</div>
      <Skeleton active={false}>
        <Flex gap={12} align="start" full>
          <Skeleton.Circle size={40} />
          <Flex direction="column" gap={8} flex={1} align="start">
            <Skeleton.Block width="60%" height={18} />
            <Skeleton.Text rows={2} />
          </Flex>
        </Flex>
      </Skeleton>
    </div>
  </Flex>
);

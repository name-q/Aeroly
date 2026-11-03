/**
 * title: " "
 * description: Freely compose skeleton layouts using `Block`, `Circle`, and `Text` atomic components.
 */
import React from 'react';
import { Skeleton, Flex } from 'aeroly';

export default () => (
  <Flex gap={24} vertical align="center">
    {/* Text paragraph */}
    <Skeleton>
      <Skeleton.Text rows={3} />
    </Skeleton>

    {/* List item with avatar */}
    <Skeleton>
      <Flex gap={12} align="start" style={{ width: '100%' }}>
        <Skeleton.Circle size={48} />
        <Flex vertical gap={8} flex={1} align="start">
          <Skeleton.Block width="40%" height={20} />
          <Skeleton.Text rows={2} />
        </Flex>
      </Flex>
    </Skeleton>

    {/* Card */}
    <Skeleton>
      <Skeleton.Block width="100%" height={160} borderRadius={12} />
      <Flex vertical gap={8} align="start" style={{ width: '100%', marginTop: 12 }}>
        <Skeleton.Block width="70%" height={20} />
        <Skeleton.Text rows={2} />
      </Flex>
    </Skeleton>
  </Flex>
);

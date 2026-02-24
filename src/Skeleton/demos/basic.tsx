/**
 * title: " "
 * description: 使用 `Block`、`Circle`、`Text` 原子组件自由组合骨架屏。
 */
import React from 'react';
import { Skeleton, Flex } from 'aeroui';

export default () => (
  <Flex gap={24} direction="column">
    {/* 文本段落 */}
    <Skeleton>
      <Skeleton.Text rows={3} />
    </Skeleton>

    {/* 带头像的列表项 */}
    <Skeleton>
      <Flex gap={12} align="start" full>
        <Skeleton.Circle size={48} />
        <Flex direction="column" gap={8} flex={1} align="start">
          <Skeleton.Block width="40%" height={20} />
          <Skeleton.Text rows={2} />
        </Flex>
      </Flex>
    </Skeleton>

    {/* 卡片 */}
    <Skeleton>
      <Skeleton.Block width="100%" height={160} borderRadius={12} />
      <Flex direction="column" gap={8} full align="start" style={{ marginTop: 12 }}>
        <Skeleton.Block width="70%" height={20} />
        <Skeleton.Text rows={2} />
      </Flex>
    </Skeleton>
  </Flex>
);

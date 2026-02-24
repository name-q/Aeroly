/**
 * title: " "
 * description: 通过 `loading` 控制骨架屏与真实内容的切换。Skeleton 只负责渲染骨架，真实内容在外部条件渲染。
 */
import React, { useState } from 'react';
import { Skeleton, Switch, Flex } from 'aeroly';

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
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AeroUI 骨架屏组件</div>
        <div style={{ color: 'rgba(0,0,0,0.55)', lineHeight: 1.6 }}>
          Skeleton 提供了 Block、Circle、Text 三种原子形状，可以自由组合出任意骨架屏布局。
          配合 loading 状态实现加载态与真实内容的无缝切换，骨架布局尽量贴近真实内容的结构。
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

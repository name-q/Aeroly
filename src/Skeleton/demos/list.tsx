/**
 * title: " "
 * description: 模拟列表加载场景，骨架屏与真实数据无缝切换。
 */
import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Flex } from 'aeroly';

interface Item {
  id: number;
  title: string;
  desc: string;
}

const mockData: Item[] = [
  { id: 1, title: '深入理解 React Hooks', desc: '从 useState 到自定义 Hook，全面掌握 Hooks 的设计哲学与最佳实践。' },
  { id: 2, title: 'TypeScript 类型体操指南', desc: '通过实战案例学习高级类型推导，让类型系统成为你的开发利器。' },
  { id: 3, title: 'CSS 效果实现', desc: '打造现代化的 Aero 风格界面，兼容性方案全解析。' },
];

const ListItem: React.FC<{ item: Item }> = ({ item }) => (
  <Flex gap={12} align="start" full style={{ padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
    <div style={{
      width: 44, height: 44, borderRadius: 8, flexShrink: 0,
      background: 'linear-gradient(135deg, #50b8e7, #7dd3fc)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: 18,
    }}>
      {item.title[0]}
    </div>
    <Flex direction="column" flex={1} align="start">
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.title}</div>
      <div style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)', lineHeight: 1.5 }}>{item.desc}</div>
    </Flex>
  </Flex>
);

const SkeletonItem = () => (
  <Flex gap={12} align="start" full style={{ padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
    <Skeleton.Block width={44} height={44} borderRadius={8} />
    <Flex direction="column" gap={6} flex={1} align="start">
      <Skeleton.Block width="45%" height={18} />
      <Skeleton.Text rows={1} lineHeight={13} />
    </Flex>
  </Flex>
);

export default () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Item[]>([]);

  const load = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => { load(); }, []);

  return (
    <Flex direction="column" gap={12}>
      <Button onClick={load} disabled={loading}>重新加载</Button>
      {loading ? (
        <Skeleton>
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </Skeleton>
      ) : (
        <div>
          {data.map((item) => (
            <ListItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Flex>
  );
};

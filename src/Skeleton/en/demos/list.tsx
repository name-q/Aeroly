/**
 * title: " "
 * description: Simulates a list loading scenario with seamless transition between skeleton and real data.
 */
import React, { useState, useEffect } from 'react';
import { Skeleton, Button, Flex } from 'aeroui';

interface Item {
  id: number;
  title: string;
  desc: string;
}

const mockData: Item[] = [
  { id: 1, title: 'Deep Dive into React Hooks', desc: 'From useState to custom Hooks, master the design philosophy and best practices of Hooks.' },
  { id: 2, title: 'TypeScript Type Gymnastics Guide', desc: 'Learn advanced type inference through practical examples, making the type system your development superpower.' },
  { id: 3, title: 'CSS Effects Implementation', desc: 'Build modern Aero-style interfaces with full compatibility solutions.' },
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
      <Button onClick={load} disabled={loading}>Reload</Button>
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

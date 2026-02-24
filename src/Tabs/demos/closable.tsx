import React, { useState } from 'react';
import { Tabs, Button } from 'aeroly';
import { Plus } from 'lucide-react';
import type { TabItem } from 'aeroly';

let seq = 3;

const initialItems: TabItem[] = [
  { key: '1', label: '标签 1', closable: true, children: <p>标签 1 的内容。</p> },
  { key: '2', label: '标签 2', closable: true, children: <p>标签 2 的内容。</p> },
  { key: '3', label: '标签 3', closable: true, children: <p>标签 3 的内容。</p> },
];

export default () => {
  const [items, setItems] = useState<TabItem[]>(initialItems);
  const [activeKey, setActiveKey] = useState('1');

  const handleClose = (key: string) => {
    const idx = items.findIndex((item) => item.key === key);
    const next = items.filter((item) => item.key !== key);
    setItems(next);
    if (activeKey === key && next.length) {
      setActiveKey(next[Math.min(idx, next.length - 1)].key);
    }
  };

  const handleAdd = () => {
    seq += 1;
    const newKey = String(seq);
    setItems((prev) => [
      ...prev,
      { key: newKey, label: `标签 ${seq}`, closable: true, children: <p>标签 {seq} 的内容。</p> },
    ]);
    setActiveKey(newKey);
  };

  return (
    <Tabs
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onClose={handleClose}
      extra={<Button size="small" onClick={handleAdd} icon={Plus}>新增</Button>}
    />
  );
};

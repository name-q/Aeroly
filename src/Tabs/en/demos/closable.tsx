import React, { useState } from 'react';
import { Tabs, Button } from 'aeroui';
import { Plus } from 'lucide-react';
import type { TabItem } from 'aeroui';

let seq = 3;

const initialItems: TabItem[] = [
  { key: '1', label: 'Tab 1', closable: true, children: <p>Tab 1 content.</p> },
  { key: '2', label: 'Tab 2', closable: true, children: <p>Tab 2 content.</p> },
  { key: '3', label: 'Tab 3', closable: true, children: <p>Tab 3 content.</p> },
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
      { key: newKey, label: `Tab ${seq}`, closable: true, children: <p>Tab {seq} content.</p> },
    ]);
    setActiveKey(newKey);
  };

  return (
    <Tabs
      items={items}
      activeKey={activeKey}
      onChange={setActiveKey}
      onClose={handleClose}
      extra={<Button size="small" onClick={handleAdd} icon={Plus}>Add</Button>}
    />
  );
};

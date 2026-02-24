/**
 * title: " "
 * description: Fully control tree state via `expandedKeys` and `selectedKeys`.
 */
import React, { useState } from 'react';
import { Tree, Button } from 'aeroly';

const treeData = [
  {
    key: '1',
    title: 'Documentation',
    children: [
      { key: '1-1', title: 'Quick Start' },
      { key: '1-2', title: 'Installation Guide' },
      { key: '1-3', title: 'Changelog' },
    ],
  },
  {
    key: '2',
    title: 'Components',
    children: [
      { key: '2-1', title: 'General' },
      { key: '2-2', title: 'Data Entry' },
      { key: '2-3', title: 'Data Display' },
    ],
  },
];

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="small" onClick={() => setExpandedKeys(['1', '2'])}>Expand All</Button>
        <Button size="small" onClick={() => setExpandedKeys([])}>Collapse All</Button>
      </div>
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
      <div style={{ fontSize: 13, color: '#888' }}>
        Selected: {selectedKeys.join(', ') || '(none)'}
      </div>
    </div>
  );
};

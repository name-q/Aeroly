/**
 * title: " "
 * description: 通过 `expandedKeys` 和 `selectedKeys` 完全控制树的状态。
 */
import React, { useState } from 'react';
import { Tree, Button } from 'aeroly';

const treeData = [
  {
    key: '1',
    title: '文档',
    children: [
      { key: '1-1', title: '快速开始' },
      { key: '1-2', title: '安装指南' },
      { key: '1-3', title: '更新日志' },
    ],
  },
  {
    key: '2',
    title: '组件',
    children: [
      { key: '2-1', title: '基础组件' },
      { key: '2-2', title: '数据录入' },
      { key: '2-3', title: '数据展示' },
    ],
  },
];

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['1']);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="small" onClick={() => setExpandedKeys(['1', '2'])}>全部展开</Button>
        <Button size="small" onClick={() => setExpandedKeys([])}>全部收起</Button>
      </div>
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
      <div style={{ fontSize: 13, color: '#888' }}>
        选中：{selectedKeys.join(', ') || '（无）'}
      </div>
    </div>
  );
};

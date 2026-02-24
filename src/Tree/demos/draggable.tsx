/**
 * title: " "
 * description: 拖拽节点可调整树的结构。拖到节点上方/下方插入为兄弟节点，拖到中间区域插入为子节点。
 */
import React, { useState } from 'react';
import { Tree } from 'aeroui';
import type { TreeNodeData, DropInfo } from 'aeroui';

const initialData: TreeNodeData[] = [
  {
    key: '1',
    title: '总公司',
    children: [
      {
        key: '1-1',
        title: '技术部',
        children: [
          { key: '1-1-1', title: '前端组' },
          { key: '1-1-2', title: '后端组' },
          { key: '1-1-3', title: '测试组' },
        ],
      },
      {
        key: '1-2',
        title: '产品部',
        children: [
          { key: '1-2-1', title: '产品设计' },
          { key: '1-2-2', title: '用户研究' },
        ],
      },
      { key: '1-3', title: '行政部' },
    ],
  },
];

export default () => {
  const [data, setData] = useState(initialData);

  const handleDrop = (info: DropInfo) => {
    setData(info.treeData);
  };

  return (
    <Tree.Draggable
      treeData={data}
      defaultExpandAll
      onDrop={handleDrop}
    />
  );
};

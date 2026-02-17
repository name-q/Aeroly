/**
 * title: " "
 * description: Drag nodes to rearrange the tree structure. Drag above/below a node to insert as a sibling, drag to the middle to insert as a child.
 */
import React, { useState } from 'react';
import { Tree } from 'aero-ui';
import type { TreeNodeData, DropInfo } from 'aero-ui';

const initialData: TreeNodeData[] = [
  {
    key: '1',
    title: 'Headquarters',
    children: [
      {
        key: '1-1',
        title: 'Engineering',
        children: [
          { key: '1-1-1', title: 'Frontend Team' },
          { key: '1-1-2', title: 'Backend Team' },
          { key: '1-1-3', title: 'QA Team' },
        ],
      },
      {
        key: '1-2',
        title: 'Product',
        children: [
          { key: '1-2-1', title: 'Product Design' },
          { key: '1-2-2', title: 'User Research' },
        ],
      },
      { key: '1-3', title: 'Administration' },
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

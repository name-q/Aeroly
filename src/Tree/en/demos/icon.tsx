/**
 * title: " "
 * description: Customize icons via the node's `icon` property. Set `showIcon` to enable display.
 */
import React from 'react';
import { Tree } from 'aero-ui';
import { Folder, FileText, Image, FileCode } from 'lucide-react';

const treeData = [
  {
    key: 'project',
    title: 'my-project',
    icon: <Folder size={14} />,
    children: [
      {
        key: 'src',
        title: 'src',
        icon: <Folder size={14} />,
        children: [
          { key: 'app', title: 'App.tsx', icon: <FileCode size={14} /> },
          { key: 'index', title: 'index.ts', icon: <FileCode size={14} /> },
        ],
      },
      { key: 'readme', title: 'README.md', icon: <FileText size={14} /> },
      { key: 'logo', title: 'logo.png', icon: <Image size={14} /> },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} showIcon defaultExpandAll />
);

/**
 * title: " "
 * description: hover 触发下拉菜单，支持图标、禁用项和分割线。
 */
import React from 'react';
import { Dropdown, Button } from 'aeroly';
import { Copy, Pencil, Trash2, Share2, Archive } from 'lucide-react';

const items = [
  { key: 'edit', label: '编辑', icon: Pencil },
  { key: 'copy', label: '复制', icon: Copy },
  { key: 'share', label: '分享', icon: Share2 },
  { key: 'divider1', type: 'divider' as const },
  { key: 'archive', label: '归档', icon: Archive, disabled: true },
  { key: 'delete', label: '删除', icon: Trash2, danger: true },
];

export default () => {
  return (
    <Dropdown
      items={items}
      onSelect={(key) => console.log('选中:', key)}
    >
      <Button>更多操作</Button>
    </Dropdown>
  );
};

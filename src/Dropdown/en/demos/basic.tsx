/**
 * title: " "
 * description: Hover to trigger dropdown menu, with support for icons, disabled items, and dividers.
 */
import React from 'react';
import { Dropdown, Button } from 'aeroui';
import { Copy, Pencil, Trash2, Share2, Archive } from 'lucide-react';

const items = [
  { key: 'edit', label: 'Edit', icon: Pencil },
  { key: 'copy', label: 'Copy', icon: Copy },
  { key: 'share', label: 'Share', icon: Share2 },
  { key: 'divider1', type: 'divider' as const },
  { key: 'archive', label: 'Archive', icon: Archive, disabled: true },
  { key: 'delete', label: 'Delete', icon: Trash2, danger: true },
];

export default () => {
  return (
    <Dropdown
      items={items}
      onSelect={(key) => console.log('Selected:', key)}
    >
      <Button>More Actions</Button>
    </Dropdown>
  );
};

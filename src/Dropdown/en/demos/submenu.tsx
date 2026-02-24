/**
 * title: " "
 * description: Supports nested submenus that auto-expand on hover.
 */
import React from 'react';
import { Dropdown, Button } from 'aeroui';
import { FileText, Download, FileImage, FileSpreadsheet, Printer, Mail } from 'lucide-react';
import type { DropdownItem } from 'aeroui';

const items: DropdownItem[] = [
  {
    key: 'export',
    label: 'Export',
    icon: Download,
    children: [
      { key: 'pdf', label: 'PDF Document', icon: FileText },
      { key: 'png', label: 'PNG Image', icon: FileImage },
      { key: 'excel', label: 'Excel Spreadsheet', icon: FileSpreadsheet },
    ],
  },
  { key: 'print', label: 'Print', icon: Printer },
  { key: 'divider1', type: 'divider' },
  { key: 'email', label: 'Send Email', icon: Mail },
];

export default () => {
  return (
    <Dropdown
      items={items}
      onSelect={(key) => console.log('Selected:', key)}
    >
      <Button>File Actions</Button>
    </Dropdown>
  );
};

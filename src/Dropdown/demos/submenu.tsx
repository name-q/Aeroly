/**
 * title: " "
 * description: 支持子菜单嵌套，hover 自动展开。
 */
import React from 'react';
import { Dropdown, Button } from 'aeroui';
import { FileText, Download, FileImage, FileSpreadsheet, Printer, Mail } from 'lucide-react';
import type { DropdownItem } from 'aeroui';

const items: DropdownItem[] = [
  {
    key: 'export',
    label: '导出',
    icon: Download,
    children: [
      { key: 'pdf', label: 'PDF 文档', icon: FileText },
      { key: 'png', label: 'PNG 图片', icon: FileImage },
      { key: 'excel', label: 'Excel 表格', icon: FileSpreadsheet },
    ],
  },
  { key: 'print', label: '打印', icon: Printer },
  { key: 'divider1', type: 'divider' },
  { key: 'email', label: '发送邮件', icon: Mail },
];

export default () => {
  return (
    <Dropdown
      items={items}
      onSelect={(key) => console.log('选中:', key)}
    >
      <Button>文件操作</Button>
    </Dropdown>
  );
};

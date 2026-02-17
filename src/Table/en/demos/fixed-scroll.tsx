/**
 * title: " "
 * description: Set `scroll.y` to limit table height with `sticky` header pinning. Supports multiple `fixed: 'left'` / `fixed: 'right'` columns with boundary shadows on scroll.
 */
import React from 'react';
import { Table, Button, Tag, Flex } from 'aero-ui';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80, fixed: 'left' as const },
  { title: 'Name', dataIndex: 'name', width: 120, fixed: 'left' as const },
  { title: 'Type', dataIndex: 'type', width: 100 },
  { title: 'Status', dataIndex: 'status', width: 100, render: (v: string) => (
    <Tag type={v === 'active' ? 'success' : 'default'} size="small">
      {v === 'active' ? 'Active' : 'Inactive'}
    </Tag>
  )},
  { title: 'Creator', dataIndex: 'creator', width: 100 },
  { title: 'Created At', dataIndex: 'createdAt', width: 180 },
  { title: 'Updated At', dataIndex: 'updatedAt', width: 180 },
  { title: 'Remark', dataIndex: 'remark', width: 200, ellipsis: true },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'statusTag',
    width: 80,
    fixed: 'right' as const,
    render: (v: string) => (
      <Tag type={v === 'active' ? 'success' : 'default'} size="small">
        {v === 'active' ? 'Active' : 'Inactive'}
      </Tag>
    ),
  },
  {
    title: 'Actions',
    key: 'action',
    width: 120,
    fixed: 'right' as const,
    render: () => (
      <Flex gap="xs">
        <Button size="small" type="text">Edit</Button>
        <Button size="small" type="text">Delete</Button>
      </Flex>
    ),
  },
];

const dataSource = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  type: i % 3 === 0 ? 'Type A' : i % 3 === 1 ? 'Type B' : 'Type C',
  status: i % 4 === 0 ? 'inactive' : 'active',
  creator: `User ${(i % 5) + 1}`,
  createdAt: '2024-01-15 10:30:00',
  updatedAt: '2024-06-20 14:22:00',
  remark: `This is the remark for item ${i + 1}, which may be long enough to require ellipsis`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ y: 400 }}
    sticky
    pagination={{
      defaultPageSize: 50,
      showTotal: (total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`,
    }}
  />
);

/**
 * title: " "
 * description: 设置 `scroll.y` 限制表格高度，配合 `sticky` 表头吸顶；支持多列 `fixed: 'left'` / `fixed: 'right'` 固定，滚动时显示边界阴影。
 */
import React from 'react';
import { Table, Button, Tag, Flex } from 'aeroly';

const columns = [
  { title: '编号', dataIndex: 'id', width: 80, fixed: 'left' as const },
  { title: '名称', dataIndex: 'name', width: 120, fixed: 'left' as const },
  { title: '类型', dataIndex: 'type', width: 100 },
  { title: '状态', dataIndex: 'status', width: 100, render: (v: string) => (
    <Tag type={v === 'active' ? 'success' : 'default'} size="small">
      {v === 'active' ? '启用' : '停用'}
    </Tag>
  )},
  { title: '创建人', dataIndex: 'creator', width: 100 },
  { title: '创建时间', dataIndex: 'createdAt', width: 180 },
  { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
  { title: '备注', dataIndex: 'remark', width: 200, ellipsis: true },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'statusTag',
    width: 80,
    fixed: 'right' as const,
    render: (v: string) => (
      <Tag type={v === 'active' ? 'success' : 'default'} size="small">
        {v === 'active' ? '启用' : '停用'}
      </Tag>
    ),
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    fixed: 'right' as const,
    render: () => (
      <Flex gap="xs">
        <Button size="small" type="text">编辑</Button>
        <Button size="small" type="text">删除</Button>
      </Flex>
    ),
  },
];

const dataSource = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`,
  type: i % 3 === 0 ? 'A 类' : i % 3 === 1 ? 'B 类' : 'C 类',
  status: i % 4 === 0 ? 'inactive' : 'active',
  creator: `用户${(i % 5) + 1}`,
  createdAt: '2024-01-15 10:30:00',
  updatedAt: '2024-06-20 14:22:00',
  remark: `这是第 ${i + 1} 条数据的备注信息，可能会比较长需要省略显示`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ y: 400 }}
    sticky
    pagination={{
      defaultPageSize: 50,
      showTotal: (total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
    }}
  />
);

/**
 * title: " "
 * description: 数据项中包含 `children` 字段时自动支持展开行，适用于 SPU/SKU 等父子关联场景。通过 `defaultExpandedRowKeys` 设置默认展开项，或用 `expandedRowKeys` + `onExpandedRowsChange` 受控管理。
 */
import React from 'react';
import { Table, Tag, Button, Flex } from 'aeroui';

const columns = [
  { title: '编号', dataIndex: 'id', width: 100, fixed: 'left' as const },
  { title: '商品名称', dataIndex: 'name', width: 180, fixed: 'left' as const, align: 'left' as const },
  { title: '规格', dataIndex: 'spec', width: 120 },
  { title: '状态', dataIndex: 'status', width: 100, render: (v: string) => (
    <Tag type={v === 'active' ? 'success' : 'default'} size="small">
      {v === 'active' ? '在售' : '下架'}
    </Tag>
  )},
  { title: '库存', dataIndex: 'stock', width: 80 },
  { title: '价格', dataIndex: 'price', width: 100 },
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

const dataSource = [
  {
    id: 'SPU-1',
    name: '经典圆领T恤',
    spec: '3 个 SKU',
    status: 'active',
    stock: 150,
    price: '-',
    children: [
      { id: 'SKU-1-1', name: '经典圆领T恤', spec: '白色 / S', status: 'active', stock: 60, price: '¥89.00' },
      { id: 'SKU-1-2', name: '经典圆领T恤', spec: '白色 / M', status: 'active', stock: 50, price: '¥89.00' },
      { id: 'SKU-1-3', name: '经典圆领T恤', spec: '黑色 / L', status: 'inactive', stock: 40, price: '¥89.00' },
    ],
  },
  {
    id: 'SPU-2',
    name: '轻薄羽绒服',
    spec: '2 个 SKU',
    status: 'active',
    stock: 80,
    price: '-',
    children: [
      { id: 'SKU-2-1', name: '轻薄羽绒服', spec: '藏青 / M', status: 'active', stock: 45, price: '¥399.00' },
      { id: 'SKU-2-2', name: '轻薄羽绒服', spec: '灰色 / XL', status: 'active', stock: 35, price: '¥399.00' },
    ],
  },
  {
    id: 'SPU-3',
    name: '运动休闲裤',
    spec: '-',
    status: 'active',
    stock: 200,
    price: '¥159.00',
  },
  {
    id: 'SPU-4',
    name: '纯棉卫衣',
    spec: '2 个 SKU',
    status: 'inactive',
    stock: 0,
    price: '-',
    children: [
      { id: 'SKU-4-1', name: '纯棉卫衣', spec: '米白 / M', status: 'inactive', stock: 0, price: '¥199.00' },
      { id: 'SKU-4-2', name: '纯棉卫衣', spec: '烟灰 / L', status: 'inactive', stock: 0, price: '¥199.00' },
    ],
  },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    rowKey="id"
    defaultExpandedRowKeys={['SPU-1']}
    pagination={false}
  />
);

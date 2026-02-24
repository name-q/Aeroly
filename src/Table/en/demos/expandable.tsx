/**
 * title: " "
 * description: Data items with `children` field automatically support expandable rows, suitable for SPU/SKU parent-child scenarios. Use `defaultExpandedRowKeys` for default expansion, or `expandedRowKeys` + `onExpandedRowsChange` for controlled mode.
 */
import React from 'react';
import { Table, Tag, Button, Flex } from 'aeroly';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 100, fixed: 'left' as const },
  { title: 'Product Name', dataIndex: 'name', width: 180, fixed: 'left' as const, align: 'left' as const },
  { title: 'Spec', dataIndex: 'spec', width: 120 },
  { title: 'Status', dataIndex: 'status', width: 100, render: (v: string) => (
    <Tag type={v === 'active' ? 'success' : 'default'} size="small">
      {v === 'active' ? 'On Sale' : 'Off Shelf'}
    </Tag>
  )},
  { title: 'Stock', dataIndex: 'stock', width: 80 },
  { title: 'Price', dataIndex: 'price', width: 100 },
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

const dataSource = [
  {
    id: 'SPU-1',
    name: 'Classic Crew Neck T-Shirt',
    spec: '3 SKUs',
    status: 'active',
    stock: 150,
    price: '-',
    children: [
      { id: 'SKU-1-1', name: 'Classic Crew Neck T-Shirt', spec: 'White / S', status: 'active', stock: 60, price: '$12.99' },
      { id: 'SKU-1-2', name: 'Classic Crew Neck T-Shirt', spec: 'White / M', status: 'active', stock: 50, price: '$12.99' },
      { id: 'SKU-1-3', name: 'Classic Crew Neck T-Shirt', spec: 'Black / L', status: 'inactive', stock: 40, price: '$12.99' },
    ],
  },
  {
    id: 'SPU-2',
    name: 'Lightweight Down Jacket',
    spec: '2 SKUs',
    status: 'active',
    stock: 80,
    price: '-',
    children: [
      { id: 'SKU-2-1', name: 'Lightweight Down Jacket', spec: 'Navy / M', status: 'active', stock: 45, price: '$59.99' },
      { id: 'SKU-2-2', name: 'Lightweight Down Jacket', spec: 'Gray / XL', status: 'active', stock: 35, price: '$59.99' },
    ],
  },
  {
    id: 'SPU-3',
    name: 'Sport Casual Pants',
    spec: '-',
    status: 'active',
    stock: 200,
    price: '$22.99',
  },
  {
    id: 'SPU-4',
    name: 'Cotton Sweatshirt',
    spec: '2 SKUs',
    status: 'inactive',
    stock: 0,
    price: '-',
    children: [
      { id: 'SKU-4-1', name: 'Cotton Sweatshirt', spec: 'Cream / M', status: 'inactive', stock: 0, price: '$29.99' },
      { id: 'SKU-4-2', name: 'Cotton Sweatshirt', spec: 'Smoke Gray / L', status: 'inactive', stock: 0, price: '$29.99' },
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

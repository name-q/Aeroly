/**
 * title: " "
 * description: Set `bordered` to show borders and `striped` for zebra stripes.
 */
import React from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 20 + i * 3,
  address: `City ${i + 1} District`,
}));

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered striped pagination={false} />
);

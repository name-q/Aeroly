/**
 * title: " "
 * description: Basic table usage, rendered via `columns` and `dataSource`.
 */
import React from 'react';
import { Table } from 'aeroui';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = [
  { id: 1, name: 'John Smith', age: 28, address: 'West Lake District, Hangzhou' },
  { id: 2, name: 'Jane Doe', age: 32, address: 'Chaoyang District, Beijing' },
  { id: 3, name: 'Bob Wilson', age: 25, address: 'Pudong District, Shanghai' },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;

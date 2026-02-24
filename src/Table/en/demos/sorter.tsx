/**
 * title: " "
 * description: Column `sorter` enables sorting. Click the header to toggle ascending/descending/none.
 */
import React from 'react';
import { Table } from 'aeroui';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: 'Score',
    dataIndex: 'score',
    sorter: (a: any, b: any) => a.score - b.score,
    defaultSortOrder: 'descend' as const,
  },
];

const dataSource = [
  { id: 1, name: 'Alice', age: 28, score: 88 },
  { id: 2, name: 'Bob', age: 22, score: 95 },
  { id: 3, name: 'Charlie', age: 35, score: 72 },
  { id: 4, name: 'Diana', age: 26, score: 91 },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;

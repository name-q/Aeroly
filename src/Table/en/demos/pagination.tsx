/**
 * title: " "
 * description: Configure `pagination` to enable paging, with support for `showTotal`, `showSizeChanger`, etc.
 */
import React from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Description', dataIndex: 'desc' },
];

const dataSource = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  desc: `This is the description for item ${i + 1}`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{
      defaultPageSize: 5,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20],
    }}
  />
);

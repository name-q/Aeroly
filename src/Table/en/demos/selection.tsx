/**
 * title: " "
 * description: Configure `rowSelection` to enable row selection, supporting select-all and indeterminate states.
 */
import React, { useState } from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 22 + i * 2,
  address: `City ${i + 1} District`,
}));

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowSelection={{
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
      }}
    />
  );
};

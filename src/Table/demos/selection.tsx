/**
 * title: " "
 * description: 配置 `rowSelection` 开启行选择，支持全选和半选状态。
 */
import React, { useState } from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 22 + i * 2,
  address: `城市 ${i + 1} 区`,
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

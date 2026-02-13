/**
 * title: " "
 * description: 配置 `pagination` 开启分页，支持 `showTotal`、`showSizeChanger` 等。
 */
import React from 'react';
import { Table } from 'aero-ui';

const columns = [
  { title: '编号', dataIndex: 'id', width: 80 },
  { title: '名称', dataIndex: 'name' },
  { title: '描述', dataIndex: 'desc' },
];

const dataSource = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`,
  desc: `这是第 ${i + 1} 条数据的描述信息`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{
      defaultPageSize: 5,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
      showSizeChanger: true,
      pageSizeOptions: [5, 10, 20],
    }}
  />
);

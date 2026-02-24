/**
 * title: " "
 * description: 设置 `loading` 显示加载遮罩，数据请求中使用。
 */
import React, { useState } from 'react';
import { Table, Button, Flex } from 'aeroui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { id: 1, name: '张三', age: 28, address: '杭州市西湖区' },
  { id: 2, name: '李四', age: 32, address: '北京市朝阳区' },
  { id: 3, name: '王五', age: 25, address: '上海市浦东新区' },
];

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Flex direction="column" gap="md">
      <Table columns={columns} dataSource={dataSource} loading={loading} pagination={false} />
      <Flex>
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? '加载完成' : '重新加载'}
        </Button>
      </Flex>
    </Flex>
  );
};

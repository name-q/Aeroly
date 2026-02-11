/**
 * title: " "
 * description: 显示总数、每页条数切换、快速跳转。
 */
import React, { useState } from 'react';
import { Pagination } from 'aero-ui';

export default () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={256}
      showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
      showSizeChanger
      showQuickJumper
      onChange={(page, size) => {
        setCurrent(page);
        setPageSize(size);
      }}
    />
  );
};

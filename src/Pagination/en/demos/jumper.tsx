/**
 * title: " "
 * description: Show total count, page size changer, and quick jumper.
 */
import React, { useState } from 'react';
import { Pagination, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <ConfigProvider locale={enUS}>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={256}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        showSizeChanger
        showQuickJumper
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
      />
    </ConfigProvider>
  );
};

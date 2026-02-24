/**
 * title: " "
 * description: 设置 `trigger="click"` 改为点击触发，配合 `selectedKey` 高亮当前选中项。
 */
import React, { useState } from 'react';
import { Dropdown, Button } from 'aeroui';
import { SortAsc, ArrowUpAZ, ArrowDownAZ, Clock, Star } from 'lucide-react';

const items = [
  { key: 'name-asc', label: '名称 A-Z', icon: ArrowUpAZ },
  { key: 'name-desc', label: '名称 Z-A', icon: ArrowDownAZ },
  { key: 'time', label: '最近修改', icon: Clock },
  { key: 'star', label: '收藏优先', icon: Star },
];

export default () => {
  const [sort, setSort] = useState('time');

  return (
    <Dropdown
      items={items}
      trigger="click"
      selectedKey={sort}
      onSelect={setSort}
    >
      <Button icon={SortAsc}>排序方式</Button>
    </Dropdown>
  );
};

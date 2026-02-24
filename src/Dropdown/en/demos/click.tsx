/**
 * title: " "
 * description: Set `trigger="click"` to switch to click trigger, combined with `selectedKey` to highlight the current selection.
 */
import React, { useState } from 'react';
import { Dropdown, Button } from 'aeroui';
import { SortAsc, ArrowUpAZ, ArrowDownAZ, Clock, Star } from 'lucide-react';

const items = [
  { key: 'name-asc', label: 'Name A-Z', icon: ArrowUpAZ },
  { key: 'name-desc', label: 'Name Z-A', icon: ArrowDownAZ },
  { key: 'time', label: 'Recently Modified', icon: Clock },
  { key: 'star', label: 'Favorites First', icon: Star },
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
      <Button icon={SortAsc}>Sort By</Button>
    </Dropdown>
  );
};

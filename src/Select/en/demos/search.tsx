/**
 * title: " "
 * description: Set `showSearch` to enable search. A search input appears at the top of the dropdown panel. Supports custom filter logic.
 */
import React from 'react';
import { Select } from 'aeroui';

export default () => {
  const options = [
    { label: 'Beijing', value: 'beijing' },
    { label: 'Shanghai', value: 'shanghai' },
    { label: 'Guangzhou', value: 'guangzhou' },
    { label: 'Shenzhen', value: 'shenzhen' },
    { label: 'Hangzhou', value: 'hangzhou' },
    { label: 'Chengdu', value: 'chengdu' },
    { label: 'Wuhan', value: 'wuhan' },
    { label: 'Nanjing', value: 'nanjing' },
    { label: 'Chongqing', value: 'chongqing' },
    { label: 'Xi\'an', value: 'xian' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select
        options={options}
        showSearch
        placeholder="Search city"
        searchPlaceholder="Type to search..."
      />
      <Select
        options={options}
        showSearch
        multiple
        placeholder="Multi-select + Search"
        searchPlaceholder="Search..."
      />
    </div>
  );
};

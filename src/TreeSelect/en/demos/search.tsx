/**
 * title: " "
 * description: Set `showSearch` to enable search. Matching paths are auto-expanded and ancestor nodes are preserved.
 */
import React from 'react';
import { TreeSelect } from 'aeroly';

export default () => {
  const treeData = [
    {
      key: 'asia',
      title: 'Asia',
      children: [
        {
          key: 'china',
          title: 'China',
          children: [
            { key: 'beijing', title: 'Beijing' },
            { key: 'shanghai', title: 'Shanghai' },
            { key: 'guangzhou', title: 'Guangzhou' },
          ],
        },
        {
          key: 'japan',
          title: 'Japan',
          children: [
            { key: 'tokyo', title: 'Tokyo' },
            { key: 'osaka', title: 'Osaka' },
          ],
        },
      ],
    },
    {
      key: 'europe',
      title: 'Europe',
      children: [
        {
          key: 'uk',
          title: 'United Kingdom',
          children: [
            { key: 'london', title: 'London' },
          ],
        },
        {
          key: 'france',
          title: 'France',
          children: [
            { key: 'paris', title: 'Paris' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        showSearch
        placeholder="Search cities"
        searchPlaceholder="Type a keyword..."
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        showSearch
        multiple
        placeholder="Multiple + Search"
        searchPlaceholder="Search..."
        defaultExpandAll
      />
    </div>
  );
};

/**
 * title: " "
 * description: Set `showSearch` to enable search. Type keywords to quickly locate leaf paths.
 */
import React from 'react';
import { Cascader } from 'aeroui';

export default () => {
  const options = [
    {
      value: 'asia',
      label: 'Asia',
      children: [
        {
          value: 'china',
          label: 'China',
          children: [
            { value: 'beijing', label: 'Beijing' },
            { value: 'shanghai', label: 'Shanghai' },
            { value: 'guangzhou', label: 'Guangzhou' },
          ],
        },
        {
          value: 'japan',
          label: 'Japan',
          children: [
            { value: 'tokyo', label: 'Tokyo' },
            { value: 'osaka', label: 'Osaka' },
          ],
        },
      ],
    },
    {
      value: 'europe',
      label: 'Europe',
      children: [
        {
          value: 'uk',
          label: 'United Kingdom',
          children: [{ value: 'london', label: 'London' }],
        },
        {
          value: 'france',
          label: 'France',
          children: [{ value: 'paris', label: 'Paris' }],
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 320 }}>
      <Cascader
        options={options}
        showSearch
        placeholder="Search cities"
        searchPlaceholder="Type a keyword..."
      />
    </div>
  );
};

/**
 * title: " "
 * description: Add `onClick` to make tags clickable, suitable for filter tags.
 */
import React, { useState } from 'react';
import { Tag } from 'aero-ui';

const options = ['All', 'React', 'Vue', 'Angular', 'Svelte'];

export default () => {
  const [active, setActive] = useState('All');

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {options.map((opt) => (
        <Tag
          key={opt}
          type={active === opt ? 'info' : 'default'}
          round
          onClick={() => setActive(opt)}
        >
          {opt}
        </Tag>
      ))}
    </div>
  );
};

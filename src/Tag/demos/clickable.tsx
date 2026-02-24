/**
 * title: " "
 * description: 添加 `onClick` 使标签可点击，适合用作筛选标签。
 */
import React, { useState } from 'react';
import { Tag } from 'aeroly';

const options = ['全部', 'React', 'Vue', 'Angular', 'Svelte'];

export default () => {
  const [active, setActive] = useState('全部');

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

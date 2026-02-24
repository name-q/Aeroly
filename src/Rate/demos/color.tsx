/**
 * title: " "
 * description: 通过 `color` 自定义颜色，支持固定色或根据分值动态变色的函数。
 */
import React, { useState } from 'react';
import { Rate } from 'aeroly';

export default () => {
  const [val, setVal] = useState(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Rate defaultValue={3} color="#f5222d" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Rate
          value={val}
          onChange={setVal}
          color={(v) => (v <= 2 ? '#f5222d' : v <= 3 ? '#faad14' : '#52c41a')}
        />
        <span style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
          {val} 分
        </span>
      </div>
    </div>
  );
};

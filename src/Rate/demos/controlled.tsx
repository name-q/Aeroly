/**
 * title: " "
 * description: 通过 `value` 和 `onChange` 实现受控模式，实时显示当前评分。
 */
import React, { useState } from 'react';
import { Rate } from 'aeroui';

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Rate value={value} onChange={setValue} />
      <span style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        {value} 分
      </span>
    </div>
  );
};

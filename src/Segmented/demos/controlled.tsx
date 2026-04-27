/**
 * title: " "
 * description: 通过 `value` 和 `onChange` 实现受控模式。
 */
import React, { useState } from 'react';
import { Segmented } from 'aeroly';

const OPTIONS = [
  { value: 'January', label: '一月' },
  { value: 'February', label: '二月' },
  { value: 'March', label: '三月' },
];

export default () => {
  const [value, setValue] = useState<string | number>('February');

  return (
    <div>
      <Segmented
        options={OPTIONS}
        value={value}
        onChange={(v: string | number) => setValue(v)}
      />
      <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        当前选中：{value}
      </div>
    </div>
  );
};

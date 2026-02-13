/**
 * title: " "
 * description: 设置 `range` 开启范围选择，拖动两个滑块选择区间。
 */
import React, { useState } from 'react';
import { Slider } from 'aero-ui';

export default () => {
  const [value, setValue] = useState<[number, number]>([20, 60]);

  return (
    <div>
      <Slider range value={value} onChange={(v) => setValue(v as [number, number])} />
      <div style={{ marginTop: 8, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        区间：{value[0]} ~ {value[1]}
      </div>
    </div>
  );
};

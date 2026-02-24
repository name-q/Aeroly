/**
 * title: " "
 * description: 基础数字输入框，支持键盘上下键调整。
 */
import React, { useState } from 'react';
import { InputNumber } from 'aeroly';

export default () => {
  const [value, setValue] = useState<number | null>(3);

  return (
    <InputNumber
      value={value}
      onChange={setValue}
      min={1}
      max={100}
      placeholder="请输入数字"
    />
  );
};

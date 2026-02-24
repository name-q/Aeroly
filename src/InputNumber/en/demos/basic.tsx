/**
 * title: " "
 * description: Basic number input, supports keyboard up/down keys.
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
      placeholder="Enter a number"
    />
  );
};

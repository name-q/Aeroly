/**
 * title: " "
 * description: 设置 `optionType="button"` 切换为按钮样式，选中项用主色填充。
 */
import React, { useState } from 'react';
import { Radio } from 'aeroui';

export default () => {
  const [value, setValue] = useState<string | number>('beijing');

  return (
    <Radio.Group
      optionType="button"
      value={value}
      onChange={setValue}
      options={[
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' },
      ]}
    />
  );
};

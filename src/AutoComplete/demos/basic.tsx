/**
 * title: " "
 * description: 输入时自动过滤匹配选项，支持键盘上下选择和回车确认。
 */
import React, { useState } from 'react';
import { AutoComplete } from 'aeroly';

const allOptions = [
  { value: 'React' },
  { value: 'React Native' },
  { value: 'Redux' },
  { value: 'Vue' },
  { value: 'Vue Router' },
  { value: 'Vuex' },
  { value: 'Angular' },
  { value: 'Svelte' },
  { value: 'Next.js' },
  { value: 'Nuxt.js' },
  { value: 'TypeScript' },
];

export default () => {
  const [value, setValue] = useState('');

  return (
    <AutoComplete
      value={value}
      onChange={setValue}
      options={allOptions}
      placeholder="输入前端框架名称"
      allowClear
      style={{ maxWidth: 320 }}
    />
  );
};

/**
 * title: " "
 * description: Auto-filters matching options as you type, with keyboard up/down selection and Enter to confirm.
 */
import React, { useState } from 'react';
import { AutoComplete } from 'aeroui';

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
      placeholder="Type a frontend framework name"
      allowClear
      style={{ maxWidth: 320 }}
    />
  );
};

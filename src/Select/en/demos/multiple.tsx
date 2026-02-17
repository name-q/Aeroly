/**
 * title: " "
 * description: Set `multiple` to enable multi-select mode. Selected items are shown as tags; click the close button on a tag to remove it.
 */
import React from 'react';
import { Select } from 'aero-ui';

export default () => {
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Solid', value: 'solid' },
    { label: 'Preact', value: 'preact' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Select
        options={options}
        multiple
        placeholder="Select your favorite frameworks"
        defaultValue={['react', 'vue']}
      />
      <Select
        options={options}
        multiple
        allowClear
        maxTagCount={3}
        placeholder="Show up to 3 tags"
        defaultValue={['react', 'vue', 'angular', 'svelte']}
      />
    </div>
  );
};

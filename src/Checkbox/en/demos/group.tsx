/**
 * title: " "
 * description: Use `Checkbox.Group` to manage a group of checkboxes. Supports the `options` shorthand or nested `Checkbox` children.
 */
import React from 'react';
import { Checkbox } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Checkbox.Group
      options={['React', 'Vue', 'Angular', 'Svelte']}
      defaultValue={['React']}
      onChange={(val) => console.log('Selected:', val)}
    />
    <Checkbox.Group defaultValue={['ts']}>
      <Checkbox value="ts">TypeScript</Checkbox>
      <Checkbox value="js">JavaScript</Checkbox>
      <Checkbox value="rs">Rust</Checkbox>
    </Checkbox.Group>
  </div>
);

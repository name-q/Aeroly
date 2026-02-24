/**
 * title: " "
 * description: Use `Radio.Group` to manage a group of radio buttons. Supports the `options` shorthand or nested `Radio` children.
 */
import React from 'react';
import { Radio } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group
      options={['React', 'Vue', 'Angular', 'Svelte']}
      defaultValue="React"
      onChange={(val) => console.log('Selected:', val)}
    />
    <Radio.Group defaultValue="ts">
      <Radio value="ts">TypeScript</Radio>
      <Radio value="js">JavaScript</Radio>
      <Radio value="rs">Rust</Radio>
    </Radio.Group>
  </div>
);

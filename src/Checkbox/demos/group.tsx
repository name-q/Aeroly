/**
 * title: " "
 * description: 使用 `Checkbox.Group` 管理一组复选框，支持 `options` 快捷写法或嵌套 `Checkbox` 子元素。
 */
import React from 'react';
import { Checkbox } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Checkbox.Group
      options={['React', 'Vue', 'Angular', 'Svelte']}
      defaultValue={['React']}
      onChange={(val) => console.log('选中:', val)}
    />
    <Checkbox.Group defaultValue={['ts']}>
      <Checkbox value="ts">TypeScript</Checkbox>
      <Checkbox value="js">JavaScript</Checkbox>
      <Checkbox value="rs">Rust</Checkbox>
    </Checkbox.Group>
  </div>
);

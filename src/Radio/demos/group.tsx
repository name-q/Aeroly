/**
 * title: " "
 * description: 使用 `Radio.Group` 管理一组单选框，支持 `options` 快捷写法或嵌套 `Radio` 子元素。
 */
import React from 'react';
import { Radio } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group
      options={['React', 'Vue', 'Angular', 'Svelte']}
      defaultValue="React"
      onChange={(val) => console.log('选中:', val)}
    />
    <Radio.Group defaultValue="ts">
      <Radio value="ts">TypeScript</Radio>
      <Radio value="js">JavaScript</Radio>
      <Radio value="rs">Rust</Radio>
    </Radio.Group>
  </div>
);

/**
 * title: " "
 * description: 可以传入 ReactNode 作为提示内容。
 */
import React from 'react';
import { Tooltip, Button } from 'aero-ui';

export default () => (
  <Tooltip
    title={
      <div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>快捷键</div>
        <div>⌘ + S 保存</div>
        <div>⌘ + Z 撤销</div>
      </div>
    }
  >
    <Button>ReactNode 内容</Button>
  </Tooltip>
);

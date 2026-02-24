/**
 * title: " "
 * description: 鼠标移入触发，最基础的用法。
 */
import React from 'react';
import { Tooltip, Button } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Tooltip title="这是一段提示文字">
      <Button>鼠标移入</Button>
    </Tooltip>
    <Tooltip title="支持多行内容，会自动换行。当文字较长时 Tooltip 会自适应宽度，最大不超过 280px。">
      <Button>长文本</Button>
    </Tooltip>
  </div>
);

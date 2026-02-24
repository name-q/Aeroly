/**
 * title: " "
 * description: 通过 `autoSize` 对象限制最小和最大行数，超出后出现滚动条。
 */
import React from 'react';
import { TextArea } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea placeholder="最少 2 行，最多 6 行" autoSize={{ minRows: 2, maxRows: 6 }} />
    <TextArea placeholder="最少 3 行，无上限" autoSize={{ minRows: 3 }} />
  </div>
);

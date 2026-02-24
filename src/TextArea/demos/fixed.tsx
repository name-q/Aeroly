/**
 * title: " "
 * description: 关闭自适应，使用固定行数，可手动拖拽调整高度。
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea placeholder="固定 4 行，可拖拽调整" autoSize={false} rows={4} resize />
  </div>
);

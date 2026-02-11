/**
 * title: " "
 * description: 默认自适应内容高度，随输入自动增长。
 */
import React from 'react';
import { TextArea } from 'aero-ui';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea placeholder="输入内容，高度自动适应..." />
  </div>
);

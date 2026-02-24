/**
 * title: " "
 * description: 默认自适应内容高度，随输入自动增长。
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea placeholder="输入内容，高度自动适应..." />
  </div>
);

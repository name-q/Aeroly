/**
 * title: " "
 * description: 三种尺寸的分段控制器。
 */
import React from 'react';
import { Segmented } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Segmented options={['小', '中', '大']} size="small" defaultValue="小" />
    <Segmented options={['小', '中', '大']} size="medium" defaultValue="中" />
    <Segmented options={['小', '中', '大']} size="large" defaultValue="大" />
  </div>
);

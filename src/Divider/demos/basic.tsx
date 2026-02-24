/**
 * title: " "
 * description: 默认实线分割，可通过 `type` 切换为虚线 `dashed` 或两端渐隐 `fade`。
 */
import React from 'react';
import { Divider } from 'aeroly';

export default () => (
  <div>
    <p>实线（默认）</p>
    <Divider />
    <p>虚线</p>
    <Divider type="dashed" />
    <p>两端渐隐</p>
    <Divider type="fade" />
    <p>下方内容</p>
  </div>
);

/**
 * title: " "
 * description: 传入字符串数组实现多行水印，可自定义字体大小、颜色、旋转角度等。
 */
import React from 'react';
import { Watermark } from 'aeroly';

export default () => (
  <Watermark
    content={['Aeroly', '2026-02-14']}
    fontSize={16}
    rotate={-30}
    gap={[120, 120]}
    fontColor="red"
  >
    <div style={{ height: 300 }} />
  </Watermark>
);

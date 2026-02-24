/**
 * title: " "
 * description: 最简用法，传入 `content` 即可生成文字水印。
 */
import React from 'react';
import { Watermark } from 'aeroly';

export default () => (
  <Watermark content="Aeroly">
    <div style={{ height: 300 }} />
  </Watermark>
);

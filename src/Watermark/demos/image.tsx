/**
 * title: " "
 * description: 通过 `image` 传入图片地址作为水印，优先于文字。
 */
import React from 'react';
import { Watermark } from 'aero-ui';

export default () => (
  <Watermark
    image="https://picsum.photos/130/30"
    imageWidth={130}
    imageHeight={30}
  >
    <div style={{ height: 300 }} />
  </Watermark>
);

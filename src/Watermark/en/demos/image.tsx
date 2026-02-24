/**
 * title: " "
 * description: Pass an image URL via `image` as the watermark, which takes priority over text.
 */
import React from 'react';
import { Watermark } from 'aeroly';

export default () => (
  <Watermark
    image="https://picsum.photos/130/30"
    imageWidth={130}
    imageHeight={30}
  >
    <div style={{ height: 300 }} />
  </Watermark>
);

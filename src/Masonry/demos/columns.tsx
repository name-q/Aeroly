/**
 * title: " "
 * description: 通过 `columns` 设置固定列数。
 */
import React from 'react';
import { Masonry, Image } from 'aeroui';

const images = Array.from({ length: 12 }, (_, i) => ({
  src: `https://picsum.photos/400/${280 + (i % 5) * 40}?random=${i + 20}`,
  h: 280 + (i % 5) * 40,
}));

export default () => (
  <Masonry columns={4} gutter="lg">
    {images.map((img, i) => (
      <Image key={i} src={img.src} width="100%" height={img.h} borderRadius={8} />
    ))}
  </Masonry>
);

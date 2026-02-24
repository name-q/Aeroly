/**
 * title: " "
 * description: Set a fixed number of columns via `columns`.
 */
import React from 'react';
import { Masonry, Image } from 'aeroly';

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

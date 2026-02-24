/**
 * title: " "
 * description: Pass a responsive object to automatically switch column count at different screen widths. Try resizing the browser window.
 */
import React from 'react';
import { Masonry, Image } from 'aeroui';

const images = Array.from({ length: 12 }, (_, i) => ({
  src: `https://picsum.photos/400/${300 + (i % 4) * 50}?random=${i + 40}`,
  h: 300 + (i % 4) * 50,
}));

export default () => (
  <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} gutter="md">
    {images.map((img, i) => (
      <Image key={i} src={img.src} width="100%" height={img.h} borderRadius={8} />
    ))}
  </Masonry>
);

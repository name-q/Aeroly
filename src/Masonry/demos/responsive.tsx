/**
 * title: " "
 * description: 传入响应式对象，不同屏幕宽度自动切换列数。缩放浏览器窗口试试。
 */
import React from 'react';
import { Masonry, Image } from 'aeroly';

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

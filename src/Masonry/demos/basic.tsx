/**
 * title: " "
 * description: 默认 3 列瀑布流，使用 Image 组件展示不等高图片。
 */
import React from 'react';
import { Masonry, Image } from 'aero-ui';

const images = [
  { src: 'https://picsum.photos/400/300?random=1', h: 300 },
  { src: 'https://picsum.photos/400/500?random=2', h: 500 },
  { src: 'https://picsum.photos/400/350?random=3', h: 350 },
  { src: 'https://picsum.photos/400/420?random=4', h: 420 },
  { src: 'https://picsum.photos/400/280?random=5', h: 280 },
  { src: 'https://picsum.photos/400/460?random=6', h: 460 },
  { src: 'https://picsum.photos/400/320?random=7', h: 320 },
  { src: 'https://picsum.photos/400/380?random=8', h: 380 },
  { src: 'https://picsum.photos/400/440?random=9', h: 440 },
];

export default () => (
  <Masonry>
    {images.map((img, i) => (
      <Image key={i} src={img.src} width="100%" height={img.h} borderRadius={8} />
    ))}
  </Masonry>
);

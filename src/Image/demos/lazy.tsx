/**
 * title: " "
 * description: 设置 `lazy` 开启原生懒加载，图片进入视口时才开始加载。
 */
import React from 'react';
import { Image } from 'aero-ui';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600',
  'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600',
];

export default () => (
  <div style={{ height: 200, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
    {images.map((src, i) => (
      <Image key={i} src={src} alt={`懒加载 ${i + 1}`} width={280} height={160} lazy preview={false} />
    ))}
  </div>
);

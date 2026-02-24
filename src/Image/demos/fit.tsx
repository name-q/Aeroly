/**
 * title: " "
 * description: 通过 `fit` 设置图片适应方式，对应 CSS `object-fit`。
 */
import React from 'react';
import { Image } from 'aeroui';

const src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600';

const fits: Array<'contain' | 'cover' | 'fill' | 'none' | 'scale-down'> = [
  'cover', 'contain', 'fill', 'none', 'scale-down',
];

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    {fits.map((fit) => (
      <div key={fit} style={{ textAlign: 'center' }}>
        <Image src={src} alt={fit} width={120} height={120} fit={fit} preview={false} />
        <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>{fit}</div>
      </div>
    ))}
  </div>
);

/**
 * title: " "
 * description: Wrap multiple images with `Image.PreviewGroup` to navigate between them using arrow keys in preview.
 */
import React from 'react';
import { Image } from 'aeroui';

const images = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600',
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600',
];

export default () => (
  <Image.PreviewGroup>
    <div style={{ display: 'flex', gap: 12 }}>
      {images.map((src, i) => (
        <Image key={i} src={src} alt={`Image ${i + 1}`} width={140} height={100} />
      ))}
    </div>
  </Image.PreviewGroup>
);

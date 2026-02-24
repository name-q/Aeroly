/**
 * title: " "
 * description: Basic image display, supporting width, height, and border radius.
 */
import React from 'react';
import { Image } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <Image
      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
      alt="Landscape"
      width={240}
      height={160}
    />
    <Image
      src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"
      alt="Nature"
      width={160}
      height={160}
      borderRadius={999}
    />
  </div>
);

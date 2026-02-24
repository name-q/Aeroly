/**
 * title: " "
 * description: Displays fallback content when the image fails to load. Supports custom `fallback`.
 */
import React from 'react';
import { Image } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
    <div style={{ textAlign: 'center' }}>
      <Image
        src="https://broken-url.example/not-found.jpg"
        alt="Default fallback"
        width={160}
        height={120}
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>Default fallback</div>
    </div>
    <div style={{ textAlign: 'center' }}>
      <Image
        src="https://broken-url.example/not-found.jpg"
        alt="Custom fallback"
        width={160}
        height={120}
        fallback={
          <span style={{ fontSize: 13, color: '#999' }}>No image available</span>
        }
      />
      <div style={{ marginTop: 8, fontSize: 12, color: '#999' }}>Custom fallback</div>
    </div>
  </div>
);

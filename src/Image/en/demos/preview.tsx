/**
 * title: " "
 * description: Click the image to open a preview overlay with zoom and rotate support. Press Esc to close.
 */
import React from 'react';
import { Image } from 'aero-ui';

export default () => (
  <Image
    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
    previewSrc="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920"
    alt="Click to preview"
    width={280}
    height={180}
  />
);

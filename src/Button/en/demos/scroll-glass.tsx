/**
 * title: " "
 * description: Scroll the content through the fixed default button to see the blur and refraction change.
 */
import React from 'react';
import { Button } from 'aeroly';

const paragraphs = [
  'Scroll the content to move text through the glass button.',
  'The button keeps its size while the image and text move behind it.',
  'The transparent surface, edge light, and backdrop blur create the liquid glass effect.',
  'Button text keeps a clear contrast across light and dark themes.',
  'Keep scrolling to inspect the image, text, and edge light together.',
];

export default () => (
  <div
    style={{
      position: 'relative',
      height: 280,
      overflow: 'hidden',
      borderRadius: 16,
      backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      isolation: 'isolate',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.08)',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        padding: '24px 24px 180px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        color: '#fff',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.55,
      }}
    >
      {[...paragraphs, ...paragraphs].map((text, index) => (
        <p key={`${text}-${index}`} style={{ margin: 0 }}>
          {text}
        </p>
      ))}
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <Button pill style={{ minWidth: 132 }}>
          View details
        </Button>
      </div>
    </div>
  </div>
);

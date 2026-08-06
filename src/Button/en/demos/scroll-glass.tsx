/**
 * title: " "
 * description: Scroll the content through the fixed default button to see the blur and refraction change.
 */
import React from 'react';
import { Button } from 'aeroly';

const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';
const scrollItems = [
  { type: 'image', src: `${imageUrl}?auto=format&fit=crop&w=900&h=180&q=80`, alt: 'Mountain lake' },
  { type: 'text', text: 'Scroll the content to move images and text through the fixed glass button.' },
  { type: 'space' },
  { type: 'image', src: `${imageUrl}?auto=format&fit=crop&w=900&h=220&crop=entropy&q=80`, alt: 'Lakeside mountains' },
  { type: 'text', text: 'Watch the image details, text, and edge light pass through the glass surface.' },
] as const;

export default () => (
  <div
    style={{
      position: 'relative',
      height: 280,
      overflow: 'hidden',
      borderRadius: 16,
      background: '#102033',
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
      {[...scrollItems, ...scrollItems].map((item, index) => {
        if (item.type === 'image') {
          return <img key={`${item.type}-${index}`} src={item.src} alt={item.alt} style={{ display: 'block', width: '100%', height: 150, flexShrink: 0, objectFit: 'cover', borderRadius: 14 }} />;
        }
        if (item.type === 'space') {
          return <div key={`${item.type}-${index}`} aria-hidden="true" style={{ height: 72, flexShrink: 0 }} />;
        }
        return <p key={`${item.type}-${index}`} style={{ margin: 0 }}>{item.text}</p>;
      })}
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
        <Button glassDisplacement pill style={{ '--aero-lg-blur': '12px' } as React.CSSProperties}>
          View details
        </Button>
      </div>
    </div>
  </div>
);

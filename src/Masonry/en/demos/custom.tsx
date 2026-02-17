/**
 * title: " "
 * description: Not limited to images -- any variable-height content can use masonry layout.
 */
import React from 'react';
import { Masonry } from 'aero-ui';

const cards = [
  { title: 'Design System', desc: 'A unified design language and component library for consistent product experience.' },
  { title: 'Frosted Glass', desc: 'Achieve modern frosted glass visual effects with clear layering and translucent texture.' },
  { title: 'Responsive Layout', desc: 'Adapts to different screen sizes.' },
  { title: 'Dark Mode', desc: 'Built-in light and dark themes that auto-follow system preference, with manual control support.' },
  { title: 'Accessibility', desc: 'Follows WAI-ARIA standards, supports keyboard navigation and screen readers.' },
  { title: 'Animation', desc: 'Smooth, natural transition animations based on CSS transitions and cubic-bezier easing, no JS animation library required.' },
  { title: 'TypeScript', desc: 'Complete type definitions.' },
  { title: 'Tree Shaking', desc: 'Supports tree-shaking to only bundle used components, reducing bundle size.' },
];

const cardStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.3)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

export default () => (
  <Masonry columns={3} gutter="md">
    {cards.map((card, i) => (
      <div key={i} style={cardStyle}>
        <h4 style={{ margin: '0 0 8px' }}>{card.title}</h4>
        <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          {card.desc}
        </p>
      </div>
    ))}
  </Masonry>
);

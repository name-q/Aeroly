import React from 'react';
import { Carousel } from 'aero-ui';

const items = [
  { key: '1', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #0c3483, #a2b6df)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Fade 1</div> },
  { key: '2', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #764ba2, #667eea)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Fade 2</div> },
  { key: '3', children: <div style={{ height: 200, background: 'linear-gradient(135deg, #f5576c, #f093fb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24 }}>Fade 3</div> },
];

export default () => <Carousel items={items} effect="fade" />;

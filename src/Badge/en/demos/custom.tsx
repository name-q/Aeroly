/**
 * title: " "
 * description: Customize color via `color` and display content via `text`.
 */
import React from 'react';
import { Badge, Button } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
    <Badge color="#7c3aed" count={8}>
      <Button>Purple</Button>
    </Badge>
    <Badge color="#0891b2" count={3}>
      <Button>Cyan</Button>
    </Badge>
    <Badge text="NEW">
      <Button>Custom Text</Button>
    </Badge>
    <Badge text="HOT" color="#ea580c">
      <Button>Trending</Button>
    </Badge>
  </div>
);

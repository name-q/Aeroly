/**
 * title: " "
 * description: Solid line by default. Switch to dashed via `type="dashed"` or fade-out via `type="fade"`.
 */
import React from 'react';
import { Divider } from 'aero-ui';

export default () => (
  <div>
    <p>Solid (default)</p>
    <Divider />
    <p>Dashed</p>
    <Divider type="dashed" />
    <p>Fade</p>
    <Divider type="fade" />
    <p>Content below</p>
  </div>
);

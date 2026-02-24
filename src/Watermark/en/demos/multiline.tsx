/**
 * title: " "
 * description: Pass a string array for multi-line watermarks. Customize font size, color, rotation angle, etc.
 */
import React from 'react';
import { Watermark } from 'aeroly';

export default () => (
  <Watermark
    content={['AeroUI', '2026-02-14']}
    fontSize={16}
    rotate={-30}
    gap={[120, 120]}
    fontColor="red"
  >
    <div style={{ height: 300 }} />
  </Watermark>
);

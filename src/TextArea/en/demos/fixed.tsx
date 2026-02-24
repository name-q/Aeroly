/**
 * title: " "
 * description: Disable auto-resize and use fixed rows. Drag to manually adjust height.
 */
import React from 'react';
import { TextArea } from 'aeroui';

export default () => (
  <div style={{ maxWidth: 420 }}>
    <TextArea placeholder="Fixed 4 rows, drag to resize" autoSize={false} rows={4} resize />
  </div>
);

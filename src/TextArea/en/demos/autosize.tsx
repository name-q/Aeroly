/**
 * title: " "
 * description: Limit min and max rows via the `autoSize` object. A scrollbar appears when exceeded.
 */
import React from 'react';
import { TextArea } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea placeholder="Min 2 rows, max 6 rows" autoSize={{ minRows: 2, maxRows: 6 }} />
    <TextArea placeholder="Min 3 rows, no upper limit" autoSize={{ minRows: 3 }} />
  </div>
);

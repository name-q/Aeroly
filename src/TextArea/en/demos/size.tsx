/**
 * title: " "
 * description: Three sizes of textarea.
 */
import React from 'react';
import { TextArea } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
    <TextArea size="small" placeholder="Small" />
    <TextArea size="medium" placeholder="Medium (default)" />
    <TextArea size="large" placeholder="Large" />
  </div>
);

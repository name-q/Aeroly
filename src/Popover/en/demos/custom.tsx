/**
 * title: " "
 * description: `content` accepts any ReactNode for complex content.
 */
import React from 'react';
import { Popover, Button } from 'aero-ui';

const content = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
    <div style={{ fontWeight: 500 }}>User Info</div>
    <div style={{ fontSize: 13, color: '#666' }}>You can place any content here, such as forms, lists, images, etc.</div>
    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
      <Button size="small" type="primary">Confirm</Button>
      <Button size="small">Cancel</Button>
    </div>
  </div>
);

export default () => (
  <Popover content={content} trigger="click" placement="bottom">
    <Button>Rich Content</Button>
  </Popover>
);

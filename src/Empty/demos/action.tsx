import React from 'react';
import { Empty, Button } from 'aeroui';

export default () => (
  <Empty
    preset="networkError"
    extra={<Button onClick={() => window.location.reload()}>重新加载</Button>}
  />
);

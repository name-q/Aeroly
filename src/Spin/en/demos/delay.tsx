/**
 * title: " "
 * description: Set `delay` to delay showing the loading indicator, preventing flicker for short loading times.
 */
import React, { useState } from 'react';
import { Spin, Button, Alert } from 'aero-ui';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        style={{ marginBottom: 16 }}
      >
        Load for 3s (500ms delay)
      </Button>
      <Spin spinning={loading} delay={500} tip="Loading...">
        <Alert
          type="info"
          title="Delayed Loading"
          description="Spin will only appear after 500ms. If loading completes within 500ms, no flicker occurs."
        />
      </Spin>
    </div>
  );
};

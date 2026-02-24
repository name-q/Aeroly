/**
 * title: " "
 * description: When wrapping content, the loading state overlays a mask on top. Toggle the loading state with the button.
 */
import React, { useState } from 'react';
import { Spin, Button, Alert } from 'aeroly';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setLoading((v) => !v)} style={{ marginBottom: 16 }}>
        {loading ? 'Stop Loading' : 'Start Loading'}
      </Button>
      <Spin spinning={loading} tip="Loading...">
        <Alert
          type="info"
          title="Content Area"
          description="This is the content wrapped by Spin. When loading, a mask and centered indicator are shown, and the content contrast is reduced."
        />
      </Spin>
    </div>
  );
};

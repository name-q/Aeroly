/**
 * title: " "
 * description: Set `clickable` to allow clicking steps to switch, used with `onChange`.
 */
import React, { useState } from 'react';
import { Steps } from 'aero-ui';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      current={current}
      clickable
      onChange={setCurrent}
      items={[
        { title: 'Step 1', description: 'Fill in basic info' },
        { title: 'Step 2', description: 'Upload documents' },
        { title: 'Step 3', description: 'Confirm and submit' },
      ]}
    />
  );
};

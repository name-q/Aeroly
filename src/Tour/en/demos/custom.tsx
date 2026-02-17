import React, { useState } from 'react';
import { Button, Tour, ConfigProvider, enUS } from 'aero-ui';
import type { TourStepConfig } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-custom-target',
      title: 'Custom Content',
      content: (
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
            Tour supports fully custom content. You can put any ReactNode here.
          </p>
          <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 40 }}>🎉</div>
        </div>
      ),
    },
    {
      title: 'No Target Step',
      description: 'When no target is set, the popup is centered, suitable for welcome pages or summaries.',
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <span id="tour-custom-target">
          <Button onClick={() => setOpen(true)}>Custom Tour</Button>
        </span>
        <Tour open={open} onOpenChange={setOpen} steps={steps} />
      </div>
    </ConfigProvider>
  );
};

import React, { useState } from 'react';
import { Button, Tour, ConfigProvider, enUS } from 'aeroui';
import type { TourStepConfig } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-left',
      title: 'Direction Control',
      description: 'This step pops out from the left.',
      placement: 'left',
    },
    {
      target: '#tour-right',
      title: 'Right Side',
      description: 'This step pops out from the right.',
      placement: 'right',
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <div style={{ display: 'flex', gap: 120, justifyContent: 'center', marginBottom: 16 }}>
          <span id="tour-left"><Button>Left</Button></span>
          <span id="tour-right"><Button>Right</Button></span>
        </div>
        <Button onClick={() => setOpen(true)}>Start Tour</Button>
        <Tour open={open} onOpenChange={setOpen} steps={steps} />
      </div>
    </ConfigProvider>
  );
};

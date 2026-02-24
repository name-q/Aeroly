import React, { useState } from 'react';
import { Button, Tour, ConfigProvider, enUS } from 'aeroly';
import type { TourStepConfig } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '.tour-demo-sel-a',
      title: 'CSS Selector',
      description: 'Target elements via CSS selectors, no ref needed.',
    },
    {
      target: '.tour-demo-sel-b',
      title: 'Second Target',
      description: 'Also positioned via selector.',
      placement: 'right',
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <span className="tour-demo-sel-a"><Button>Target A</Button></span>
          <span className="tour-demo-sel-b"><Button>Target B</Button></span>
        </div>
        <Button onClick={() => setOpen(true)}>Selector Tour</Button>
        <Tour open={open} onOpenChange={setOpen} steps={steps} />
      </div>
    </ConfigProvider>
  );
};

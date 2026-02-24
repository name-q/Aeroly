import React, { useState } from 'react';
import { Button, Tour } from 'aeroui';
import type { TourStepConfig } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '.tour-demo-sel-a',
      title: 'CSS 选择器',
      description: '通过 CSS 选择器定位目标元素，无需 ref。',
    },
    {
      target: '.tour-demo-sel-b',
      title: '第二个目标',
      description: '同样通过选择器定位。',
      placement: 'right',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <span className="tour-demo-sel-a"><Button>目标 A</Button></span>
        <span className="tour-demo-sel-b"><Button>目标 B</Button></span>
      </div>
      <Button onClick={() => setOpen(true)}>选择器引导</Button>
      <Tour open={open} onOpenChange={setOpen} steps={steps} />
    </div>
  );
};

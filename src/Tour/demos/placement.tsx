import React, { useState } from 'react';
import { Button, Tour } from 'aeroly';
import type { TourStepConfig } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-left',
      title: '方向控制',
      description: '这个步骤从左侧弹出。',
      placement: 'left',
    },
    {
      target: '#tour-right',
      title: '右侧弹出',
      description: '这个步骤从右侧弹出。',
      placement: 'right',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 120, justifyContent: 'center', marginBottom: 16 }}>
        <span id="tour-left"><Button>左侧</Button></span>
        <span id="tour-right"><Button>右侧</Button></span>
      </div>
      <Button onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onOpenChange={setOpen} steps={steps} />
    </div>
  );
};

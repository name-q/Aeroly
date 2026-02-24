import React, { useState } from 'react';
import { Button, Tour } from 'aeroui';
import type { TourStepConfig } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-custom-target',
      title: '自定义内容',
      content: (
        <div>
          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#666' }}>
            Tour 支持完全自定义内容，你可以放入任何 ReactNode。
          </p>
          <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 40 }}>🎉</div>
        </div>
      ),
    },
    {
      title: '无目标步骤',
      description: '没有 target 时弹窗居中显示，适合做欢迎页或总结。',
    },
  ];

  return (
    <div>
      <span id="tour-custom-target">
        <Button onClick={() => setOpen(true)}>自定义引导</Button>
      </span>
      <Tour open={open} onOpenChange={setOpen} steps={steps} />
    </div>
  );
};

import React, { useState } from 'react';
import { Button, Tour } from 'aeroui';
import type { TourStepConfig } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-upload',
      title: '上传文件',
      description: '点击这里上传你的文件，支持拖拽。',
    },
    {
      target: '#tour-save',
      title: '保存草稿',
      description: '随时保存当前进度，下次继续编辑。',
      placement: 'bottom',
    },
    {
      target: '#tour-publish',
      title: '发布内容',
      description: '确认无误后点击发布，内容将对所有人可见。',
      placement: 'bottom',
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <span id="tour-upload"><Button>上传</Button></span>
        <span id="tour-save"><Button>保存</Button></span>
        <span id="tour-publish"><Button>发布</Button></span>
      </div>
      <Button onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onOpenChange={setOpen} steps={steps} />
    </div>
  );
};

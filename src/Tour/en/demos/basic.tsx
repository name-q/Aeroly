import React, { useState } from 'react';
import { Button, Tour, ConfigProvider, enUS } from 'aero-ui';
import type { TourStepConfig } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);

  const steps: TourStepConfig[] = [
    {
      target: '#tour-upload',
      title: 'Upload Files',
      description: 'Click here to upload your files, drag and drop supported.',
    },
    {
      target: '#tour-save',
      title: 'Save Draft',
      description: 'Save your current progress anytime and continue editing later.',
      placement: 'bottom',
    },
    {
      target: '#tour-publish',
      title: 'Publish Content',
      description: 'Once confirmed, click publish to make the content visible to everyone.',
      placement: 'bottom',
    },
  ];

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <span id="tour-upload"><Button>Upload</Button></span>
          <span id="tour-save"><Button>Save</Button></span>
          <span id="tour-publish"><Button>Publish</Button></span>
        </div>
        <Button onClick={() => setOpen(true)}>Start Tour</Button>
        <Tour open={open} onOpenChange={setOpen} steps={steps} />
      </div>
    </ConfigProvider>
  );
};

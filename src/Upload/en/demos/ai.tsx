import React from 'react';
import { Upload, Button, ConfigProvider, enUS } from 'aeroly';
import { Upload as UploadIcon } from 'lucide-react';
import type { UploadFile } from 'aeroly';

// Simulate AI image analysis
const analyzeImage = (_file: File): Promise<Partial<UploadFile>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tags = ['Landscape', 'Nature', 'HD'][Math.floor(Math.random() * 3)];
      resolve({
        aiMeta: {
          tags: [tags],
          description: `AI detected: This is a ${tags.toLowerCase()}-related image`,
        },
      });
    }, 800);
  });
};

export default () => {
  return (
    <ConfigProvider locale={enUS}>
    <Upload
      drag
      multiple
      accept="image/*"
      listType="picture"
      onProcess={async (uploadFile, originFile) => {
        return await analyzeImage(originFile);
      }}
      customRequest={({ file, onProgress, onSuccess }) => {
        let percent = 0;
        const timer = setInterval(() => {
          percent += Math.random() * 30;
          if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            onSuccess({ url: URL.createObjectURL(file) });
          }
          onProgress(Math.min(percent, 100));
        }, 300);
        return { abort: () => clearInterval(timer) };
      }}
      tip="AI auto-analyzes images after upload (simulated)"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Button icon={UploadIcon}>Select Images</Button>
        <span style={{ fontSize: 12, color: '#999' }}>Or drag here, AI will analyze automatically</span>
      </div>
    </Upload>
    </ConfigProvider>
  );
};

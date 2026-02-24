import React from 'react';
import { Upload, ConfigProvider, enUS } from 'aeroly';

export default () => {
  return (
    <ConfigProvider locale={enUS}>
    <Upload
      drag
      multiple
      customRequest={({ file, onProgress, onSuccess }) => {
        let percent = 0;
        const timer = setInterval(() => {
          percent += Math.random() * 25;
          if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            onSuccess({ url: URL.createObjectURL(file) });
          }
          onProgress(Math.min(percent, 100));
        }, 300);
        return { abort: () => clearInterval(timer) };
      }}
      tip="Any file format, up to 10MB per file"
    />
    </ConfigProvider>
  );
};

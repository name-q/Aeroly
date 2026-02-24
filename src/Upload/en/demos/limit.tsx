import React from 'react';
import { Upload, ConfigProvider, enUS } from 'aeroui';

export default () => {
  return (
    <ConfigProvider locale={enUS}>
    <Upload
      multiple
      maxCount={3}
      maxSize={5 * 1024 * 1024}
      accept=".pdf,.doc,.docx"
      customRequest={({ onProgress, onSuccess }) => {
        let percent = 0;
        const timer = setInterval(() => {
          percent += Math.random() * 30;
          if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            onSuccess();
          }
          onProgress(Math.min(percent, 100));
        }, 300);
        return { abort: () => clearInterval(timer) };
      }}
      tip="Up to 3 files, max 5MB each, PDF / Word supported"
    />
    </ConfigProvider>
  );
};

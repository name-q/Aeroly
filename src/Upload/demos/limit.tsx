import React from 'react';
import { Upload } from 'aeroui';

export default () => {
  return (
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
      tip="最多 3 个文件，单文件不超过 5MB，支持 PDF / Word"
    />
  );
};

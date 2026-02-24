import React from 'react';
import { Upload } from 'aeroly';

export default () => {
  return (
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
      tip="支持任意格式文件，单文件不超过 10MB"
    />
  );
};

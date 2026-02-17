import React from 'react';
import { Upload, ConfigProvider, enUS } from 'aero-ui';

export default () => {
  return (
    <ConfigProvider locale={enUS}>
    <Upload
      drag
      multiple
      accept="image/*"
      listType="picture"
      customRequest={({ file, onProgress, onSuccess }) => {
        let percent = 0;
        const timer = setInterval(() => {
          percent += Math.random() * 35;
          if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            onSuccess({ url: URL.createObjectURL(file) });
          }
          onProgress(Math.min(percent, 100));
        }, 250);
        return { abort: () => clearInterval(timer) };
      }}
      tip="Only JPG / PNG / GIF image formats supported"
    />
    </ConfigProvider>
  );
};

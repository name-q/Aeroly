import React, { useState } from 'react';
import { Upload } from 'aero-ui';
import type { UploadFile } from 'aero-ui';

const mockFiles: UploadFile[] = [
  { uid: '1', name: '项目方案.pdf', size: 2048000, type: 'application/pdf', status: 'success' },
  { uid: '2', name: '数据报表.xlsx', size: 512000, type: 'application/vnd.ms-excel', status: 'success' },
  { uid: '3', name: '上传失败的文件.zip', size: 10240000, type: 'application/zip', status: 'error', error: '网络超时' },
];

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>(mockFiles);

  return (
    <Upload
      fileList={fileList}
      onChange={setFileList}
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
    />
  );
};

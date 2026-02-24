import React, { useState } from 'react';
import { Upload, ConfigProvider, enUS } from 'aeroly';
import type { UploadFile } from 'aeroly';

const mockFiles: UploadFile[] = [
  { uid: '1', name: 'Project Proposal.pdf', size: 2048000, type: 'application/pdf', status: 'success' },
  { uid: '2', name: 'Data Report.xlsx', size: 512000, type: 'application/vnd.ms-excel', status: 'success' },
  { uid: '3', name: 'Failed Upload.zip', size: 10240000, type: 'application/zip', status: 'error', error: 'Network timeout' },
];

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>(mockFiles);

  return (
    <ConfigProvider locale={enUS}>
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
    </ConfigProvider>
  );
};

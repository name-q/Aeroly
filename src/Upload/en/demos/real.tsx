/**
 * title: " "
 * description: Connect to a local Koa server (localhost:3001) for real uploads. Server code is in the project root server/ directory.
 */
import React, { useState } from 'react';
import { Upload, Button, Tabs, Segmented, ConfigProvider, enUS } from 'aero-ui';
import { Upload as UploadIcon, Trash2 } from 'lucide-react';
import type { UploadFile, TabsVariant } from 'aero-ui';

const API = 'http://localhost:3001/api/upload';

// Real upload customRequest
const realRequest = ({ file, onProgress, onSuccess, onError }: any) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  formData.append('file', file);

  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      onProgress(Math.round((e.loaded / e.total) * 100));
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const res = JSON.parse(xhr.responseText);
        onSuccess(res.data);
      } catch {
        onSuccess();
      }
    } else {
      onError(new Error(`Upload failed (${xhr.status})`));
    }
  });

  xhr.addEventListener('error', () => onError(new Error('Network error')));
  xhr.addEventListener('abort', () => onError(new Error('Cancelled')));

  xhr.open('POST', API);
  xhr.send(formData);

  return { abort: () => xhr.abort() };
};

// ---- Image Upload Panel ----
const PicturePanel = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <Upload
      drag
      multiple
      accept="image/*"
      listType="picture"
      maxSize={10 * 1024 * 1024}
      maxCount={9}
      fileList={fileList}
      onChange={setFileList}
      customRequest={realRequest}
      tip="JPG / PNG / GIF supported, max 10MB each, up to 9 images"
    />
  );
};

// ---- Document Upload Panel ----
const DocPanel = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <Upload
      multiple
      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.md"
      maxSize={20 * 1024 * 1024}
      maxCount={5}
      fileList={fileList}
      onChange={setFileList}
      customRequest={realRequest}
      tip="PDF / Office / Text supported, max 20MB each, up to 5 files"
    />
  );
};

// ---- Free Upload Panel ----
const FreePanel = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  return (
    <Upload
      drag
      multiple
      maxSize={50 * 1024 * 1024}
      fileList={fileList}
      onChange={setFileList}
      customRequest={realRequest}
      onRemove={(file) => {
        // Also delete the file on the server
        if (file.url) {
          const filename = file.url.split('/').pop();
          fetch(`${API}/${filename}`, { method: 'DELETE' }).catch(() => {});
        }
      }}
      tip="Any format, max 50MB per file"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Button icon={UploadIcon}>Select files or drag here</Button>
        <span style={{ fontSize: 12, color: '#999' }}>Upload to local Koa server</span>
      </div>
    </Upload>
  );
};

export default () => {
  return (
    <ConfigProvider locale={enUS}>
    <Tabs
      items={[
        { key: 'picture', label: 'Image Upload', children: <PicturePanel /> },
        { key: 'doc', label: 'Document Upload', children: <DocPanel /> },
        { key: 'free', label: 'Free Upload', children: <FreePanel /> },
      ]}
    />
    </ConfigProvider>
  );
};

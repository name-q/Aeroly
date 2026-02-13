/**
 * title: " "
 * description: 连接本地 Koa 服务（localhost:3001）进行真实上传。服务端代码位于项目根目录 server/ 下。
 */
import React, { useState } from 'react';
import { Upload, Button, Tabs, Segmented } from 'aero-ui';
import { Upload as UploadIcon, Trash2 } from 'lucide-react';
import type { UploadFile, TabsVariant } from 'aero-ui';

const API = 'http://localhost:3001/api/upload';

// 真实上传 customRequest
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
      onError(new Error(`上传失败 (${xhr.status})`));
    }
  });

  xhr.addEventListener('error', () => onError(new Error('网络错误')));
  xhr.addEventListener('abort', () => onError(new Error('已取消')));

  xhr.open('POST', API);
  xhr.send(formData);

  return { abort: () => xhr.abort() };
};

// ---- 图片上传面板 ----
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
      tip="支持 JPG / PNG / GIF，单张不超过 10MB，最多 9 张"
    />
  );
};

// ---- 文档上传面板 ----
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
      tip="支持 PDF / Office / 文本，单文件不超过 20MB，最多 5 个"
    />
  );
};

// ---- 自由上传面板 ----
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
        // 同时删除服务端文件
        if (file.url) {
          const filename = file.url.split('/').pop();
          fetch(`${API}/${filename}`, { method: 'DELETE' }).catch(() => {});
        }
      }}
      tip="任意格式，单文件不超过 50MB"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <Button icon={UploadIcon}>选择文件或拖拽到此处</Button>
        <span style={{ fontSize: 12, color: '#999' }}>上传到本地 Koa 服务</span>
      </div>
    </Upload>
  );
};

export default () => {
  return (
    <Tabs
      items={[
        { key: 'picture', label: '图片上传', children: <PicturePanel /> },
        { key: 'doc', label: '文档上传', children: <DocPanel /> },
        { key: 'free', label: '自由上传', children: <FreePanel /> },
      ]}
    />
  );
};

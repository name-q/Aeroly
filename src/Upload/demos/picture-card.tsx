/**
 * title: " "
 * description: 横向卡片模式，hover 显示文件名（错误时追加原因）。预设了不同状态的文件用于演示。
 */
import React, { useState } from 'react';
import { Upload, Image } from 'aero-ui';
import type { UploadFile } from 'aero-ui';

const mockFiles: UploadFile[] = [
  {
    uid: 'demo-1',
    name: '风景照.jpg',
    type: 'image/jpeg',
    size: 1024 * 320,
    status: 'success',
    percent: 100,
    thumbUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&h=160&fit=crop',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
  },
  {
    uid: 'demo-2',
    name: '上传中的图片.png',
    type: 'image/png',
    size: 1024 * 580,
    status: 'uploading',
    percent: 45,
    thumbUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=160&h=160&fit=crop',
  },
  {
    uid: 'demo-3',
    name: '损坏的文件.jpg',
    type: 'image/jpeg',
    size: 1024 * 120,
    status: 'error',
    percent: 0,
    error: '文件大小超过限制（最大 100 KB）',
  },
];

export default () => {
  const [fileList, setFileList] = useState<UploadFile[]>(mockFiles);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const previewImages = fileList
    .filter((f) => f.status === 'success' && (f.url || f.thumbUrl))
    .map((f) => f.url || f.thumbUrl!);

  const handlePreview = (file: UploadFile) => {
    const src = file.url || file.thumbUrl;
    const idx = previewImages.indexOf(src!);
    setPreviewIndex(idx >= 0 ? idx : 0);
    setPreviewOpen(true);
  };

  return (
    <>
      <Upload
        accept="image/*"
        multiple
        maxCount={5}
        listType="picture-card"
        fileList={fileList}
        onChange={setFileList}
        onPreview={handlePreview}
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
        tip="最多 5 张，hover 卡片查看文件名和错误信息"
      />
      <Image.Preview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={previewImages}
        defaultCurrent={previewIndex}
      />
    </>
  );
};

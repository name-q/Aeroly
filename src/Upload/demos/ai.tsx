import React from 'react';
import { Upload, Button } from 'aero-ui';
import { Upload as UploadIcon } from 'lucide-react';
import type { UploadFile } from 'aero-ui';

// 模拟 AI 图片分析
const analyzeImage = (_file: File): Promise<Partial<UploadFile>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tags = ['风景', '自然', '高清'][Math.floor(Math.random() * 3)];
      resolve({
        aiMeta: {
          tags: [tags],
          description: `AI 识别：这是一张${tags}相关的图片`,
        },
      });
    }, 800);
  });
};

export default () => {
  return (
    <Upload
      drag
      multiple
      accept="image/*"
      listType="picture"
      onProcess={async (uploadFile, originFile) => {
        return await analyzeImage(originFile);
      }}
      customRequest={({ file, onProgress, onSuccess }) => {
        let percent = 0;
        const timer = setInterval(() => {
          percent += Math.random() * 30;
          if (percent >= 100) {
            percent = 100;
            clearInterval(timer);
            onSuccess({ url: URL.createObjectURL(file) });
          }
          onProgress(Math.min(percent, 100));
        }, 300);
        return { abort: () => clearInterval(timer) };
      }}
      tip="上传图片后 AI 自动分析标注（模拟）"
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <Button icon={UploadIcon}>选择图片</Button>
        <span style={{ fontSize: 12, color: '#999' }}>或拖拽到此区域，AI 将自动分析</span>
      </div>
    </Upload>
  );
};

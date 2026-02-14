/**
 * title: " "
 * description: 连接本地 Koa 服务（localhost:3001）进行真实上传，通过 `valuePropName="fileList"` 接入表单，校验必须上传 2 张图片。
 */
import React, { useState } from 'react';
import { Form, Upload, Button, Flex, Image } from 'aero-ui';
import type { UploadFile } from 'aero-ui';

const API = 'http://localhost:3001/api/upload';

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

export default () => {
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handlePreview = (file: UploadFile) => {
    const images = (form.getFieldValue('images') || [])
      .filter((f: UploadFile) => f.status === 'success' && (f.url || f.thumbUrl))
      .map((f: UploadFile) => f.url || f.thumbUrl!);
    const index = images.indexOf(file.url || file.thumbUrl);
    setPreviewImages(images);
    setPreviewIndex(index >= 0 ? index : 0);
    setPreviewOpen(true);
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{ images: [] }}
        onFinish={(values) => console.log('提交成功:', values)}
        onFinishFailed={(info) => console.log('校验失败:', info)}
        style={{ maxWidth: 480 }}
      >
      <Form.Item
        name="images"
        label="上传图片"
        valuePropName="fileList"
        rules={[
          {
            validator: (value) => {
              const files = (value || []).filter(
                (f: any) => f.status !== 'error',
              );
              if (files.length === 0) {
                throw new Error('请上传图片');
              }
              if (files.length < 2) {
                throw new Error('请上传 2 张图片');
              }
              if (files.length > 2) {
                throw new Error('最多上传 2 张图片');
              }
            },
          },
        ]}
      >
        <Upload
          accept="image/*"
          multiple
          maxCount={2}
          listType="picture-card"
          customRequest={realRequest}
          onPreview={handlePreview}
          tip="请上传 2 张图片（JPG / PNG），连接 localhost:3001"
        />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Flex>
      </Form.Item>
      </Form>
      <Image.Preview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={previewImages}
        defaultCurrent={previewIndex}
      />
    </>
  );
};

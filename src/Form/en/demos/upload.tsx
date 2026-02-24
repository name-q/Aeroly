/**
 * title: " "
 * description: Connects to a local Koa server (localhost:3001) for real uploads. Integrates with form via `valuePropName="fileList"`, validates that exactly 2 images are uploaded.
 */
import React, { useState } from 'react';
import { Form, Upload, Button, Flex, Image, ConfigProvider, enUS } from 'aeroui';
import type { UploadFile } from 'aeroui';

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
      onError(new Error(`Upload failed (${xhr.status})`));
    }
  });

  xhr.addEventListener('error', () => onError(new Error('Network error')));
  xhr.addEventListener('abort', () => onError(new Error('Cancelled')));

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
    <ConfigProvider locale={enUS}>
      <Form
        form={form}
        initialValues={{ images: [] }}
        onFinish={(values) => console.log('Submit success:', values)}
        onFinishFailed={(info) => console.log('Validation failed:', info)}
        style={{ maxWidth: 480 }}
      >
      <Form.Item
        name="images"
        label="Upload Images"
        valuePropName="fileList"
        rules={[
          {
            validator: (value) => {
              const files = (value || []).filter(
                (f: any) => f.status !== 'error',
              );
              if (files.length === 0) {
                throw new Error('Please upload images');
              }
              if (files.length < 2) {
                throw new Error('Please upload 2 images');
              }
              if (files.length > 2) {
                throw new Error('Maximum 2 images allowed');
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
          tip="Upload 2 images (JPG / PNG), connects to localhost:3001"
        />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Flex>
      </Form.Item>
      </Form>
      <Image.Preview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={previewImages}
        defaultCurrent={previewIndex}
      />
    </ConfigProvider>
  );
};

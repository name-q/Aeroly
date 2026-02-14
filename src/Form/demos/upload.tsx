/**
 * title: " "
 * description: 通过 `valuePropName="fileList"` 将 Upload 接入表单，配合自定义 `validator` 校验上传数量。
 */
import React from 'react';
import { Form, Upload, Button, Flex } from 'aero-ui';

export default () => {
  const [form] = Form.useForm();

  return (
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
          tip="请上传 2 张图片（JPG / PNG）"
        />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};

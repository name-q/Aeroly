/**
 * title: " "
 * description: 通过 `initialValues` 回显所有表单控件的值，模拟编辑页面从后端拉取数据后填充表单的场景。
 */
import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  DatePicker,
  DateRangePicker,
  Cascader,
  TreeSelect,
  AutoComplete,
  Upload,
  Image,
  Rate,
  Slider,
  Switch,
  Button,
  Flex,
} from 'aeroly';
import type { UploadFile } from 'aeroly';

const cityOptions = [
  { label: '北京', value: 'beijing' },
  { label: '上海', value: 'shanghai' },
  { label: '深圳', value: 'shenzhen' },
  { label: '杭州', value: 'hangzhou' },
];

const categoryOptions = [
  {
    label: '前端',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  {
    label: '后端',
    value: 'backend',
    children: [
      { label: 'Node.js', value: 'node' },
      { label: 'Go', value: 'go' },
    ],
  },
];

const treeData = [
  {
    key: 'dev',
    title: '研发部',
    children: [
      { key: 'fe', title: '前端组' },
      { key: 'be', title: '后端组' },
    ],
  },
  {
    key: 'design',
    title: '设计部',
    children: [
      { key: 'ui', title: 'UI 组' },
      { key: 'ux', title: 'UX 组' },
    ],
  },
];

const emailSuffixes = ['@gmail.com', '@qq.com', '@163.com', '@outlook.com', '@foxmail.com'];

const EmailAutoComplete: React.FC<{ form: any; [key: string]: any }> = ({ form, ...rest }) => {
  const emailVal = Form.useWatch('email', form) || '';
  const options = emailVal && !emailVal.includes('@')
    ? emailSuffixes.map((s) => ({ value: emailVal + s }))
    : [];
  return <AutoComplete options={options} filterOption={false} {...rest} />;
};

// 模拟后端返回的数据 — 用户 A
const dataA = {
  keyword: 'AeroUI',
  city: 'hangzhou',
  date: '2025-06-15',
  time: '09:30',
  dateRange: ['2025-06-01', '2025-06-30'],
  category: ['frontend', 'react'],
  dept: 'fe',
  age: 28,
  email: 'test@qq.com',
  score: 4,
  progress: 72,
  active: true,
  avatar: [
    {
      uid: 'a-1',
      name: '头像.jpg',
      type: 'image/jpeg',
      size: 1024 * 256,
      status: 'success' as const,
      percent: 100,
      thumbUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800',
    },
    {
      uid: 'a-2',
      name: '封面.jpg',
      type: 'image/jpeg',
      size: 1024 * 480,
      status: 'success' as const,
      percent: 100,
      thumbUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&h=160&fit=crop',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    },
  ] as UploadFile[],
};

// 模拟后端返回的数据 — 用户 B
const dataB = {
  keyword: 'GlassUI',
  city: 'beijing',
  date: '2024-12-25',
  time: '14:00',
  dateRange: ['2024-12-20', '2025-01-05'],
  category: ['backend', 'node'],
  dept: 'be',
  age: 35,
  email: 'admin@gmail.com',
  score: 5,
  progress: 100,
  active: false,
  avatar: [
    {
      uid: 'b-1',
      name: '风景.jpg',
      type: 'image/jpeg',
      size: 1024 * 620,
      status: 'success' as const,
      percent: 100,
      thumbUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=160&h=160&fit=crop',
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    },
  ] as UploadFile[],
};

export default () => {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState<'A' | 'B'>('A');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const switchData = (key: 'A' | 'B') => {
    setCurrent(key);
    form.setFieldsValue(key === 'A' ? dataA : dataB);
  };

  const handlePreview = (file: UploadFile) => {
    const files: UploadFile[] = form.getFieldValue('avatar') || [];
    const images = files
      .filter((f) => f.status === 'success' && (f.url || f.thumbUrl))
      .map((f) => f.url || f.thumbUrl!);
    const idx = images.indexOf(file.url || file.thumbUrl || '');
    setPreviewIndex(idx >= 0 ? idx : 0);
    setPreviewOpen(true);
  };

  const getPreviewImages = () => {
    const files: UploadFile[] = form.getFieldValue('avatar') || [];
    return files
      .filter((f) => f.status === 'success' && (f.url || f.thumbUrl))
      .map((f) => f.url || f.thumbUrl!);
  };

  return (
    <>
      <Form
        form={form}
        initialValues={dataA}
        layout="vertical"
        onFinish={(values) => console.log('提交:', values)}
        style={{ maxWidth: 520 }}
      >
        <Form.Item name="keyword" label="关键词" rules={[{ required: true }]}>
          <Input placeholder="请输入关键词" />
        </Form.Item>

        <Form.Item name="city" label="城市" rules={[{ required: true }]}>
          <Select placeholder="请选择" options={cityOptions} />
        </Form.Item>

        <Form.Item name="date" label="日期" rules={[{ required: true }]}>
          <DatePicker placeholder="选择日期" />
        </Form.Item>

        <Form.Item name="time" label="时间" rules={[{ required: true }]}>
          <TimePicker placeholder="选择时间" />
        </Form.Item>

        <Form.Item name="dateRange" label="日期范围" rules={[{ required: true }]}>
          <DateRangePicker />
        </Form.Item>

        <Form.Item name="category" label="分类" rules={[{ required: true }]}>
          <Cascader options={categoryOptions} placeholder="请选择分类" />
        </Form.Item>

        <Form.Item name="dept" label="部门" rules={[{ required: true }]}>
          <TreeSelect treeData={treeData} placeholder="请选择部门" />
        </Form.Item>

        <Form.Item name="age" label="年龄" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
        >
          <EmailAutoComplete form={form} placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item name="score" label="评分">
          <Rate />
        </Form.Item>

        <Form.Item name="progress" label="进度">
          <Slider />
        </Form.Item>

        <Form.Item name="active" label="启用">
          <Switch />
        </Form.Item>

        <Form.Item name="avatar" label="图片" valuePropName="fileList">
          <Upload
            accept="image/*"
            multiple
            maxCount={4}
            listType="picture-card"
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
            tip="最多 4 张图片"
          />
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">保存</Button>
            <Button onClick={() => switchData(current === 'A' ? 'B' : 'A')}>
              切换到用户 {current === 'A' ? 'B' : 'A'}
            </Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Flex>
        </Form.Item>
      </Form>

      <Image.Preview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={getPreviewImages()}
        defaultCurrent={previewIndex}
      />
    </>
  );
};

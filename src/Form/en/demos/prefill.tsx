/**
 * title: " "
 * description: Prefill all form controls via `initialValues`, simulating an edit page that populates the form with data fetched from the backend.
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
  ConfigProvider,
  enUS,
} from 'aeroui';
import type { UploadFile } from 'aeroui';

const cityOptions = [
  { label: 'Beijing', value: 'beijing' },
  { label: 'Shanghai', value: 'shanghai' },
  { label: 'Shenzhen', value: 'shenzhen' },
  { label: 'Hangzhou', value: 'hangzhou' },
];

const categoryOptions = [
  {
    label: 'Frontend',
    value: 'frontend',
    children: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
    ],
  },
  {
    label: 'Backend',
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
    title: 'Engineering',
    children: [
      { key: 'fe', title: 'Frontend Team' },
      { key: 'be', title: 'Backend Team' },
    ],
  },
  {
    key: 'design',
    title: 'Design',
    children: [
      { key: 'ui', title: 'UI Team' },
      { key: 'ux', title: 'UX Team' },
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

// Simulated backend data — User A
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
      name: 'avatar.jpg',
      type: 'image/jpeg',
      size: 1024 * 256,
      status: 'success' as const,
      percent: 100,
      thumbUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop',
      url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800',
    },
    {
      uid: 'a-2',
      name: 'cover.jpg',
      type: 'image/jpeg',
      size: 1024 * 480,
      status: 'success' as const,
      percent: 100,
      thumbUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=160&h=160&fit=crop',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800',
    },
  ] as UploadFile[],
};

// Simulated backend data — User B
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
      name: 'landscape.jpg',
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
    <ConfigProvider locale={enUS}>
      <Form
        form={form}
        initialValues={dataA}
        layout="vertical"
        onFinish={(values) => console.log('Submit:', values)}
        style={{ maxWidth: 520 }}
      >
        <Form.Item name="keyword" label="Keyword" rules={[{ required: true }]}>
          <Input placeholder="Enter keyword" />
        </Form.Item>

        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Select placeholder="Select" options={cityOptions} />
        </Form.Item>

        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker placeholder="Select date" />
        </Form.Item>

        <Form.Item name="time" label="Time" rules={[{ required: true }]}>
          <TimePicker placeholder="Select time" />
        </Form.Item>

        <Form.Item name="dateRange" label="Date Range" rules={[{ required: true }]}>
          <DateRangePicker />
        </Form.Item>

        <Form.Item name="category" label="Category" rules={[{ required: true }]}>
          <Cascader options={categoryOptions} placeholder="Select category" />
        </Form.Item>

        <Form.Item name="dept" label="Department" rules={[{ required: true }]}>
          <TreeSelect treeData={treeData} placeholder="Select department" />
        </Form.Item>

        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <InputNumber placeholder="Enter" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <EmailAutoComplete form={form} placeholder="Enter email" />
        </Form.Item>

        <Form.Item name="score" label="Rating">
          <Rate />
        </Form.Item>

        <Form.Item name="progress" label="Progress">
          <Slider />
        </Form.Item>

        <Form.Item name="active" label="Active">
          <Switch />
        </Form.Item>

        <Form.Item name="avatar" label="Images" valuePropName="fileList">
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
            tip="Up to 4 images"
          />
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={() => switchData(current === 'A' ? 'B' : 'A')}>
              Switch to User {current === 'A' ? 'B' : 'A'}
            </Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Flex>
        </Form.Item>
      </Form>

      <Image.Preview
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        images={getPreviewImages()}
        defaultCurrent={previewIndex}
      />
    </ConfigProvider>
  );
};

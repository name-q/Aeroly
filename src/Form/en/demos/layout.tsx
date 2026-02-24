/**
 * title: " "
 * description: Supports `vertical` (default), `horizontal`, and `inline` layout modes. Inline mode supports expand/collapse, suitable for filter scenarios.
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
  Rate,
  Slider,
  Switch,
  Radio,
  Button,
  Flex,
  Icon,
  ConfigProvider,
  enUS,
} from 'aeroui';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

export default () => {
  const [form] = Form.useForm();
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'inline'>('inline');
  const [expanded, setExpanded] = useState(false);

  const isInline = layout === 'inline';

  return (
    <ConfigProvider locale={enUS}>
    <div>
      <Radio.Group
        value={layout}
        onChange={(val: string | number) => setLayout(val as any)}
        optionType="button"
        options={[
          { label: 'Vertical', value: 'vertical' },
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Inline', value: 'inline' },
        ]}
        style={{ marginBottom: 24 }}
      />

      <Form
        form={form}
        layout={layout}
        labelWidth={70}
        style={{ maxWidth: isInline ? undefined : 520 }}
        onFinish={(values: any) => console.log(values)}
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

        <Form.Item name="age" label="Age" rules={[{ required: true }]} hidden={isInline && !expanded}>
          <InputNumber placeholder="Enter" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter email' }, { type: 'email', message: 'Invalid email format' }]} hidden={isInline && !expanded}>
          <EmailAutoComplete form={form} placeholder="Enter email" />
        </Form.Item>

        <Form.Item name="score" label="Rating" hidden={isInline && !expanded}>
          <Rate />
        </Form.Item>

        <Form.Item name="progress" label="Progress" hidden={isInline && !expanded}>
          <Slider />
        </Form.Item>

        <Form.Item name="active" label="Active" hidden={isInline && !expanded}>
          <Switch />
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">Search</Button>
            {isInline && (
              <Button onClick={() => setExpanded(!expanded)}>
                <Flex gap={4} align="center">
                  {expanded ? 'Collapse' : 'Expand'}
                  <Icon icon={expanded ? ChevronUp : ChevronDown} size={14} />
                </Flex>
              </Button>
            )}
          </Flex>
        </Form.Item>
      </Form>
    </div>
    </ConfigProvider>
  );
};

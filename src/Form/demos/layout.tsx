/**
 * title: " "
 * description: 支持 `vertical`（默认）、`horizontal`、`inline` 三种布局模式。inline 模式下支持展开/收起，适合筛选场景。
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
} from 'aero-ui';
import { ChevronDown, ChevronUp } from 'lucide-react';

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

export default () => {
  const [form] = Form.useForm();
  const [layout, setLayout] = useState<'vertical' | 'horizontal' | 'inline'>('inline');
  const [expanded, setExpanded] = useState(false);

  const isInline = layout === 'inline';

  return (
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

        <Form.Item name="age" label="年龄" rules={[{ required: true }]} hidden={isInline && !expanded}>
          <InputNumber placeholder="请输入" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }]} hidden={isInline && !expanded}>
          <EmailAutoComplete form={form} placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item name="score" label="评分" hidden={isInline && !expanded}>
          <Rate />
        </Form.Item>

        <Form.Item name="progress" label="进度" hidden={isInline && !expanded}>
          <Slider />
        </Form.Item>

        <Form.Item name="active" label="启用" hidden={isInline && !expanded}>
          <Switch />
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">查询</Button>
            {isInline && (
              <Button onClick={() => setExpanded(!expanded)}>
                <Flex gap={4} align="center">
                  {expanded ? '收起' : '展开'}
                  <Icon icon={expanded ? ChevronUp : ChevronDown} size={14} />
                </Flex>
              </Button>
            )}
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};

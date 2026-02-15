/**
 * title: " "
 * description: 通过 `theme` 属性覆盖 CSS Variables，实现局部主题定制。切换主题色后，所有组件的主色调同步变化。
 */
import React, { useState } from 'react';
import {
  ConfigProvider,
  Button,
  Flex,
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  DateRangePicker,
  Segmented,
  Switch,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Tag,
  Badge,
  Steps,
  Tabs,
  Alert,
  Pagination,
  Spin,
  TextArea,
  AutoComplete,
  Upload,
  TreeSelect,
  Cascader,
  Tree,
} from 'aero-ui';

const themes = {
  default: undefined,
  orange: { 'primary-color': '#ff6a00' },
  purple: { 'primary-color': '#7c3aed' },
  green: { 'primary-color': '#10b981' },
};

type ThemeKey = keyof typeof themes;

const treeData = [
  {
    key: '1',
    title: '华东区',
    children: [
      { key: '1-1', title: '上海' },
      { key: '1-2', title: '杭州' },
    ],
  },
  {
    key: '2',
    title: '华南区',
    children: [
      { key: '2-1', title: '深圳' },
      { key: '2-2', title: '广州' },
    ],
  },
];

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波' },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
    ],
  },
];

export default () => {
  const [current, setCurrent] = useState<ThemeKey>('default');
  const [sliderVal, setSliderVal] = useState(40);

  return (
    <Flex direction="column" gap={20}>
      <Segmented
        value={current}
        onChange={(v) => setCurrent(v as ThemeKey)}
        options={[
          { label: '默认', value: 'default' },
          { label: '橙色', value: 'orange' },
          { label: '紫色', value: 'purple' },
          { label: '绿色', value: 'green' },
        ]}
      />

      <ConfigProvider theme={themes[current]}>
        <Flex direction="column" gap={20}>
          {/* Button */}
          <Flex gap={12} wrap align="center">
            <Button type="primary">主色按钮</Button>
            <Button>默认按钮</Button>
            <Button type="text">文本按钮</Button>
            <Button type="primary" loading>
              加载中
            </Button>
            <Button type="primary" disabled>
              禁用
            </Button>
          </Flex>

          {/* Input 类 */}
          <Flex gap={12} wrap align="center">
            <Input placeholder="输入框" style={{ width: 160 }} />
            <InputNumber defaultValue={10} style={{ width: 130 }} />
            <TextArea placeholder="文本域" style={{ width: 200 }} rows={1} />
            <AutoComplete
              placeholder="自动补全"
              options={[{ value: '选项一' }, { value: '选项二' }]}
              style={{ width: 160 }}
            />
          </Flex>

          {/* 选择器类 */}
          <Flex gap={12} wrap align="center">
            <Select
              defaultValue="apple"
              options={[
                { label: '苹果', value: 'apple' },
                { label: '香蕉', value: 'banana' },
                { label: '橙子', value: 'orange' },
              ]}
              style={{ width: 140 }}
            />
            <TreeSelect
              treeData={treeData}
              placeholder="树选择"
              style={{ width: 150 }}
            />
            <Cascader
              options={cascaderOptions}
              placeholder="级联选择"
              style={{ width: 160 }}
            />
            <DatePicker placeholder="日期选择" style={{ width: 160 }} />
            <TimePicker placeholder="时间选择" style={{ width: 140 }} />
            <DateRangePicker style={{ width: 260 }} />
          </Flex>

          {/* 开关 / 勾选 */}
          <Flex gap={20} wrap align="center">
            <Switch defaultChecked />
            <Checkbox defaultChecked>复选框</Checkbox>
            <Radio.Group
              defaultValue="a"
              options={[
                { label: '选项 A', value: 'a' },
                { label: '选项 B', value: 'b' },
              ]}
            />
          </Flex>

          {/* Slider / Rate */}
          <Flex gap={20} wrap align="center">
            <Slider
              value={sliderVal}
              onChange={setSliderVal}
              style={{ width: 200 }}
            />
            <Rate defaultValue={3} />
          </Flex>

          {/* Tag / Badge */}
          <Flex gap={12} wrap align="center">
            <Tag type="info">信息</Tag>
            <Tag type="success">成功</Tag>
            <Tag type="warning">警告</Tag>
            <Tag type="error">错误</Tag>
            <Badge count={5}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'var(--aero-border-color, rgba(0,0,0,0.06))',
                }}
              />
            </Badge>
            <Badge dot>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: 'var(--aero-border-color, rgba(0,0,0,0.06))',
                }}
              />
            </Badge>
          </Flex>

          {/* Alert */}
          <Flex direction="column" gap={8}>
            <Alert type="info">这是一条信息提示</Alert>
            <Alert type="success">操作成功完成</Alert>
            <Alert type="warning">请注意操作风险</Alert>
            <Alert type="error">操作失败，请重试</Alert>
          </Flex>

          {/* Upload */}
          <Upload drag />

          {/* TextArea */}
          <TextArea placeholder="请输入多行文本" rows={3} style={{ width: 360 }} />

          {/* Tree */}
          <Tree treeData={treeData} defaultExpandAll />

          {/* Steps */}
          <Steps
            current={2}
            items={[
              { title: '提交订单' },
              { title: '支付完成' },
              { title: '等待发货' },
            ]}
          />

          {/* Tabs */}
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: '1', label: '标签一', children: '标签一的内容' },
              { key: '2', label: '标签二', children: '标签二的内容' },
              { key: '3', label: '标签三', children: '标签三的内容' },
            ]}
          />

          {/* Pagination / Spin */}
          <Flex gap={20} wrap align="center">
            <Pagination total={100} defaultCurrent={1} />
          </Flex>

          <Flex gap={20} align="center">
            <Spin spinning />
            <span style={{ color: 'var(--aero-text-secondary, #999)', fontSize: 13 }}>
              Spin 加载动画
            </span>
          </Flex>
        </Flex>
      </ConfigProvider>
    </Flex>
  );
};

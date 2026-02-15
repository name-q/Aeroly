/**
 * title: " "
 * description: 通过 `theme` 属性覆盖 CSS Variables，实现局部主题定制。使用颜色选择器自由调整主色和状态色，拖动滑块调整圆角，切换全局尺寸，所有组件实时响应。
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
  Statistic,
  ColorPicker,
} from 'aero-ui';
import type { SizeType } from 'aero-ui';

const presets = {
  default: {
    'primary-color': '#50b8e7',
    'success-color': '#52c41a',
    'warning-color': '#faad14',
    'error-color': '#f5222d',
  },
  orange: {
    'primary-color': '#ff6a00',
    'success-color': '#22c55e',
    'warning-color': '#f59e0b',
    'error-color': '#ef4444',
  },
  purple: {
    'primary-color': '#7c3aed',
    'success-color': '#14b8a6',
    'warning-color': '#eab308',
    'error-color': '#e11d48',
  },
  green: {
    'primary-color': '#10b981',
    'success-color': '#84cc16',
    'warning-color': '#f97316',
    'error-color': '#dc2626',
  },
};

type PresetKey = keyof typeof presets;

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

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--aero-text-secondary, #666)',
  whiteSpace: 'nowrap',
};

const panelStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 10,
  background: 'rgba(0,0,0,0.02)',
  border: '1px solid rgba(0,0,0,0.06)',
};

export default () => {
  const [primary, setPrimary] = useState('#50b8e7');
  const [success, setSuccess] = useState('#52c41a');
  const [warning, setWarning] = useState('#faad14');
  const [error, setError] = useState('#f5222d');
  const [radius, setRadius] = useState(8);
  const [radiusLg, setRadiusLg] = useState(12);
  const [size, setSize] = useState<SizeType>('medium');
  const [sliderVal, setSliderVal] = useState(40);
  const [copied, setCopied] = useState(false);

  const applyPreset = (key: PresetKey) => {
    const p = presets[key];
    setPrimary(p['primary-color']);
    setSuccess(p['success-color']);
    setWarning(p['warning-color']);
    setError(p['error-color']);
  };

  const theme = {
    'primary-color': primary,
    'success-color': success,
    'warning-color': warning,
    'error-color': error,
    'border-radius': `${radius}px`,
    'border-radius-lg': `${radiusLg}px`,
  };

  const codeStr = `<ConfigProvider
  size="${size}"
  theme={{
    'primary-color': '${primary}',
    'success-color': '${success}',
    'warning-color': '${warning}',
    'error-color': '${error}',
    'border-radius': '${radius}px',
    'border-radius-lg': '${radiusLg}px',
  }}
>`;

  const handleCopy = () => {
    const ta = document.createElement('textarea');
    ta.value = codeStr;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Flex direction="column" gap={16}>
      {/* 控制面板 */}
      <Flex direction="column" gap={12} style={panelStyle}>
        {/* 预设 + 颜色 */}
        <Flex gap={16} wrap align="center">
          <Flex gap={8} align="center">
            <span style={labelStyle}>预设</span>
            <Segmented
              value="custom"
              onChange={(v: string) => {
                if (v !== 'custom') applyPreset(v as PresetKey);
              }}
              options={[
                { label: '默认', value: 'default' },
                { label: '橙色', value: 'orange' },
                { label: '紫色', value: 'purple' },
                { label: '绿色', value: 'green' },
              ]}
              size="small"
            />
          </Flex>
          <Flex gap={12} wrap align="center">
            <Flex gap={6} align="center">
              <span style={labelStyle}>主色</span>
              <ColorPicker value={primary} onChange={setPrimary} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>成功</span>
              <ColorPicker value={success} onChange={setSuccess} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>警告</span>
              <ColorPicker value={warning} onChange={setWarning} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>错误</span>
              <ColorPicker value={error} onChange={setError} size="small" />
            </Flex>
          </Flex>
        </Flex>

        {/* 尺寸 + 圆角 */}
        <Flex gap={16} wrap align="center">
          <Flex gap={8} align="center">
            <span style={labelStyle}>尺寸</span>
            <Segmented
              value={size}
              onChange={(v: string) => setSize(v as SizeType)}
              options={[
                { label: 'S', value: 'small' },
                { label: 'M', value: 'medium' },
                { label: 'L', value: 'large' },
              ]}
              size="small"
            />
          </Flex>
          <Flex gap={8} align="center" style={{ minWidth: 180 }}>
            <span style={labelStyle}>圆角</span>
            <Slider value={radius} onChange={setRadius} min={0} max={20} style={{ width: 100 }} />
            <span style={{ ...labelStyle, width: 32, textAlign: 'right' }}>{radius}px</span>
          </Flex>
          <Flex gap={8} align="center" style={{ minWidth: 180 }}>
            <span style={labelStyle}>大圆角</span>
            <Slider value={radiusLg} onChange={setRadiusLg} min={0} max={24} style={{ width: 100 }} />
            <span style={{ ...labelStyle, width: 32, textAlign: 'right' }}>{radiusLg}px</span>
          </Flex>
        </Flex>
      </Flex>

      {/* 代码预览 */}
      <div style={{ position: 'relative' }}>
        <pre
          style={{
            margin: 0,
            padding: '12px 16px',
            borderRadius: 10,
            background: 'rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.06)',
            fontSize: 12,
            lineHeight: 1.6,
            overflow: 'auto',
            color: 'var(--aero-text-color, #1a1a1a)',
          }}
        >
          <code>{codeStr}</code>
        </pre>
        <Button
          size="small"
          onClick={handleCopy}
          style={{ position: 'absolute', top: 8, right: 8 }}
        >
          {copied ? '已复制' : '复制'}
        </Button>
      </div>

      {/* 组件展示区 */}
      <ConfigProvider theme={theme} size={size}>
        <Flex direction="column" gap={20}>
          {/* Button */}
          <Flex gap={12} wrap align="center">
            <Button type="primary">主色按钮</Button>
            <Button>默认按钮</Button>
            <Button type="text">文本按钮</Button>
            <Button type="primary" loading>加载中</Button>
            <Button type="primary" disabled>禁用</Button>
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
            <TreeSelect treeData={treeData} placeholder="树选择" style={{ width: 150 }} />
            <Cascader options={cascaderOptions} placeholder="级联选择" style={{ width: 160 }} />
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
            <Slider value={sliderVal} onChange={setSliderVal} style={{ width: 200 }} />
            <Rate defaultValue={3} />
          </Flex>

          {/* Tag / Badge */}
          <Flex gap={12} wrap align="center">
            <Tag type="info">信息</Tag>
            <Tag type="success">成功</Tag>
            <Tag type="warning">警告</Tag>
            <Tag type="error">错误</Tag>
            <Badge count={5}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--aero-border-color, rgba(0,0,0,0.06))' }} />
            </Badge>
            <Badge dot>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--aero-border-color, rgba(0,0,0,0.06))' }} />
            </Badge>
          </Flex>

          {/* Alert */}
          <Flex direction="column" gap={8}>
            <Alert type="info">这是一条信息提示</Alert>
            <Alert type="success">操作成功完成</Alert>
            <Alert type="warning">请注意操作风险</Alert>
            <Alert type="error">操作失败，请重试</Alert>
          </Flex>

          {/* Statistic */}
          <Flex gap={24} wrap>
            <Statistic title="增长率" value="12.5%" status="success" />
            <Statistic title="错误率" value="3.2%" status="error" />
            <Statistic title="告警数" value={28} status="warning" />
          </Flex>

          {/* Input status */}
          <Flex gap={12} wrap align="center">
            <Input placeholder="错误状态" status="error" style={{ width: 160 }} />
            <Input placeholder="警告状态" status="warning" style={{ width: 160 }} />
            <Select
              placeholder="错误状态"
              status="error"
              options={[{ label: '选项', value: '1' }]}
              style={{ width: 140 }}
            />
          </Flex>

          {/* Upload */}
          <Upload drag />

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

          {/* Pagination */}
          <Pagination total={100} defaultCurrent={1} />

          {/* Spin */}
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

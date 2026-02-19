/**
 * title: " "
 * description: Override CSS Variables via the `theme` property for scoped theme customization. Use color pickers to adjust primary and status colors, drag sliders for border radius, switch global size — all components respond in real time.
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
  enUS
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
    title: 'East Region',
    children: [
      { key: '1-1', title: 'Shanghai' },
      { key: '1-2', title: 'Hangzhou' },
    ],
  },
  {
    key: '2',
    title: 'South Region',
    children: [
      { key: '2-1', title: 'Shenzhen' },
      { key: '2-2', title: 'Guangzhou' },
    ],
  },
];

const cascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      { value: 'hangzhou', label: 'Hangzhou' },
      { value: 'ningbo', label: 'Ningbo' },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      { value: 'nanjing', label: 'Nanjing' },
      { value: 'suzhou', label: 'Suzhou' },
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
  const [preset, setPreset] = useState<PresetKey>('default');
  const [sliderVal, setSliderVal] = useState(40);
  const [copied, setCopied] = useState(false);

  const applyPreset = (key: PresetKey) => {
    setPreset(key);
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
      {/* Control Panel */}
      <Flex direction="column" gap={12} style={panelStyle}>
        {/* Presets + Colors */}
        <Flex gap={16} wrap align="center">
          <Flex gap={8} align="center">
            <span style={labelStyle}>Preset</span>
            <Segmented
              value={preset}
              onChange={(v: string) => {
                applyPreset(v as PresetKey);
              }}
              options={[
                { label: 'Default', value: 'default' },
                { label: 'Orange', value: 'orange' },
                { label: 'Purple', value: 'purple' },
                { label: 'Green', value: 'green' },
              ]}
              size="small"
            />
          </Flex>
          <Flex gap={12} wrap align="center">
            <Flex gap={6} align="center">
              <span style={labelStyle}>Primary</span>
              <ColorPicker value={primary} onChange={(v: string) => { setPrimary(v); setPreset('' as PresetKey); }} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>Success</span>
              <ColorPicker value={success} onChange={(v: string) => { setSuccess(v); setPreset('' as PresetKey); }} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>Warning</span>
              <ColorPicker value={warning} onChange={(v: string) => { setWarning(v); setPreset('' as PresetKey); }} size="small" />
            </Flex>
            <Flex gap={6} align="center">
              <span style={labelStyle}>Error</span>
              <ColorPicker value={error} onChange={(v: string) => { setError(v); setPreset('' as PresetKey); }} size="small" />
            </Flex>
          </Flex>
        </Flex>

        {/* Size + Radius */}
        <Flex gap={16} wrap align="center">
          <Flex gap={8} align="center">
            <span style={labelStyle}>Size</span>
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
            <span style={labelStyle}>Radius</span>
            <Slider value={radius} onChange={setRadius} min={0} max={20} style={{ width: 100 }} />
            <span style={{ ...labelStyle, width: 32, textAlign: 'right' }}>{radius}px</span>
          </Flex>
          <Flex gap={8} align="center" style={{ minWidth: 180 }}>
            <span style={labelStyle}>Large Radius</span>
            <Slider value={radiusLg} onChange={setRadiusLg} min={0} max={24} style={{ width: 100 }} />
            <span style={{ ...labelStyle, width: 32, textAlign: 'right' }}>{radiusLg}px</span>
          </Flex>
        </Flex>
      </Flex>

      {/* Code Preview */}
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
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {/* Component Showcase */}
      <ConfigProvider theme={theme} size={size} locale={enUS}>
        <Flex direction="column" gap={20}>
          {/* Button */}
          <Flex gap={12} wrap align="center">
            <Button type="primary">Primary</Button>
            <Button type="primary" pill>Pill Button</Button>
            <Button>Default</Button>
            <Button type="text">Text</Button>
            <Button type="primary" loading>Loading</Button>
            <Button type="primary" disabled>Disabled</Button>
          </Flex>

          {/* Input */}
          <Flex gap={12} wrap align="center">
            <Input placeholder="Input" style={{ width: 160 }} />
            <InputNumber defaultValue={10} style={{ width: 130 }} />
            <TextArea placeholder="TextArea" style={{ width: 200 }} rows={1} />
            <AutoComplete
              placeholder="AutoComplete"
              options={[{ value: 'Option 1' }, { value: 'Option 2' }]}
              style={{ width: 160 }}
            />
          </Flex>

          {/* Selectors */}
          <Flex gap={12} wrap align="center">
            <Select
              defaultValue="apple"
              options={[
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Orange', value: 'orange' },
              ]}
              style={{ width: 140 }}
            />
            <TreeSelect treeData={treeData} placeholder="Tree Select" style={{ width: 150 }} />
            <Cascader options={cascaderOptions} placeholder="Cascader" style={{ width: 160 }} />
            <DatePicker placeholder="Date" style={{ width: 160 }} />
            <DatePicker placeholder="DateTime" showTime style={{ width: 200 }} />
            <TimePicker placeholder="Time" style={{ width: 140 }} />
            <DateRangePicker style={{ width: 260 }} />
            <DateRangePicker showTime style={{ width: 380 }} />
          </Flex>

          {/* Switch / Checkbox */}
          <Flex gap={20} wrap align="center">
            <Switch defaultChecked />
            <Checkbox defaultChecked>Checkbox</Checkbox>
            <Radio.Group
              defaultValue="a"
              options={[
                { label: 'Option A', value: 'a' },
                { label: 'Option B', value: 'b' },
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
            <Tag type="info">Info</Tag>
            <Tag type="success">Success</Tag>
            <Tag type="warning">Warning</Tag>
            <Tag type="error">Error</Tag>
            <Badge count={5}>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--aero-border-color, rgba(0,0,0,0.06))' }} />
            </Badge>
            <Badge dot>
              <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--aero-border-color, rgba(0,0,0,0.06))' }} />
            </Badge>
          </Flex>

          {/* Alert */}
          <Flex direction="column" gap={8}>
            <Alert type="info">This is an info message</Alert>
            <Alert type="success">Operation completed successfully</Alert>
            <Alert type="warning">Please be aware of the risks</Alert>
            <Alert type="error">Operation failed, please retry</Alert>
          </Flex>

          {/* Statistic */}
          <Flex gap={24} wrap>
            <Statistic title="Growth Rate" value="12.5%" status="success" />
            <Statistic title="Error Rate" value="3.2%" status="error" />
            <Statistic title="Warnings" value={28} status="warning" />
          </Flex>

          {/* Input status */}
          <Flex gap={12} wrap align="center">
            <Input placeholder="Error status" status="error" style={{ width: 160 }} />
            <Input placeholder="Warning status" status="warning" style={{ width: 160 }} />
            <Select
              placeholder="Error status"
              status="error"
              options={[{ label: 'Option', value: '1' }]}
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
              { title: 'Submit Order' },
              { title: 'Payment Done' },
              { title: 'Awaiting Shipment' },
            ]}
          />

          {/* Tabs */}
          <Tabs
            defaultActiveKey="1"
            items={[
              { key: '1', label: 'Tab 1', children: 'Content of Tab 1' },
              { key: '2', label: 'Tab 2', children: 'Content of Tab 2' },
              { key: '3', label: 'Tab 3', children: 'Content of Tab 3' },
            ]}
          />

          {/* Pagination */}
          <Pagination total={100} defaultCurrent={1} />

          {/* Spin */}
          <Flex gap={20} align="center">
            <Spin spinning />
            <span style={{ color: 'var(--aero-text-secondary, #999)', fontSize: 13 }}>
              Spin loading animation
            </span>
          </Flex>
        </Flex>
      </ConfigProvider>
    </Flex>
  );
};

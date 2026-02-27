import { describe, it, expect } from 'vitest';
import * as aeroly from '../index';

// All runtime (non-type) exports from src/index.ts
const EXPECTED_EXPORTS = [
  // ConfigProvider & locale
  'ConfigProvider',
  'zhCN',
  'enUS',
  // Components (default exports)
  'Icon',
  'Button',
  'Divider',
  'Flex',
  'Row',
  'Col',
  'Layout',
  'Segmented',
  'message',
  'Alert',
  'Drawer',
  'Modal',
  'Checkbox',
  'Radio',
  'Switch',
  'TimePicker',
  'Input',
  'DatePicker',
  'DateRangePicker',
  'TextArea',
  'Popover',
  'Tooltip',
  'Tree',
  'notification',
  'Tag',
  'Pagination',
  'Badge',
  'InputNumber',
  'Select',
  'TreeSelect',
  'ColorPicker',
  'Cascader',
  'Menu',
  'DemoBox',
  'Breadcrumb',
  'Rate',
  'Image',
  'Steps',
  'Masonry',
  'Tabs',
  'Slider',
  'Upload',
  'Descriptions',
  'Carousel',
  'Empty',
  'Statistic',
  'Table',
  'Tour',
  'Form',
  'Spin',
  'Skeleton',
  'Watermark',
  'QRCode',
  'Affix',
  'Dropdown',
  'AutoComplete',
  'FloatButton',
];

describe('exports integrity', () => {
  it.each(EXPECTED_EXPORTS)('exports "%s" and it is defined', (name) => {
    expect((aeroly as Record<string, unknown>)[name]).toBeDefined();
  });

  it('does not have unexpected exports', () => {
    const actual = Object.keys(aeroly).sort();
    const expected = [...EXPECTED_EXPORTS].sort();
    expect(actual).toEqual(expected);
  });
});

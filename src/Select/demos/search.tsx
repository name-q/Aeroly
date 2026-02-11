/**
 * title: " "
 * description: 设置 `showSearch` 开启搜索功能，在下拉面板顶部出现搜索框，支持自定义过滤逻辑。
 */
import React from 'react';
import { Select } from 'aero-ui';

export default () => {
  const options = [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
    { label: '深圳', value: 'shenzhen' },
    { label: '杭州', value: 'hangzhou' },
    { label: '成都', value: 'chengdu' },
    { label: '武汉', value: 'wuhan' },
    { label: '南京', value: 'nanjing' },
    { label: '重庆', value: 'chongqing' },
    { label: '西安', value: 'xian' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Select
        options={options}
        showSearch
        placeholder="搜索城市"
        searchPlaceholder="输入关键词..."
      />
      <Select
        options={options}
        showSearch
        multiple
        placeholder="多选 + 搜索"
        searchPlaceholder="搜索..."
      />
    </div>
  );
};

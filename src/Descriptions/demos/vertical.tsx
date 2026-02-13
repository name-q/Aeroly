/**
 * title: " "
 * description: 设置 `layout="vertical"` 使 label 和内容上下排列。
 */
import React from 'react';
import { Descriptions } from 'aero-ui';

export default () => (
  <Descriptions
    title="项目信息"
    layout="vertical"
    bordered
    items={[
      { label: '项目名称', children: 'AeroUI' },
      { label: '负责人', children: '张三' },
      { label: '状态', children: '进行中' },
      { label: '描述', children: '一个为 AI 编码而设计的 React UI 组件库，Aero 毛玻璃美学风格。', span: 2 },
      { label: '创建时间', children: '2024-01-01' },
    ]}
  />
);

---
title: Descriptions 描述列表
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Descriptions 描述列表

成组展示多个只读字段，常用于详情页。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 带边框

<code src="./demos/bordered.tsx"></code>

## 带操作

<code src="./demos/extra.tsx"></code>

## 垂直布局

<code src="./demos/vertical.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## API

### Descriptions

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| extra | 额外操作区（右上角） | `ReactNode` | - |
| items | 描述项列表 | `DescriptionsItem[]` | - |
| column | 每行列数 | `number` | `3` |
| layout | 布局方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| bordered | 是否显示边框 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| labelAlign | label 对齐方式 | `'left' \| 'right'` | `'left'` |
| colon | 是否显示冒号 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### DescriptionsItem

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| label | 标签名 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| span | 占据列数 | `number` | `1` |

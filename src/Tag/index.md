---
title: Tag 标签
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
---

# Tag 标签

进行标记和分类的小标签，支持多种类型、尺寸、可关闭、可点击。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 可关闭

<code src="./demos/closable.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 自定义颜色 / 胶囊 / 无边框

<code src="./demos/custom.tsx"></code>

## 可点击标签

<code src="./demos/clickable.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| children | 标签内容 | `ReactNode` | - |
| type | 类型 | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'small'` |
| closable | 是否可关闭 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | - |
| visible | 是否显示（受控） | `boolean` | - |
| color | 自定义颜色 | `string` | - |
| round | 胶囊形状 | `boolean` | `false` |
| bordered | 是否有边框 | `boolean` | `true` |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

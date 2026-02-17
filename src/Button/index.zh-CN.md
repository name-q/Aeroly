---
title: Button 按钮
order: 1
group:
  title: 通用
  order: 1
nav:
  title: 组件
  path: /components
toc: content
---

# Button 按钮

用于触发操作的交互元素，提供胶囊、主色、文本三种风格。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 图标按钮

<code src="./demos/icon.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 加载与禁用

<code src="./demos/loading.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 按钮类型 | `'primary' \| 'default' \| 'text'` | `'default'` |
| size | 按钮尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| pill | 是否保持胶囊圆角，默认跟随全局圆角 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| icon | 图标（Lucide 图标组件） | `LucideIcon` | - |
| onClick | 点击事件 | `(e: MouseEvent) => void` | - |
| htmlType | 原生 button type | `'button' \| 'submit' \| 'reset'` | `'button'` |
| children | 按钮内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

---
title: Flex 弹性布局
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
toc: content
---

# Flex 弹性布局

弹性布局组件，用于设置子元素之间的对齐和间距。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 纵向排列

<code src="./demos/vertical.tsx"></code>

## 对齐方式

<code src="./demos/justify.tsx"></code>

## 自动换行

<code src="./demos/wrap.tsx"></code>

## 弹性比例

<code src="./demos/flex.tsx"></code>

## API

Flex 默认水平排列、顶部对齐；`vertical` 时子元素默认横向拉伸。API 与 antd Flex 一致。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| vertical | 主轴方向是否垂直，即 `flex-direction: column` | `boolean` | `false` |
| orientation | 主轴方向，优先级高于 `vertical` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| wrap | 换行方式，`true` 等同 `'wrap'` | `boolean \| CSSProperties['flexWrap']` | `'nowrap'` |
| justify | 主轴对齐方式，即 `justify-content` | `CSSProperties['justifyContent']` | `normal` |
| align | 交叉轴对齐方式，即 `align-items` | `CSSProperties['alignItems']` | `normal` |
| flex | flex CSS 简写属性 | `CSSProperties['flex']` | - |
| gap | 子元素间距 | `'small' \| 'medium' \| 'large' \| string \| number` | - |
| component | 自定义元素类型 | `React.ElementType` | `'div'` |

其余 HTML 属性（`className`、`style`、`onClick` 等）透传到根元素。

### gap 预设

| 值 | 间距 |
|----|------|
| `small` | 8px |
| `medium` | 16px |
| `large` | 24px |

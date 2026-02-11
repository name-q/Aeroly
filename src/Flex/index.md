---
title: Flex 弹性布局
group:
  title: 布局
  order: 2
nav:
  title: 组件
  path: /components
---

# Flex 弹性布局

意图驱动的弹性布局组件。默认水平排列、垂直居中，用语义化 props 代替手写 flex CSS，让 AI 和人类都能一行搞定常见布局。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 纵向排列

<code src="./demos/vertical.tsx"></code>

## 主轴分布

<code src="./demos/justify.tsx"></code>

## 居中

<code src="./demos/center.tsx"></code>

## 自动换行

<code src="./demos/wrap.tsx"></code>

## 弹性比例

<code src="./demos/flex.tsx"></code>

## Auto 间距

<code src="./demos/auto.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 主轴方向 | `'row' \| 'column'` | `'row'` |
| justify | 主轴分布 | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| align | 交叉轴对齐 | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'center'` |
| gap | 间距，数字为 px | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | - |
| wrap | 是否换行 | `boolean` | `false` |
| center | 水平+垂直双向居中 | `boolean` | `false` |
| full | 撑满父容器宽度 | `boolean` | `false` |
| inline | 行内弹性盒 | `boolean` | `false` |
| flex | CSS flex 属性 | `number \| string` | - |
| auto | margin auto 抽象 | `boolean \| 'left' \| 'right' \| 'top' \| 'bottom'` | - |
| component | 渲染的 HTML 标签 | `React.ElementType` | `'div'` |
| children | 子元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### gap 语义 token

| Token | 值 |
|-------|-----|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |

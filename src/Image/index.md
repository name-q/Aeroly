---
title: Image 图片
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Image 图片

图片容器，支持加载占位、失败兜底、毛玻璃预览浮层，以及多图分组浏览。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 填充模式

<code src="./demos/fit.tsx"></code>

## 加载失败

<code src="./demos/fallback.tsx"></code>

## 图片预览

<code src="./demos/preview.tsx"></code>

## 多图预览

<code src="./demos/preview-group.tsx"></code>

## 懒加载

<code src="./demos/lazy.tsx"></code>

## API

### Image

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | 图片地址 | `string` | - |
| alt | 替代文本 | `string` | - |
| width | 宽度 | `number \| string` | - |
| height | 高度 | `number \| string` | - |
| fit | 适应方式 | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| borderRadius | 圆角 | `number \| string` | `8` |
| placeholder | 加载中占位 | `ReactNode` | 内置骨架屏 |
| fallback | 加载失败兜底 | `ReactNode` | 内置错误图标 |
| preview | 是否可预览 | `boolean` | `true` |
| previewSrc | 预览时使用的图片地址（如高清图） | `string` | 同 `src` |
| lazy | 是否懒加载 | `boolean` | `false` |
| onLoad | 加载完成回调 | `(e: SyntheticEvent) => void` | - |
| onError | 加载失败回调 | `(e: SyntheticEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Image.PreviewGroup

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| children | 子元素 | `ReactNode` | - |
| preview | 是否可预览 | `boolean` | `true` |

### 键盘交互

| 按键 | 说明 |
|------|------|
| `Esc` | 关闭预览 |
| `←` | 上一张（分组模式） |
| `→` | 下一张（分组模式） |
| `+` / `=` | 放大 |
| `-` | 缩小 |

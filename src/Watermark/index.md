---
title: Watermark 水印
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
toc: content
---

# Watermark 水印

在页面或容器上覆盖水印，用于标识版权、敏感信息等。支持文字和图片水印，内置 MutationObserver 防篡改。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 多行水印

<code src="./demos/multiline.tsx"></code>

## 图片水印

<code src="./demos/image.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 水印文字，支持字符串或字符串数组（多行） | `string \| string[]` | - |
| image | 水印图片地址（优先于 content） | `string` | - |
| imageWidth | 图片宽度 | `number` | `120` |
| imageHeight | 图片高度 | `number` | `64` |
| fontSize | 字体大小 | `number` | `14` |
| fontColor | 字体颜色 | `string` | `'rgba(0,0,0,0.08)'` |
| fontWeight | 字体粗细 | `'normal' \| 'light' \| 'bold' \| number` | `'normal'` |
| fontFamily | 字体 | `string` | `'sans-serif'` |
| rotate | 旋转角度 | `number` | `-22` |
| gap | 水印间距 [水平, 垂直] | `[number, number]` | `[100, 100]` |
| offset | 水印偏移 [x, y] | `[number, number]` | `[0, 0]` |
| zIndex | z-index | `number` | `9` |
| fullscreen | 是否全屏覆盖（fixed 定位） | `boolean` | `false` |
| children | 被水印覆盖的内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

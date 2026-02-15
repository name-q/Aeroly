---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 3
title: QRCode 二维码
order: 15
toc: content
---

# QRCode 二维码

将文本、链接等信息编码为二维码，支持 Logo、状态控制、下载复制。有 icon 时自动使用高纠错等级。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 中心 Logo

<code src="./demos/icon.tsx"></code>

## 自定义样式

<code src="./demos/custom.tsx"></code>

## 状态控制

<code src="./demos/status.tsx"></code>

## 无边框

<code src="./demos/borderless.tsx"></code>

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| value | `string` | - | 二维码内容（必填） |
| size | `number` | `160` | 尺寸（px） |
| color | `string` | `'#000000'` | 前景色 |
| bgColor | `string` | `'#ffffff'` | 背景色 |
| icon | `string` | - | 中心图标图片 URL，传入后自动使用高纠错 |
| iconSize | `number` | `size * 0.2` | 图标尺寸 |
| iconBorderRadius | `number` | `4` | 图标圆角 |
| bordered | `boolean` | `true` | 是否显示卡片边框和操作栏 |
| downloadName | `string` | `'qrcode.png'` | 下载文件名 |
| onCopy | `(success: boolean) => void` | - | 复制回调，参数为是否成功 |
| status | `'active' \| 'expired' \| 'loading' \| 'scanned'` | `'active'` | 状态 |
| statusRender | `(info) => ReactNode` | - | 自定义状态覆盖层 |
| onRefresh | `() => void` | - | 过期状态下的刷新回调 |
| className | `string` | - | 自定义类名 |
| style | `CSSProperties` | - | 自定义样式 |

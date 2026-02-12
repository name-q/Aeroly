---
title: Drawer 抽屉
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
toc: content
---

# Drawer 抽屉

屏幕边缘滑出的浮层面板，承载临时性内容，如表单、详情等。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 弹出方向

<code src="./demos/placement.tsx"></code>

## 底部操作

<code src="./demos/footer.tsx"></code>

## 自定义尺寸

<code src="./demos/size.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 是否显示 | `boolean` | - |
| onOpenChange | 显隐变化回调 | `(open: boolean) => void` | - |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| placement | 弹出方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| width | 宽度（左右方向生效） | `number \| string` | `378` |
| height | 高度（上下方向生效） | `number \| string` | `378` |
| footer | 底部操作区 | `ReactNode` | - |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| keyboard | 按 Esc 是否关闭 | `boolean` | `true` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

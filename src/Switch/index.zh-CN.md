---
title: Switch 开关
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Switch 开关

用于切换两种状态，滑轨搭配实体滑块，开关感知清晰。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 文案

<code src="./demos/text.tsx"></code>

## 加载中

<code src="./demos/loading.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否开启（受控） | `boolean` | - |
| defaultChecked | 默认是否开启（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| checkedText | 开启时的文案 | `ReactNode` | - |
| uncheckedText | 关闭时的文案 | `ReactNode` | - |
| onChange | 变化回调 | `(checked: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

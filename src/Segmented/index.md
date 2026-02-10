---
title: Segmented 分段控制器
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
---

# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项，常用于视图切换、筛选等场景。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 撑满宽度

<code src="./demos/block.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 自定义渲染

<code src="./demos/custom.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项数据 | `(string \| number \| SegmentedOption)[]` | - |
| value | 当前选中值（受控） | `string \| number` | - |
| defaultValue | 默认选中值（非受控） | `string \| number` | 第一项的值 |
| onChange | 选中变化回调 | `(value: string \| number) => void` | - |
| block | 是否撑满父容器宽度 | `boolean` | `false` |
| disabled | 是否整体禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### SegmentedOption

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项值 | `string \| number` | - |
| label | 显示内容 | `ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |

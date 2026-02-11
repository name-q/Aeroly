---
nav:
  title: 组件
  order: 1
group:
  title: 数据录入
  order: 3
toc: content
---

# ColorPicker 颜色选择器

用于选择颜色，支持 Hex、RGB 输入和透明度调节。

## 基础用法

<code src="./demos/basic.tsx" description="点击触发器弹出颜色面板，拖拽或输入修改颜色。"></code>

## 透明度

<code src="./demos/alpha.tsx" description="设置 showAlpha 开启透明度选择，输出 rgba 格式。"></code>

## 预设颜色

<code src="./demos/presets.tsx" description="通过 presets 提供常用颜色快捷选择。"></code>

## 尺寸

<code src="./demos/size.tsx" description="三种尺寸：small / medium / large。"></code>

## 禁用

<code src="./demos/disabled.tsx" description="禁用状态。"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 颜色值（受控） | `string` | - |
| defaultValue | 默认颜色 | `string` | `'#1677ff'` |
| onChange | 颜色变化回调 | `(color: string) => void` | - |
| showAlpha | 显示透明度 | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| size | 触发器尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| presets | 预设颜色列表 | `string[]` | - |
| placement | 弹出方向 | `PopoverPlacement` | `'bottom'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

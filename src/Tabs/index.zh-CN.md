---
nav:
  title: 组件
  order: 1
group:
  title: 数据展示
  order: 3
toc: content
---

# Tabs 标签页

在同一区域切换显示不同内容面板。支持三种风格变体、滑动指示器动画、可关闭标签和键盘导航。

## 基础用法

<code src="./demos/basic.tsx" description="最简单的用法，默认 line 风格。"></code>

## 风格变体

<code src="./demos/variant.tsx" description="三种风格：line（下划线）、card（卡片）、pill（胶囊）。"></code>

## 图标标签

<code src="./demos/icon.tsx" description="在标签前添加 Lucide 图标。"></code>

## 尺寸

<code src="./demos/size.tsx" description="small / medium / large 三种尺寸。"></code>

## 可关闭标签

<code src="./demos/closable.tsx" description="动态增删标签页，关闭后自动选中相邻标签。"></code>

## 附加内容

<code src="./demos/extra.tsx" description="在标签栏右侧放置额外操作。"></code>

## API

### TabsProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `TabItem[]` | - | 标签页数据 |
| activeKey | `string` | - | 当前激活 key（受控） |
| defaultActiveKey | `string` | - | 默认激活 key（非受控） |
| onChange | `(key: string) => void` | - | 切换回调 |
| variant | `'line' \| 'card' \| 'pill'` | `'line'` | 风格变体 |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| centered | `boolean` | `false` | 居中对齐 |
| onClose | `(key: string) => void` | - | 关闭标签回调 |
| extra | `ReactNode` | - | 标签栏右侧附加内容 |
| className | `string` | - | 自定义类名 |
| style | `CSSProperties` | - | 自定义样式 |

### TabItem

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 唯一标识 |
| label | `ReactNode` | 标签文字 |
| icon | `LucideIcon` | 图标 |
| children | `ReactNode` | 面板内容 |
| disabled | `boolean` | 禁用 |
| closable | `boolean` | 可关闭 |

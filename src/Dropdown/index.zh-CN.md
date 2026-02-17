---
nav:
  title: 组件
  order: 1
group:
  title: 导航
  order: 2
toc: content
---

# Dropdown 下拉菜单

向下弹出的操作菜单，基于 Popover 定位，支持子菜单嵌套、图标、危险操作、选中高亮。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 子菜单

<code src="./demos/submenu.tsx"></code>

## 点击触发 & 选中状态

<code src="./demos/click.tsx"></code>

## API

### DropdownProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| items | `DropdownItem[]` | - | 菜单项数据 |
| onSelect | `(key: string) => void` | - | 点击菜单项回调 |
| selectedKey | `string` | - | 当前选中项（高亮） |
| trigger | `'hover' \| 'click'` | `'hover'` | 触发方式 |
| placement | `PopoverPlacement` | `'bottom'` | 弹出方向 |
| open | `boolean` | - | 是否显示（受控） |
| onOpenChange | `(open: boolean) => void` | - | 显隐变化回调 |
| disabled | `boolean` | `false` | 是否禁用 |
| className | `string` | - | 菜单自定义类名 |
| style | `React.CSSProperties` | - | 菜单自定义样式 |

### DropdownItem

| 属性 | 类型 | 说明 |
|------|------|------|
| key | `string` | 唯一标识 |
| label | `ReactNode` | 显示文本 |
| icon | `LucideIcon` | 图标 |
| disabled | `boolean` | 是否禁用 |
| danger | `boolean` | 危险操作（红色） |
| type | `'divider'` | 分割线 |
| children | `DropdownItem[]` | 子菜单 |

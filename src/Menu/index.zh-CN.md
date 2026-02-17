---
nav:
  title: 组件
  order: 1
group:
  title: 导航
  order: 4
toc: content
---

# Menu 导航菜单

为页面或功能提供导航的菜单列表，支持垂直、水平、多级子菜单和收起模式。

## 基础用法

<code src="./demos/basic.tsx" description="最简单的垂直菜单，通过 items 传入菜单数据。"></code>

## 多级子菜单

<code src="./demos/submenu.tsx" description="子菜单可以无限嵌套，展开/收起带动画过渡。"></code>

## 水平模式

<code src="./demos/horizontal.tsx" description="设置 mode='horizontal' 切换为水平导航栏，子菜单以浮层弹出。"></code>

## 收起模式

<code src="./demos/collapsed.tsx" description="侧栏收起后仅显示图标，子菜单以浮层弹出。"></code>

## 分组与分割线

<code src="./demos/group.tsx" description="通过 type='group' 对菜单项分组，type='divider' 添加分割线。支持 disabled 禁用。"></code>

## API

### Menu

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项数据 | `MenuItemType[]` | - |
| selectedKey | 当前选中项（受控） | `string` | - |
| defaultSelectedKey | 默认选中项 | `string` | - |
| openKeys | 展开的子菜单（受控） | `string[]` | - |
| defaultOpenKeys | 默认展开的子菜单 | `string[]` | `[]` |
| onSelect | 选中回调 | `(key: string) => void` | - |
| onOpenChange | 展开/收起回调 | `(openKeys: string[]) => void` | - |
| mode | 菜单模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| collapsed | 收起侧栏（仅 vertical） | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### MenuItemType

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| label | 显示文本 | `ReactNode` | - |
| icon | 图标（Lucide 组件） | `LucideIcon` | - |
| children | 子菜单 | `MenuItemType[]` | - |
| disabled | 禁用 | `boolean` | `false` |
| type | 特殊类型 | `'group' \| 'divider'` | - |

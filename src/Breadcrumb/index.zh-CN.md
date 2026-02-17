---
nav:
  title: 组件
  order: 1
group:
  title: 导航
  order: 4
toc: content
---

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 基础用法

<code src="./demos/basic.tsx" description="最简单的面包屑，最后一项为当前页面。"></code>

## 带图标

<code src="./demos/icon.tsx" description="每一项可以配置 Lucide 图标。"></code>

## 自定义分隔符

<code src="./demos/separator.tsx" description="通过 separator 自定义分隔符，支持字符串或 ReactNode。"></code>

## 下拉菜单

<code src="./demos/menu.tsx" description="通过 menu 为某一项添加下拉选择，hover 弹出。"></code>

## 折叠省略

<code src="./demos/collapse.tsx" description="设置 maxItems 后，超出的中间项会折叠为省略号，hover 展开。"></code>

## API

### Breadcrumb

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑数据 | `BreadcrumbItemType[]` | - |
| separator | 自定义分隔符 | `ReactNode` | `<ChevronRight />` |
| maxItems | 超过此数量折叠中间项 | `number` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### BreadcrumbItemType

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 显示文本 | `ReactNode` | - |
| href | 链接地址 | `string` | - |
| icon | 图标（Lucide 组件） | `LucideIcon` | - |
| onClick | 点击回调（同时存在 href 时会阻止跳转，仅执行回调） | `(e: MouseEvent) => void` | - |
| menu | 下拉菜单项 | `{ label, href?, onClick? }[]` | - |

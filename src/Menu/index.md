---
nav:
  title: Components
  order: 1
group:
  title: Navigation
  order: 4
toc: content
---

# Menu

A navigation menu list for pages or features, supporting vertical, horizontal, multi-level submenus, and collapsed mode.

## Basic Usage

<code src="./en/demos/basic.tsx" description="The simplest vertical menu, passing menu data via items."></code>

## Multi-level Submenu

<code src="./en/demos/submenu.tsx" description="Submenus can be nested infinitely, with animated expand/collapse transitions."></code>

## Horizontal Mode

<code src="./en/demos/horizontal.tsx" description="Set mode='horizontal' to switch to a horizontal navigation bar, submenus pop up as overlays."></code>

## Collapsed Mode

<code src="./en/demos/collapsed.tsx" description="When the sidebar is collapsed, only icons are shown, and submenus pop up as overlays."></code>

## Groups and Dividers

<code src="./en/demos/group.tsx" description="Use type='group' to group menu items, type='divider' to add dividers. Supports disabled state."></code>

## API

### Menu

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| items | Menu item data | `MenuItemType[]` | - |
| selectedKey | Currently selected item (controlled) | `string` | - |
| defaultSelectedKey | Default selected item | `string` | - |
| openKeys | Expanded submenus (controlled) | `string[]` | - |
| defaultOpenKeys | Default expanded submenus | `string[]` | `[]` |
| onSelect | Selection callback | `(key: string) => void` | - |
| onOpenChange | Expand/collapse callback | `(openKeys: string[]) => void` | - |
| mode | Menu mode | `'vertical' \| 'horizontal'` | `'vertical'` |
| collapsed | Collapse sidebar (vertical only) | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### MenuItemType

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| key | Unique identifier | `string` | - |
| label | Display text | `ReactNode` | - |
| icon | Icon (Lucide component) | `LucideIcon` | - |
| children | Submenu items | `MenuItemType[]` | - |
| disabled | Disabled | `boolean` | `false` |
| type | Special type | `'group' \| 'divider'` | - |

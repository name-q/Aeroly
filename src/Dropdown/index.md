---
nav:
  title: Components
  order: 1
group:
  title: Navigation
  order: 2
toc: content
---

# Dropdown

A dropdown action menu based on Popover positioning, supporting submenu nesting, icons, danger actions, and selected highlighting.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Submenu

<code src="./en/demos/submenu.tsx" id="submenu-en"></code>

## Click Trigger & Selected State

<code src="./en/demos/click.tsx" id="click-en"></code>

## API

### DropdownProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | `DropdownItem[]` | - | Menu item data |
| onSelect | `(key: string) => void` | - | Menu item click callback |
| selectedKey | `string` | - | Currently selected item (highlighted) |
| trigger | `'hover' \| 'click'` | `'hover'` | Trigger mode |
| placement | `PopoverPlacement` | `'bottom'` | Popup direction |
| open | `boolean` | - | Whether to show (controlled) |
| onOpenChange | `(open: boolean) => void` | - | Visibility change callback |
| disabled | `boolean` | `false` | Whether disabled |
| className | `string` | - | Menu custom class name |
| style | `React.CSSProperties` | - | Menu custom style |

### DropdownItem

| Property | Type | Description |
|----------|------|-------------|
| key | `string` | Unique identifier |
| label | `ReactNode` | Display text |
| icon | `LucideIcon` | Icon |
| disabled | `boolean` | Whether disabled |
| danger | `boolean` | Danger action (red) |
| type | `'divider'` | Divider |
| children | `DropdownItem[]` | Submenu |

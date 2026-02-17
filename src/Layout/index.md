---
title: Layout
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Layout

Page-level layout container based on Flex, implementing classic top-bottom-left-right structures. Content automatically fills remaining space and supports scrolling. Sider width is controlled externally, and collapse logic is delegated to the Menu component.

## Top-Middle-Bottom Structure

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Sidebar Navigation

<code src="./en/demos/sider.tsx" id="sider-en"></code>

## Collapsible Sidebar

<code src="./en/demos/collapsed.tsx" id="collapsed-en"></code>

## API

### Layout

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| full | flex:1 to fill remaining space of parent container | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

Layout can be nested. Automatically switches to horizontal direction when containing a `Sider`.

### Layout.Header

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| height | Height, number in px | `number \| string` | `56` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Layout.Footer

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| height | Height, number in px | `number \| string` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Layout.Content

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

Content automatically uses `flex: 1` to fill remaining space and scrolls when content overflows.

### Layout.Sider

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| width | Width, number in px | `number \| string` | `200` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

Sider does not have built-in collapse logic. Control `width` via external state to achieve collapse, combined with Menu's `collapsed` prop.

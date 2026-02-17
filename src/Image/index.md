---
title: Image
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Image

An image container supporting loading placeholders, error fallbacks, preview overlays, and multi-image group browsing.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Object Fit

<code src="./en/demos/fit.tsx"></code>

## Load Failure

<code src="./en/demos/fallback.tsx"></code>

## Image Preview

<code src="./en/demos/preview.tsx"></code>

## Multi-image Preview

<code src="./en/demos/preview-group.tsx"></code>

## Lazy Loading

<code src="./en/demos/lazy.tsx"></code>

## Standalone Preview

<code src="./en/demos/standalone.tsx"></code>

## API

### Image

| Property | Description | Type | Default |
|------|------|------|--------|
| src | Image URL | `string` | - |
| alt | Alternative text | `string` | - |
| width | Width | `number \| string` | - |
| height | Height | `number \| string` | - |
| fit | Object fit mode | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` |
| borderRadius | Border radius | `number \| string` | `8` |
| placeholder | Loading placeholder | `ReactNode` | Built-in skeleton |
| fallback | Error fallback | `ReactNode` | Built-in error icon |
| preview | Whether previewable | `boolean` | `true` |
| previewSrc | Image URL used for preview (e.g. high-res image) | `string` | Same as `src` |
| lazy | Whether to lazy load | `boolean` | `false` |
| onLoad | Load complete callback | `(e: SyntheticEvent) => void` | - |
| onError | Load failure callback | `(e: SyntheticEvent) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Image.PreviewGroup

| Property | Description | Type | Default |
|------|------|------|--------|
| children | Child elements | `ReactNode` | - |
| preview | Whether previewable | `boolean` | `true` |

### Image.Preview

| Property | Description | Type | Default |
|------|------|------|--------|
| open | Whether visible | `boolean` | - |
| onOpenChange | Visibility change callback | `(open: boolean) => void` | - |
| src | Single image URL (mutually exclusive with images) | `string` | - |
| images | Multiple image URL list (mutually exclusive with src) | `string[]` | - |
| defaultCurrent | Default displayed image index (starting from 0) | `number` | `0` |

### Keyboard Interaction

| Key | Description |
|------|------|
| `Esc` | Close preview |
| `←` | Previous image (group mode) |
| `→` | Next image (group mode) |
| `+` / `=` | Zoom in |
| `-` | Zoom out |

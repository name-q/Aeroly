---
title: Watermark
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Watermark

Overlay watermarks on pages or containers to identify copyright, sensitive information, etc. Supports text and image watermarks with built-in MutationObserver for tamper protection.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Multi-line Watermark

<code src="./en/demos/multiline.tsx" id="multiline-en"></code>

## Image Watermark

<code src="./en/demos/image.tsx" id="image-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| content | Watermark text, supports string or string array (multi-line) | `string \| string[]` | - |
| image | Watermark image URL (takes priority over content) | `string` | - |
| imageWidth | Image width | `number` | `120` |
| imageHeight | Image height | `number` | `64` |
| fontSize | Font size | `number` | `14` |
| fontColor | Font color | `string` | `'rgba(0,0,0,0.08)'` |
| fontWeight | Font weight | `'normal' \| 'light' \| 'bold' \| number` | `'normal'` |
| fontFamily | Font family | `string` | `'sans-serif'` |
| rotate | Rotation angle | `number` | `-22` |
| gap | Watermark gap [horizontal, vertical] | `[number, number]` | `[100, 100]` |
| offset | Watermark offset [x, y] | `[number, number]` | `[0, 0]` |
| zIndex | z-index | `number` | `9` |
| fullscreen | Fullscreen overlay (fixed positioning) | `boolean` | `false` |
| children | Content to be watermarked | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

---
nav:
  title: Components
  order: 2
group:
  title: Data Display
  order: 3
title: QRCode
order: 15
toc: content
---

# QRCode

Encode text, links, and other information into QR codes. Supports Logo, status control, download, and copy. Automatically uses high error correction level when an icon is provided.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Center Logo

<code src="./en/demos/icon.tsx" id="icon-en"></code>

## Custom Style

<code src="./en/demos/custom.tsx" id="custom-en"></code>

## Status Control

<code src="./en/demos/status.tsx" id="status-en"></code>

## Borderless

<code src="./en/demos/borderless.tsx" id="borderless-en"></code>

## API

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | `string` | - | QR code content (required) |
| size | `number` | `160` | Size (px) |
| color | `string` | `'#000000'` | Foreground color |
| bgColor | `string` | `'#ffffff'` | Background color |
| icon | `string` | - | Center icon image URL, automatically uses high error correction when provided |
| iconSize | `number` | `size * 0.2` | Icon size |
| iconBorderRadius | `number` | `4` | Icon border radius |
| bordered | `boolean` | `true` | Show card border and action bar |
| downloadName | `string` | `'qrcode.png'` | Download file name |
| onCopy | `(success: boolean) => void` | - | Copy callback, parameter indicates success |
| status | `'active' \| 'expired' \| 'loading' \| 'scanned'` | `'active'` | Status |
| statusRender | `(info) => ReactNode` | - | Custom status overlay |
| onRefresh | `() => void` | - | Refresh callback in expired status |
| className | `string` | - | Custom class name |
| style | `CSSProperties` | - | Custom style |

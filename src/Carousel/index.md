---
nav:
  title: Components
  order: 2
group:
  title: Data Display
  order: 3
title: Carousel
order: 8
toc: content
---

# Carousel

Cycles through a set of content, supporting both slide and fade transition effects.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en" description="Horizontal slide transition. Arrows appear on hover, click dots to jump."></code>

## Autoplay

<code src="./en/demos/autoplay.tsx" id="autoplay-en" description="Enable autoplay for automatic rotation. Pauses on hover, resumes on leave."></code>

## Fade Effect

<code src="./en/demos/fade.tsx" id="fade-en" description="effect='fade' for smooth fade-in/fade-out transitions."></code>

## Vertical Direction

<code src="./en/demos/vertical.tsx" id="vertical-en" description="direction='vertical' for vertical sliding, with dots on the right side."></code>

## External Control

<code src="./en/demos/custom.tsx" id="custom-en" description="Use ref to access next / prev / goTo methods for external button control."></code>

## API

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | `CarouselItem[]` | - | Carousel item data |
| current | `number` | - | Current index (controlled) |
| defaultCurrent | `number` | `0` | Default index |
| onChange | `(current: number) => void` | - | Change callback |
| beforeChange | `(from: number, to: number) => void` | - | Before change callback |
| effect | `'slide' \| 'fade'` | `'slide'` | Transition effect |
| direction | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction |
| autoplay | `boolean` | `false` | Autoplay |
| autoplayInterval | `number` | `3000` | Autoplay interval (ms) |
| arrows | `boolean \| 'hover'` | `'hover'` | Arrow display mode |
| dots | `boolean` | `true` | Indicator dots |
| dotsPosition | `'bottom' \| 'top' \| 'left' \| 'right' \| 'inner'` | `'inner'` | Dots position, inner overlays at the bottom of content |
| loop | `boolean` | `true` | Loop playback |
| height | `number \| string` | - | Height for vertical mode |
| className | `string` | - | Custom class name |
| style | `CSSProperties` | - | Custom style |

### CarouselItem

| Property | Type | Description |
|----------|------|-------------|
| key | `string` | Unique identifier |
| children | `ReactNode` | Content |

### CarouselRef

Instance methods accessible via `ref`:

| Method | Description |
|--------|-------------|
| `next()` | Go to next slide |
| `prev()` | Go to previous slide |
| `goTo(index)` | Jump to specified index |

### Keyboard Interaction

| Key | Description |
|-----|-------------|
| `←` / `→` | Switch in horizontal mode |
| `↑` / `↓` | Switch in vertical mode |

---
nav:
  title: Components
  order: 2
group:
  title: Data Display
  order: 4
toc: content
---

# VideoPlayer

A video player with danmaku (bullet comments) and quality switching support.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Danmaku

<code src="./en/demos/danmaku.tsx" id="danmaku-en"></code>

## Quality Switching

<code src="./en/demos/quality.tsx" id="quality-en"></code>

## API

### VideoPlayer

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| src | Video URL | `string` | - |
| sources | Multiple quality sources | `VideoSource[]` | - |
| poster | Poster image | `string` | - |
| width | Width | `number \| string` | - |
| height | Height | `number \| string` | - |
| autoPlay | Auto play | `boolean` | `false` |
| loop | Loop | `boolean` | `false` |
| muted | Default muted | `boolean` | `false` |
| fit | Object fit | `'contain' \| 'cover' \| 'fill'` | `'contain'` |
| borderRadius | Border radius | `number \| string` | - |
| danmaku | Danmaku data | `DanmakuItem[]` | - |
| defaultDanmakuVisible | Show danmaku by default | `boolean` | `true` |
| onDanmakuLike | Danmaku like callback | `(item: DanmakuItem) => void` | - |
| onPlay | Play callback | `() => void` | - |
| onPause | Pause callback | `() => void` | - |
| onEnded | Ended callback | `() => void` | - |
| onError | Error callback | `(e) => void` | - |
| onTimeUpdate | Time update callback | `(currentTime, duration) => void` | - |
| onQualityChange | Quality change callback | `(source: VideoSource) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### VideoSource

| Property | Description | Type |
| --- | --- | --- |
| label | Quality label | `string` |
| src | Video URL | `string` |
| default | Is default | `boolean` |

### DanmakuItem

| Property | Description | Type |
| --- | --- | --- |
| id | Unique ID | `string \| number` |
| time | Appear time (seconds) | `number` |
| text | Text content | `string` |
| color | Color | `string` |
| image | Image emoji URL | `string` |
| likes | Like count | `number` |

### Ref Methods

| Method | Description | Type |
| --- | --- | --- |
| play | Play | `() => void` |
| pause | Pause | `() => void` |
| seek | Seek to time | `(time: number) => void` |
| sendDanmaku | Append danmaku | `(item: DanmakuItem) => void` |
| getVideoElement | Get video element | `() => HTMLVideoElement \| null` |

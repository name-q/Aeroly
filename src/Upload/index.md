---
nav:
  title: Components
  order: 1
group:
  title: Data Entry
  order: 4
toc: content
---

# Upload

A file upload component supporting click, drag-and-drop, image preview, progress display, and AI processing hooks.

## Basic Usage

<code src="./en/demos/basic.tsx" description="Click the button to select files for upload, with progress bar and status feedback."></code>

## Drag Upload

<code src="./en/demos/drag.tsx" description="Enable drag to activate the drag area, supporting file upload by dragging."></code>

## Picture Mode

<code src="./en/demos/picture.tsx" description="listType='picture' displays thumbnail previews."></code>

## Picture Card Mode

<code src="./en/demos/picture-card.tsx" description="listType='picture-card' horizontal card layout, hover shows filename and error info, suitable for compact scenarios like Form inline."></code>

## Count and Size Limits

<code src="./en/demos/limit.tsx" description="maxCount limits the number of files, maxSize limits single file size. The trigger area automatically hides when the limit is reached."></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" description="Fully control the file list via fileList + onChange, supports preset files and error retry."></code>

## AI Processing

<code src="./en/demos/ai.tsx" description="Use the onProcess hook to perform AI analysis on files before upload, results are written to the aiMeta field."></code>

## Real-world Integration

<code src="./en/demos/real.tsx"></code>

## API

### UploadProps

| Property | Type | Default | Description |
|------|------|--------|------|
| fileList | `UploadFile[]` | - | File list (controlled) |
| defaultFileList | `UploadFile[]` | - | Default file list (uncontrolled) |
| onChange | `(fileList: UploadFile[]) => void` | - | Callback when file list changes |
| customRequest | `(options: CustomRequestOptions) => { abort } \| void` | - | Custom upload implementation |
| accept | `string` | - | Accepted file types |
| multiple | `boolean` | `false` | Whether to allow multiple selection |
| maxCount | `number` | - | Maximum number of files |
| maxSize | `number` | - | Single file size limit (bytes) |
| beforeUpload | `(file, fileList) => boolean \| Promise<boolean>` | - | Pre-upload validation |
| onRemove | `(file: UploadFile) => boolean \| Promise \| void` | - | Remove callback |
| onPreview | `(file: UploadFile) => void` | - | File click callback |
| drag | `boolean` | `false` | Drag mode |
| listType | `'text' \| 'picture' \| 'picture-card'` | `'text'` | Display type, see below |
| disabled | `boolean` | `false` | Disabled |
| children | `ReactNode` | - | Custom trigger area |
| tip | `ReactNode` | - | Hint text |
| onProcess | `(file, originFile) => Promise<Partial<UploadFile>> \| void` | - | AI processing hook |

### listType Display Types

| Value | Behavior | Use Case |
|------|------|------|
| `text` | Vertical file list showing filename, size, icon, and progress bar | General file uploads like documents and attachments |
| `picture` | Vertical file list with thumbnail preview on the left, otherwise same as `text` | Image uploads where space is sufficient for previews |
| `picture-card` | Horizontally arranged square thumbnail cards (80x80), trigger button is a same-sized `+` card at the end, hover shows preview/delete overlay, uploading shows progress mask | Form inline mode, avatar upload, compact image selection |

### UploadFile

| Property | Type | Description |
|------|------|------|
| uid | `string` | Unique identifier |
| name | `string` | File name |
| size | `number` | File size (bytes) |
| type | `string` | MIME type |
| status | `'pending' \| 'uploading' \| 'success' \| 'error'` | Upload status |
| percent | `number` | Upload progress 0-100 |
| thumbUrl | `string` | Thumbnail URL |
| url | `string` | Remote URL |
| error | `string` | Error message |
| originFile | `File` | Original File object |
| aiMeta | `Record<string, any>` | AI analysis result |

### CustomRequestOptions

| Property | Type | Description |
|------|------|------|
| file | `File` | Original file |
| onProgress | `(percent: number) => void` | Progress callback |
| onSuccess | `(response?: any) => void` | Success callback |
| onError | `(error: Error) => void` | Failure callback |

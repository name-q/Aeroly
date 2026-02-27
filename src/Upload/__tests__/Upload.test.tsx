import { describe, it, expect, vi } from 'vitest';
import React, { act } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Upload from '../index';
import type { UploadFile, CustomRequestOptions } from '../index';

describe('Upload — Deep Interaction', () => {
  // ---- Basic rendering ----
  it('renders upload trigger', () => {
    const { container } = render(<Upload />);
    expect(container.querySelector('.aero-upload')).toBeTruthy();
    expect(container.querySelector('.aero-upload-trigger')).toBeTruthy();
  });

  it('renders with defaultFileList', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'test.txt', status: 'success', size: 1024 },
    ];
    const { container } = render(<Upload defaultFileList={files} />);
    expect(container.querySelector('.aero-upload-file__name')?.textContent).toContain('test.txt');
  });

  // ---- File selection via input ----
  it('adds files on input change', () => {
    const onChange = vi.fn();
    const { container } = render(<Upload onChange={onChange} />);
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalled();
    const fileList = onChange.mock.calls[0][0] as UploadFile[];
    expect(fileList.length).toBe(1);
    expect(fileList[0].name).toBe('hello.txt');
  });

  // ---- beforeUpload blocks upload ----
  it('blocks upload when beforeUpload returns false', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Upload onChange={onChange} beforeUpload={() => false} />,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---- maxCount ----
  it('respects maxCount limit', () => {
    const onChange = vi.fn();
    const existing: UploadFile[] = [
      { uid: '1', name: 'a.txt', status: 'success' },
    ];
    const { container } = render(
      <Upload defaultFileList={existing} maxCount={2} onChange={onChange} />,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const files = [
      new File(['a'], 'b.txt', { type: 'text/plain' }),
      new File(['b'], 'c.txt', { type: 'text/plain' }),
      new File(['c'], 'd.txt', { type: 'text/plain' }),
    ];
    fireEvent.change(input, { target: { files } });
    // Only 1 more allowed (maxCount=2, 1 existing)
    const fileList = onChange.mock.calls[0][0] as UploadFile[];
    expect(fileList.length).toBe(2); // 1 existing + 1 new
  });

  // ---- maxSize validation ----
  it('marks oversized files as error', () => {
    const onChange = vi.fn();
    const { container } = render(
      <Upload maxSize={100} onChange={onChange} />,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const bigFile = new File(['x'.repeat(200)], 'big.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [bigFile] } });
    expect(onChange).toHaveBeenCalled();
    const fileList = onChange.mock.calls[0][0] as UploadFile[];
    expect(fileList[0].status).toBe('error');
  });

  // ---- customRequest upload flow ----
  it('calls customRequest and handles progress/success', () => {
    const onChange = vi.fn();
    let requestOpts: CustomRequestOptions | null = null;
    const customRequest = (opts: CustomRequestOptions) => {
      requestOpts = opts;
      return { abort: vi.fn() };
    };
    const { container } = render(
      <Upload customRequest={customRequest} onChange={onChange} />,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(requestOpts).not.toBeNull();
    // Simulate progress (state update outside React event)
    act(() => { requestOpts!.onProgress(50); });
    // Simulate success
    act(() => { requestOpts!.onSuccess({ url: 'https://example.com/hello.txt' }); });
    // onChange: initial add + progress + success
    expect(onChange.mock.calls.length).toBeGreaterThanOrEqual(3);
  });

  it('handles upload error', () => {
    const onChange = vi.fn();
    let requestOpts: CustomRequestOptions | null = null;
    const customRequest = (opts: CustomRequestOptions) => {
      requestOpts = opts;
      return { abort: vi.fn() };
    };
    const { container } = render(
      <Upload customRequest={customRequest} onChange={onChange} />,
    );
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    act(() => { requestOpts!.onError(new Error('Network error')); });
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0] as UploadFile[];
    const errorFile = lastCall.find((f) => f.name === 'hello.txt');
    expect(errorFile?.status).toBe('error');
    expect(errorFile?.error).toBe('Network error');
  });

  // ---- Remove file ----
  it('removes file from list', () => {
    const onChange = vi.fn();
    const files: UploadFile[] = [
      { uid: '1', name: 'a.txt', status: 'success' },
      { uid: '2', name: 'b.txt', status: 'success' },
    ];
    const { container } = render(
      <Upload defaultFileList={files} onChange={onChange} />,
    );
    const removeBtns = container.querySelectorAll('.aero-upload-file__remove');
    fireEvent.click(removeBtns[0]);
    const fileList = onChange.mock.calls[0][0] as UploadFile[];
    expect(fileList.length).toBe(1);
    expect(fileList[0].name).toBe('b.txt');
  });

  it('onRemove returning false prevents removal', async () => {
    const onChange = vi.fn();
    const files: UploadFile[] = [
      { uid: '1', name: 'a.txt', status: 'success', originFile: new File([''], 'a.txt') },
    ];
    const { container } = render(
      <Upload defaultFileList={files} onRemove={() => false} onChange={onChange} />,
    );
    const removeBtn = container.querySelector('.aero-upload-file__remove')!;
    fireEvent.click(removeBtn);
    // onChange should not be called since removal was blocked
    expect(onChange).not.toHaveBeenCalled();
  });

  // ---- Drag mode ----
  it('renders drag trigger', () => {
    const { container } = render(<Upload drag />);
    expect(container.querySelector('.aero-upload-trigger--drag')).toBeTruthy();
  });

  // ---- Disabled ----
  it('does not trigger file selection when disabled', () => {
    const { container } = render(<Upload disabled />);
    expect(container.querySelector('.aero-upload--disabled')).toBeTruthy();
  });

  // ---- picture-card mode ----
  it('renders picture-card layout', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'img.png', status: 'success', thumbUrl: 'data:image/png;base64,abc' },
    ];
    const { container } = render(<Upload defaultFileList={files} listType="picture-card" />);
    expect(container.querySelector('.aero-upload--picture-card')).toBeTruthy();
    expect(container.querySelector('.aero-upload-card__img')).toBeTruthy();
  });

  // ---- Controlled mode ----
  it('respects controlled fileList', () => {
    const files: UploadFile[] = [
      { uid: '1', name: 'a.txt', status: 'success' },
    ];
    const { container, rerender } = render(<Upload fileList={files} />);
    expect(container.querySelectorAll('.aero-upload-file').length).toBe(1);
    rerender(<Upload fileList={[]} />);
    expect(container.querySelectorAll('.aero-upload-file').length).toBe(0);
  });

  // ---- Tip ----
  it('renders tip text', () => {
    const { container } = render(<Upload tip="Only PNG files" />);
    expect(container.querySelector('.aero-upload-tip')?.textContent).toBe('Only PNG files');
  });
});

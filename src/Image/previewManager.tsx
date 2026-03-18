import React from 'react';
import { createRoot } from 'react-dom/client';
import Preview from './Preview';

// ─── 全局 Preview 管理器 ───
// 参考 Message/Notification 的 createRoot 命令式渲染模式
// Preview 渲染在独立 React root 中，不依赖任何组件树

let containerEl: HTMLDivElement | null = null;
let containerRoot: ReturnType<typeof createRoot> | null = null;

interface PreviewState {
  visible: boolean;
  images: string[];
  current: number;
}

let state: PreviewState | null = null;

function getContainer() {
  if (!containerEl) {
    containerEl = document.createElement('div');
    containerEl.className = 'aero-image-preview-manager';
    document.body.appendChild(containerEl);
    containerRoot = createRoot(containerEl);
  }
  return containerRoot!;
}

function render() {
  const root = getContainer();
  if (!state) {
    root.render(null);
    return;
  }
  root.render(
    <Preview
      visible={state.visible}
      images={state.images}
      current={state.current}
      onClose={closePreview}
      onChange={(index: number) => {
        if (state) {
          state = { ...state, current: index };
          render();
        }
      }}
    />,
  );
}

export function openPreview(config: { images: string[]; current?: number }) {
  state = {
    visible: true,
    images: config.images,
    current: config.current ?? 0,
  };
  document.dispatchEvent(new CustomEvent('aero-overlay-open'));
  render();
}

export function closePreview() {
  if (!state) return;
  state = { ...state, visible: false };
  render();
}

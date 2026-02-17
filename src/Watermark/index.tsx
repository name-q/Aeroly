import React, { useRef, useEffect, useCallback, useState } from 'react';
import './index.less';

export interface WatermarkProps {
  /** Watermark text，支持字符串或字符串数组（多行） */
  content?: string | string[];
  /** Watermark image地址（优先于 content） */
  image?: string;
  /** 图片Width，Default 120 */
  imageWidth?: number;
  /** 图片高度，Default 64 */
  imageHeight?: number;
  /** Font size，Default 14 */
  fontSize?: number;
  /** Font color，Default rgba(0,0,0,0.08) */
  fontColor?: string;
  /** 字体粗细，Default normal */
  fontWeight?: 'normal' | 'light' | 'bold' | number;
  /** 字体，Default sans-serif */
  fontFamily?: string;
  /** Rotation angle，Default -22 */
  rotate?: number;
  /** Watermark gap [水平, 垂直]，Default [100, 100] */
  gap?: [number, number];
  /** 水印相对于容器左上角的偏移 [x, y] */
  offset?: [number, number];
  /** z-index，Default 9 */
  zIndex?: number;
  /** Whether全屏覆盖（fixed 定位），Default false */
  fullscreen?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const PREFIX = 'aero-watermark';

const LIGHT_COLOR = 'rgba(0,0,0,0.08)';
const DARK_COLOR = 'rgba(255,255,255,0.12)';

function isDarkMode() {
  const el = document.documentElement;
  return el.getAttribute('data-theme') === 'dark' || el.getAttribute('data-prefers-color') === 'dark';
}

function useDarkMode() {
  const [dark, setDark] = useState(isDarkMode);

  useEffect(() => {
    const observer = new MutationObserver(() => setDark(isDarkMode()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-prefers-color'],
    });
    return () => observer.disconnect();
  }, []);

  return dark;
}

function toLines(content: string | string[]): string[] {
  return Array.isArray(content) ? content : [content];
}

function drawWatermark(
  props: Required<Pick<WatermarkProps, 'fontSize' | 'fontColor' | 'fontWeight' | 'fontFamily' | 'rotate' | 'gap'>> & {
    content?: string | string[];
    image?: string;
    imageWidth: number;
    imageHeight: number;
    offset: [number, number];
  },
  callback: (url: string, width: number, height: number) => void,
) {
  const {
    content, image, imageWidth, imageHeight,
    fontSize, fontColor, fontWeight, fontFamily,
    rotate, gap, offset,
  } = props;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  const dpr = window.devicePixelRatio || 1;
  const rad = (rotate * Math.PI) / 180;

  if (image) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const w = imageWidth * dpr;
      const h = imageHeight * dpr;
      const cellW = w + gap[0] * dpr;
      const cellH = h + gap[1] * dpr;
      canvas.width = cellW;
      canvas.height = cellH;
      ctx.translate(cellW / 2 + offset[0] * dpr, cellH / 2 + offset[1] * dpr);
      ctx.rotate(rad);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      callback(canvas.toDataURL(), cellW / dpr, cellH / dpr);
    };
    img.onerror = () => {
      // 图片加载失败，静默降级
    };
    img.src = image;
    return;
  }

  if (!content) return;

  const lines = toLines(content);
  const font = `${fontWeight} ${fontSize * dpr}px ${fontFamily}`;
  ctx.font = font;

  const lineHeight = fontSize * 1.5 * dpr;
  const textWidths = lines.map((l) => ctx.measureText(l).width);
  const maxTextW = Math.max(...textWidths);
  const textBlockH = lineHeight * lines.length;

  // 旋转后的包围盒
  const absCos = Math.abs(Math.cos(rad));
  const absSin = Math.abs(Math.sin(rad));
  const rotW = maxTextW * absCos + textBlockH * absSin;
  const rotH = maxTextW * absSin + textBlockH * absCos;

  const cellW = rotW + gap[0] * dpr;
  const cellH = rotH + gap[1] * dpr;
  canvas.width = cellW;
  canvas.height = cellH;

  ctx.translate(cellW / 2 + offset[0] * dpr, cellH / 2 + offset[1] * dpr);
  ctx.rotate(rad);
  ctx.font = font;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const startY = -((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, 0, startY + i * lineHeight);
  });

  callback(canvas.toDataURL(), cellW / dpr, cellH / dpr);
}

const Watermark: React.FC<WatermarkProps> = ({
  content,
  image,
  imageWidth = 120,
  imageHeight = 64,
  fontSize = 14,
  fontColor,
  fontWeight = 'normal',
  fontFamily = 'sans-serif',
  rotate = -22,
  gap = [100, 100],
  offset = [0, 0],
  zIndex = 9,
  fullscreen = false,
  children,
  className,
  style,
}) => {
  const dark = useDarkMode();
  const resolvedColor = fontColor || (dark ? DARK_COLOR : LIGHT_COLOR);

  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const renderRef = useRef<() => void>();

  const startObserving = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    observerRef.current?.disconnect();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const removed = Array.from(mutation.removedNodes);
          if (removed.includes(watermarkRef.current!)) {
            renderRef.current?.();
            return;
          }
        }
        if (mutation.type === 'attributes' && mutation.target === watermarkRef.current) {
          renderRef.current?.();
          return;
        }
      }
    });

    observer.observe(container, {
      childList: true,
      attributes: true,
      subtree: true,
    });

    observerRef.current = observer;
  }, []);

  const renderWatermark = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    drawWatermark(
      {
        content, image, imageWidth, imageHeight,
        fontSize, fontColor: resolvedColor, fontWeight, fontFamily,
        rotate, gap, offset,
      },
      (url, w, h) => {
        observerRef.current?.disconnect();

        if (watermarkRef.current && container.contains(watermarkRef.current)) {
          container.removeChild(watermarkRef.current);
        }

        const el = document.createElement('div');
        el.setAttribute('data-watermark', '');
        el.style.cssText = [
          `position: ${fullscreen ? 'fixed' : 'absolute'}`,
          'inset: 0',
          `z-index: ${zIndex}`,
          'pointer-events: none',
          `background-image: url(${url})`,
          `background-size: ${w}px ${h}px`,
          'background-repeat: repeat',
        ].join(';');

        container.appendChild(el);
        watermarkRef.current = el;

        startObserving();
      },
    );
  }, [content, image, imageWidth, imageHeight, fontSize, resolvedColor, fontWeight, fontFamily, rotate, gap, offset, zIndex, fullscreen, startObserving]);

  // 保持 renderRef 指向最新的 renderWatermark
  renderRef.current = renderWatermark;

  useEffect(() => {
    renderWatermark();
    return () => {
      observerRef.current?.disconnect();
    };
  }, [renderWatermark]);

  const cls = [
    PREFIX,
    fullscreen ? `${PREFIX}--fullscreen` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={containerRef} className={cls} style={style}>
      {children}
    </div>
  );
};

export default Watermark;

import React, { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { RefreshCw, Download, Copy, Check } from 'lucide-react';
import { QrCode, QrSegment, Ecc } from './qrcodegen';
import Spin from '../Spin';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

export type QRCodeStatus = 'active' | 'expired' | 'loading' | 'scanned';

export interface QRCodeProps {
  /** QR code content（URL、文本等） */
  value: string;
  /** Size（px），Default 160 */
  size?: number;
  /** 前景Color，Default #000000 */
  color?: string;
  /** 背景Color，Default #ffffff */
  bgColor?: string;
  /** Center icon图片 URL */
  icon?: string;
  /** IconSize（px），Default size * 0.2 */
  iconSize?: number;
  /** Icon圆角（px），Default 4 */
  iconBorderRadius?: number;
  /** Whether带边框卡片样式，Default true */
  bordered?: boolean;
  /** 下载文件名，Default 'qrcode.png' */
  downloadName?: string;
  /** 复制Callback，参数为Whether成功 */
  onCopy?: (success: boolean) => void;
  /** Status */
  status?: QRCodeStatus;
  /** CustomStatus覆盖层 */
  statusRender?: (info: { status: QRCodeStatus; onRefresh?: () => void }) => React.ReactNode;
  /** Refresh callback（expired Status下点击刷新） */
  onRefresh?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const PREFIX = 'aero-qrcode';

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  color = '#000000',
  bgColor = '#ffffff',
  icon,
  iconSize,
  iconBorderRadius = 4,
  bordered = true,
  downloadName = 'qrcode.png',
  onCopy,
  status = 'active',
  statusRender,
  onRefresh,
  className,
  style,
}) => {
  const localeQR = useLocale('QRCode');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const actualIconSize = iconSize || Math.round(size * 0.2);

  // 有 icon 时自动用 H 级纠错，否则用 M
  const ecLevel = icon ? Ecc.HIGH : Ecc.MEDIUM;

  // 编码 QR
  const qr = useMemo(() => {
    if (!value) return null;
    try {
      const segs = QrSegment.makeSegments(value);
      return QrCode.encodeSegments(segs, ecLevel);
    } catch {
      return null;
    }
  }, [value, ecLevel]);

  // 加载 icon 图片
  useEffect(() => {
    if (!icon) {
      imgRef.current = null;
      setImgLoaded(false);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imgRef.current = img;
      setImgLoaded(true);
    };
    img.onerror = () => {
      imgRef.current = null;
      setImgLoaded(false);
    };
    img.src = icon;
    setImgLoaded(false);
    return () => { img.onload = null; img.onerror = null; };
  }, [icon]);

  // 绘制 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !qr || status === 'loading') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const modules = qr.getModules();
    const moduleCount = modules.length;
    const margin = 1;
    const totalModules = moduleCount + margin * 2;
    const cellSize = (size * dpr) / totalModules;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;

    // 背景
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 计算 icon 挖空区域（模块坐标）
    let exX = -1, exY = -1, exW = 0, exH = 0;
    if (icon && imgRef.current) {
      const scale = totalModules / size;
      const iw = actualIconSize * scale;
      const ih = actualIconSize * scale;
      const ix = moduleCount / 2 - iw / 2;
      const iy = moduleCount / 2 - ih / 2;
      exX = Math.floor(ix);
      exY = Math.floor(iy);
      exW = Math.ceil(iw + ix - exX);
      exH = Math.ceil(ih + iy - exY);
    }

    // 绘制模块
    ctx.fillStyle = color;
    for (let y = 0; y < moduleCount; y++) {
      for (let x = 0; x < moduleCount; x++) {
        // 挖空 icon 区域
        if (exW > 0 && x >= exX && x < exX + exW && y >= exY && y < exY + exH) {
          continue;
        }
        if (modules[y][x]) {
          ctx.fillRect(
            (x + margin) * cellSize,
            (y + margin) * cellSize,
            Math.ceil(cellSize),
            Math.ceil(cellSize),
          );
        }
      }
    }

    // 绘制 icon
    if (icon && imgRef.current) {
      const iconW = actualIconSize * dpr;
      const iconH = actualIconSize * dpr;
      const ix = (canvas.width - iconW) / 2;
      const iy = (canvas.height - iconH) / 2;
      const pad = 4 * dpr;
      const radius = (iconBorderRadius + 2) * dpr;

      ctx.fillStyle = '#fff';
      roundRect(ctx, ix - pad, iy - pad, iconW + pad * 2, iconH + pad * 2, radius);
      ctx.fill();

      ctx.save();
      roundRect(ctx, ix, iy, iconW, iconH, iconBorderRadius * dpr);
      ctx.clip();
      ctx.drawImage(imgRef.current, ix, iy, iconW, iconH);
      ctx.restore();
    }
  }, [qr, size, color, bgColor, icon, actualIconSize, iconBorderRadius, status, imgLoaded]);

  // 下载
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadName;
    a.click();
  }, [downloadName]);

  // 复制到剪贴板
  const handleCopy = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png'),
      );
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        onCopy?.(true);
      } else {
        onCopy?.(false);
      }
    } catch {
      onCopy?.(false);
    }
  }, [onCopy]);

  // Status覆盖层
  const renderOverlay = () => {
    if (status === 'active') return null;

    if (status === 'loading') {
      return (
        <div className={`${PREFIX}-overlay`}>
          <Spin size="small" />
        </div>
      );
    }

    if (statusRender) {
      return (
        <div className={`${PREFIX}-overlay`}>
          {statusRender({ status, onRefresh })}
        </div>
      );
    }

    if (status === 'expired') {
      return (
        <div className={`${PREFIX}-overlay`}>
          <div className={`${PREFIX}-overlay-text`}>{localeQR.expired}</div>
          {onRefresh && (
            <button className={`${PREFIX}-overlay-btn`} onClick={onRefresh}>
              <RefreshCw size={14} />
              <span>{localeQR.refresh}</span>
            </button>
          )}
        </div>
      );
    }

    if (status === 'scanned') {
      return (
        <div className={`${PREFIX}-overlay`}>
          <div className={`${PREFIX}-overlay-text`}>{localeQR.scanned}</div>
        </div>
      );
    }

    return null;
  };

  const cls = [
    PREFIX,
    bordered ? `${PREFIX}--bordered` : '',
    status !== 'active' ? `${PREFIX}--${status}` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      <div className={`${PREFIX}-body`} style={{ width: size, height: size }}>
        <canvas ref={canvasRef} className={`${PREFIX}-canvas`} />
        {renderOverlay()}
      </div>
      {bordered && (
        <div className={`${PREFIX}-actions`}>
          <button
            className={`${PREFIX}-action`}
            onClick={handleDownload}
            title={localeQR.download}
          >
            <Download size={14} />
          </button>
          <button
            className={`${PREFIX}-action`}
            onClick={handleCopy}
            title={localeQR.copy}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCode;

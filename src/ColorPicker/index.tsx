import React, { useState, useRef, useCallback, useEffect } from 'react';
import Popover from '../Popover';
import type { PopoverPlacement } from '../Popover';
import Input from '../Input';
import InputNumber from '../InputNumber';
import { throttle } from '../utils';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ─── 颜Color算法 ───

interface HSVA {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r = 0, g = 0, b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsv(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function hexToRgb(hex: string): RGBA | null {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  if (hex.length === 6) {
    const n = parseInt(hex, 16);
    if (isNaN(n)) return null;
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }
  if (hex.length === 8) {
    const n = parseInt(hex, 16);
    if (isNaN(n)) return null;
    return { r: (n >> 24) & 255, g: (n >> 16) & 255, b: (n >> 8) & 255, a: (n & 255) / 255 };
  }
  return null;
}

function parseColor(str: string): HSVA {
  str = str.trim();
  // rgba(r, g, b, a)
  const rgbaMatch = str.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/);
  if (rgbaMatch) {
    const r = clamp(parseInt(rgbaMatch[1]), 0, 255);
    const g = clamp(parseInt(rgbaMatch[2]), 0, 255);
    const b = clamp(parseInt(rgbaMatch[3]), 0, 255);
    const a = rgbaMatch[4] !== undefined ? clamp(parseFloat(rgbaMatch[4]), 0, 1) : 1;
    const [h, s, v] = rgbToHsv(r, g, b);
    return { h, s, v, a };
  }
  // hex
  const rgba = hexToRgb(str);
  if (rgba) {
    const [h, s, v] = rgbToHsv(rgba.r, rgba.g, rgba.b);
    return { h, s, v, a: rgba.a };
  }
  // fallback
  return { h: 210, s: 70, v: 90, a: 1 };
}

function formatColor(hsva: HSVA, showAlpha: boolean): string {
  const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
  if (showAlpha && hsva.a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${Math.round(hsva.a * 100) / 100})`;
  }
  return rgbToHex(r, g, b);
}

// ─── 拖拽 Hook ───

function useDrag(
  onDrag: (x: number, y: number, rect: DOMRect) => void,
) {
  const ref = useRef<HTMLDivElement>(null);
  const onDragRef = useRef(onDrag);
  onDragRef.current = onDrag;

  const handleStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // mousedown 立即响应，不节流
    onDragRef.current(e.clientX - rect.left, e.clientY - rect.top, rect);

    const onMove = throttle((ev: MouseEvent) => {
      onDragRef.current(ev.clientX - rect.left, ev.clientY - rect.top, rect);
    }, 16); // ~60fps

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  return { ref, onMouseDown: handleStart };
}

// ─── Props ───

export interface ColorPickerProps {
  /** Color value (controlled) */
  value?: string;
  /** Default颜Color */
  defaultValue?: string;
  /** Color change callback */
  onChange?: (color: string) => void;
  /** 显示透明度 */
  showAlpha?: boolean;
  /** Disabled */
  disabled?: boolean;
  /** 触发器Size */
  size?: 'small' | 'medium' | 'large';
  /** Presets颜Color */
  presets?: string[];
  /** Placement */
  placement?: PopoverPlacement;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ─── Component ───

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  defaultValue = '#1677ff',
  onChange,
  showAlpha = false,
  disabled = false,
  size: sizeProp,
  presets,
  placement = 'bottom',
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [hsva, setHsva] = useState<HSVA>(() => parseColor(isControlled ? value! : defaultValue));
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState('');

  // 用 ref 保存最新值，避免拖拽闭包捕获旧值
  const hsvaRef = useRef(hsva);
  hsvaRef.current = hsva;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // 同步Controlled值（保留退化Color的 hue/saturation）
  useEffect(() => {
    if (isControlled) {
      const parsed = parseColor(value!);
      setHsva(prev => {
        // 纯黑(v=0)时 hue/sat 无意义，保留之前的
        if (parsed.v === 0) return { ...prev, s: parsed.s || prev.s, v: 0, a: parsed.a };
        // 灰Color(s=0)时 hue 无意义，保留之前的
        if (parsed.s === 0) return { h: prev.h, s: 0, v: parsed.v, a: parsed.a };
        return parsed;
      });
    }
  }, [value, isControlled]);

  // 同步 hex Input框
  useEffect(() => {
    const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
    setHexInput(rgbToHex(r, g, b).replace('#', '').toUpperCase());
  }, [hsva.h, hsva.s, hsva.v]);

  const updateColor = useCallback((next: HSVA) => {
    if (!isControlled) setHsva(next);
    onChangeRef.current?.(formatColor(next, showAlpha));
  }, [isControlled, showAlpha]);

  // Current RGB
  const [r, g, b] = hsvToRgb(hsva.h, hsva.s, hsva.v);
  const hueColor = `hsl(${hsva.h}, 100%, 50%)`;
  const displayColor = hsva.a < 1
    ? `rgba(${r}, ${g}, ${b}, ${hsva.a})`
    : rgbToHex(r, g, b);

  // ─── Saturation / BrightnessPanel ───
  const svDrag = useDrag(useCallback((x: number, y: number, rect: DOMRect) => {
    const s = clamp(x / rect.width * 100, 0, 100);
    const v = clamp(100 - y / rect.height * 100, 0, 100);
    const next = { ...hsvaRef.current, s, v };
    if (!isControlled) setHsva(next);
    onChangeRef.current?.(formatColor(next, showAlpha));
  }, [isControlled, showAlpha]));

  // ─── Hue bar ───
  const hueDrag = useDrag(useCallback((x: number, _y: number, rect: DOMRect) => {
    const h = clamp(Math.round(x / rect.width * 359), 0, 359);
    const next = { ...hsvaRef.current, h };
    if (!isControlled) setHsva(next);
    onChangeRef.current?.(formatColor(next, showAlpha));
  }, [isControlled, showAlpha]));

  // ─── Alpha bar ───
  const alphaDrag = useDrag(useCallback((x: number, _y: number, rect: DOMRect) => {
    const a = clamp(Math.round(x / rect.width * 100) / 100, 0, 1);
    const next = { ...hsvaRef.current, a };
    if (!isControlled) setHsva(next);
    onChangeRef.current?.(formatColor(next, showAlpha));
  }, [isControlled, showAlpha]));

  // ─── Hex Input ───
  const handleHexChange = (val: string) => {
    setHexInput(val.replace('#', '').toUpperCase());
  };

  const handleHexBlur = () => {
    const parsed = hexToRgb(hexInput);
    if (parsed) {
      const [h, s, v] = rgbToHsv(parsed.r, parsed.g, parsed.b);
      updateColor({ h, s, v, a: hsva.a });
    } else {
      const [cr, cg, cb] = hsvToRgb(hsva.h, hsva.s, hsva.v);
      setHexInput(rgbToHex(cr, cg, cb).replace('#', '').toUpperCase());
    }
  };

  // ─── RGB Input ───
  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: number | null) => {
    const nr = channel === 'r' ? (val ?? 0) : r;
    const ng = channel === 'g' ? (val ?? 0) : g;
    const nb = channel === 'b' ? (val ?? 0) : b;
    const [h, s, v] = rgbToHsv(nr, ng, nb);
    updateColor({ h, s, v, a: hsva.a });
  };

  const handleAlphaInput = (val: number | null) => {
    updateColor({ ...hsva, a: clamp((val ?? 100) / 100, 0, 1) });
  };

  // ─── Presets ───
  const handlePreset = (color: string) => {
    const parsed = parseColor(color);
    updateColor(parsed);
  };

  const cls = [
    'aero-colorpicker',
    `aero-colorpicker--${size}`,
    disabled ? 'aero-colorpicker--disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  // ─── Panel ───
  const panel = (
    <div className="aero-colorpicker-panel">
      {/* Saturation / Brightness */}
      <div
        className="aero-colorpicker-saturation"
        ref={svDrag.ref}
        onMouseDown={svDrag.onMouseDown}
        style={{ backgroundColor: hueColor }}
      >
        <div className="aero-colorpicker-saturation__white" />
        <div className="aero-colorpicker-saturation__black" />
        <div
          className="aero-colorpicker-saturation__cursor"
          style={{
            left: `${hsva.s}%`,
            top: `${100 - hsva.v}%`,
            backgroundColor: displayColor,
          }}
        />
      </div>

      {/* Hue bar */}
      <div
        className="aero-colorpicker-hue"
        ref={hueDrag.ref}
        onMouseDown={hueDrag.onMouseDown}
      >
        <div
          className="aero-colorpicker-hue__cursor"
          style={{
            left: `${hsva.h / 360 * 100}%`,
            backgroundColor: hueColor,
          }}
        />
      </div>

      {/* Alpha bar */}
      {showAlpha && (
        <div
          className="aero-colorpicker-alpha"
          ref={alphaDrag.ref}
          onMouseDown={alphaDrag.onMouseDown}
        >
          <div
            className="aero-colorpicker-alpha__gradient"
            style={{
              background: `linear-gradient(to right, transparent, rgb(${r}, ${g}, ${b}))`,
            }}
          />
          <div
            className="aero-colorpicker-alpha__cursor"
            style={{
              left: `${hsva.a * 100}%`,
              backgroundColor: displayColor,
            }}
          />
        </div>
      )}

      {/* Input area */}
      <div className="aero-colorpicker-inputs">
        <div className="aero-colorpicker-inputs__hex">
          <Input
            size="small"
            prefix="#"
            value={hexInput}
            onChange={handleHexChange}
            onBlur={() => handleHexBlur()}
            onPressEnter={() => handleHexBlur()}
            maxLength={6}
          />
          <span className="aero-colorpicker-inputs__label">HEX</span>
        </div>
        <div className="aero-colorpicker-inputs__rgb">
          <div className="aero-colorpicker-inputs__field">
            <InputNumber size="small" min={0} max={255} controls={false} value={r} onChange={v => handleRgbChange('r', v)} />
            <span className="aero-colorpicker-inputs__label">R</span>
          </div>
          <div className="aero-colorpicker-inputs__field">
            <InputNumber size="small" min={0} max={255} controls={false} value={g} onChange={v => handleRgbChange('g', v)} />
            <span className="aero-colorpicker-inputs__label">G</span>
          </div>
          <div className="aero-colorpicker-inputs__field">
            <InputNumber size="small" min={0} max={255} controls={false} value={b} onChange={v => handleRgbChange('b', v)} />
            <span className="aero-colorpicker-inputs__label">B</span>
          </div>
          {showAlpha && (
            <div className="aero-colorpicker-inputs__field">
              <InputNumber size="small" min={0} max={100} controls={false} value={Math.round(hsva.a * 100)} onChange={handleAlphaInput} />
              <span className="aero-colorpicker-inputs__label">A</span>
            </div>
          )}
        </div>
      </div>

      {/* Presets */}
      {presets && presets.length > 0 && (
        <div className="aero-colorpicker-presets">
          {presets.map((color, i) => (
            <div
              key={i}
              className="aero-colorpicker-presets__item"
              style={{ backgroundColor: color }}
              onClick={() => handlePreset(color)}
            />
          ))}
        </div>
      )}
    </div>
  );

  // ─── 触发器 ───
  const trigger = (
    <div className={cls} style={style}>
      <div className="aero-colorpicker__swatch" style={{ backgroundColor: displayColor }} />
      <span className="aero-colorpicker__text">{rgbToHex(r, g, b).toUpperCase()}</span>
    </div>
  );

  if (disabled) return trigger;

  return (
    <Popover
      content={panel}
      trigger="click"
      placement={placement}
      open={open}
      onOpenChange={setOpen}
    >
      {trigger}
    </Popover>
  );
};

export default ColorPicker;

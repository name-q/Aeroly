import React, { useMemo, useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import type { ConfigContextValue, SizeType, ThemeConfig } from './ConfigContext';
import type { Locale } from '../locale/types';

export type { SizeType, ThemeConfig } from './ConfigContext';
export type { Locale } from '../locale/types';

export interface ConfigProviderProps {
  /** Locale */
  locale?: Locale;
  /** Global size */
  size?: SizeType;
  /** Theme variables, key is variable name (without --aero- prefix), e.g. { 'primary-color': '#ff6600' } */
  theme?: ThemeConfig;
  children?: React.ReactNode;
}

/** Parse color to [r, g, b] */
function parseColor(color: string): [number, number, number] | null {
  let m = /^#([0-9a-f]{3,8})$/i.exec(color);
  if (m) {
    let hex = m[1];
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    if (hex.length >= 6) {
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
  }
  m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/.exec(color);
  if (m) return [+m[1], +m[2], +m[3]];
  return null;
}

function toRGBStr(rgb: [number, number, number]): string {
  return `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
}

function toHex(rgb: [number, number, number]): string {
  return '#' + rgb.map(c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('');
}

/** Simulate Less lighten — increase L in HSL space */
function lighten(rgb: [number, number, number], amount: number): [number, number, number] {
  const [h, s, l] = rgbToHsl(rgb);
  return hslToRgb([h, s, Math.min(1, l + amount / 100)]);
}

/** Simulate Less darken — decrease L in HSL space */
function darken(rgb: [number, number, number], amount: number): [number, number, number] {
  const [h, s, l] = rgbToHsl(rgb);
  return hslToRgb([h, s, Math.max(0, l - amount / 100)]);
}

function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}

function hslToRgb([h, s, l]: [number, number, number]): [number, number, number] {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1/3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1/3) * 255),
  ];
}

/** Color variables that need auto-derived keys */
const COLOR_KEYS = ['primary-color', 'success-color', 'warning-color', 'error-color'];

/** primary-color derived color mappings (aligned with variables.less) */
const PRIMARY_DERIVATIVES: [string, (rgb: [number, number, number]) => [number, number, number]][] = [
  ['primary-color-hover', rgb => lighten(rgb, 6)],
  ['primary-color-active', rgb => darken(rgb, 6)],
  ['primary-color-light-1', rgb => lighten(rgb, 4)],
  ['primary-color-light-2', rgb => lighten(rgb, 8)],
  ['primary-color-light-3', rgb => lighten(rgb, 10)],
  ['primary-color-light-4', rgb => lighten(rgb, 12)],
];

/** Derived color mappings for status colors */
const COLOR_DERIVATIVES: Record<string, [string, (rgb: [number, number, number]) => [number, number, number]][]> = {
  'primary-color': PRIMARY_DERIVATIVES,
  'success-color': [
    ['success-color-light', rgb => lighten(rgb, 12)],
  ],
  'warning-color': [
    ['warning-color-dark', rgb => darken(rgb, 6)],
  ],
  'error-color': [
    ['error-color-light-1', rgb => lighten(rgb, 10)],
    ['error-color-light-2', rgb => lighten(rgb, 12)],
  ],
};

function buildThemeStyle(theme?: ThemeConfig): React.CSSProperties | undefined {
  if (!theme) return undefined;
  const style: Record<string, string> = {};
  for (const key in theme) {
    style[`--aero-${key}`] = theme[key];
    const rgb = parseColor(theme[key]);
    if (!rgb) continue;
    // Auto-derive RGB channel value variables
    if (COLOR_KEYS.includes(key)) {
      style[`--aero-${key}-rgb`] = toRGBStr(rgb);
    }
    // Auto-derive hover/active/light variants (when not manually specified)
    const derivatives = COLOR_DERIVATIVES[key];
    if (derivatives) {
      for (const [suffix, fn] of derivatives) {
        if (!(suffix in theme)) {
          style[`--aero-${suffix}`] = toHex(fn(rgb));
        }
      }
    }
  }
  return style as React.CSSProperties;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({
  locale,
  size,
  theme,
  children,
}) => {
  const parentConfig = useContext(ConfigContext);

  const mergedConfig = useMemo<ConfigContextValue>(() => ({
    locale: locale ?? parentConfig.locale,
    size: size ?? parentConfig.size,
    theme: theme ?? parentConfig.theme,
  }), [locale, size, theme, parentConfig]);

  const themeStyle = useMemo(() => buildThemeStyle(mergedConfig.theme), [mergedConfig.theme]);

  return (
    <ConfigContext.Provider value={mergedConfig}>
      {themeStyle ? (
        <div className="aero-config-provider" style={themeStyle}>
          {children}
        </div>
      ) : children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;

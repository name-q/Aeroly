import { createContext } from 'react';
import type { Locale } from '../locale/types';
import zhCN from '../locale/zh_CN';

export type SizeType = 'small' | 'medium' | 'large';

/** 主题配置，key 为 CSS Variable 名（不含 --aero- 前缀） */
export type ThemeConfig = Record<string, string>;

export interface ConfigContextValue {
  /** 语言包 */
  locale: Locale;
  /** 全局尺寸 */
  size?: SizeType;
  /** 主题变量 */
  theme?: ThemeConfig;
}

export const defaultConfig: ConfigContextValue = {
  locale: zhCN,
  size: undefined,
  theme: undefined,
};

export const ConfigContext = createContext<ConfigContextValue>(defaultConfig);

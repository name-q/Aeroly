import { createContext } from 'react';
import type { Locale } from '../locale/types';
import zhCN from '../locale/zh_CN';

export type SizeType = 'small' | 'medium' | 'large';

/** Theme config, key is CSS Variable name (without --aero- prefix) */
export type ThemeConfig = Record<string, string>;

export interface ConfigContextValue {
  /** Locale */
  locale: Locale;
  /** Global size */
  size?: SizeType;
  /** Theme variables */
  theme?: ThemeConfig;
}

export const defaultConfig: ConfigContextValue = {
  locale: zhCN,
  size: undefined,
  theme: undefined,
};

export const ConfigContext = createContext<ConfigContextValue>(defaultConfig);

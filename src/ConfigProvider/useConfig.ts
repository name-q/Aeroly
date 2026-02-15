import { useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import type { ConfigContextValue, SizeType } from './ConfigContext';
import type { Locale } from '../locale/types';

/** 获取完整 config */
export function useConfig(): ConfigContextValue {
  return useContext(ConfigContext);
}

/** 获取组件级 locale 命名空间 */
export function useLocale<K extends keyof Locale>(component: K): Locale[K] {
  const { locale } = useContext(ConfigContext);
  return locale[component];
}

/** 合并组件自身 size 和全局 size，组件 prop 优先 */
export function useSize(componentSize?: SizeType): SizeType {
  const { size: globalSize } = useContext(ConfigContext);
  return componentSize ?? globalSize ?? 'medium';
}

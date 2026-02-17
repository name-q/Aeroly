import { useContext } from 'react';
import { ConfigContext } from './ConfigContext';
import type { ConfigContextValue, SizeType } from './ConfigContext';
import type { Locale } from '../locale/types';

/** Get full config */
export function useConfig(): ConfigContextValue {
  return useContext(ConfigContext);
}

/** Get component-level locale namespace */
export function useLocale<K extends keyof Locale>(component: K): Locale[K] {
  const { locale } = useContext(ConfigContext);
  return locale[component];
}

/** Merge component size with global size, component prop takes priority */
export function useSize(componentSize?: SizeType): SizeType {
  const { size: globalSize } = useContext(ConfigContext);
  return componentSize ?? globalSize ?? 'medium';
}

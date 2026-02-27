import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useConfig, useLocale, useSize } from '../useConfig';
import { ConfigContext, defaultConfig } from '../ConfigContext';
import type { ConfigContextValue, SizeType } from '../ConfigContext';
import enUS from '../../locale/en_US';
import zhCN from '../../locale/zh_CN';

// Helper to wrap hooks with a custom ConfigContext value
function wrapper(value: Partial<ConfigContextValue>) {
  const merged = { ...defaultConfig, ...value };
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(ConfigContext.Provider, { value: merged }, children);
}

describe('useConfig', () => {
  it('returns default config when no provider', () => {
    const { result } = renderHook(() => useConfig());
    expect(result.current.locale).toBe(zhCN);
    expect(result.current.size).toBeUndefined();
    expect(result.current.theme).toBeUndefined();
  });

  it('returns provided config', () => {
    const { result } = renderHook(() => useConfig(), {
      wrapper: wrapper({ locale: enUS, size: 'large' }),
    });
    expect(result.current.locale).toBe(enUS);
    expect(result.current.size).toBe('large');
  });
});

describe('useLocale', () => {
  it('returns zh_CN Modal locale by default', () => {
    const { result } = renderHook(() => useLocale('Modal'));
    expect(result.current.okText).toBe('确定');
    expect(result.current.cancelText).toBe('取消');
  });

  it('returns en_US Modal locale when configured', () => {
    const { result } = renderHook(() => useLocale('Modal'), {
      wrapper: wrapper({ locale: enUS }),
    });
    expect(result.current.okText).toBe('OK');
    expect(result.current.cancelText).toBe('Cancel');
  });

  it('returns correct namespace for different components', () => {
    const { result } = renderHook(() => useLocale('Tour'), {
      wrapper: wrapper({ locale: enUS }),
    });
    expect(result.current.prevStep).toBe('Previous');
    expect(result.current.nextStep).toBe('Next');
    expect(result.current.finish).toBe('Finish');
  });
});

describe('useSize', () => {
  it('returns medium by default (no provider, no prop)', () => {
    const { result } = renderHook(() => useSize());
    expect(result.current).toBe('medium');
  });

  it('returns global size when no component prop', () => {
    const { result } = renderHook(() => useSize(), {
      wrapper: wrapper({ size: 'small' }),
    });
    expect(result.current).toBe('small');
  });

  it('component prop overrides global size', () => {
    const { result } = renderHook(() => useSize('large'), {
      wrapper: wrapper({ size: 'small' }),
    });
    expect(result.current).toBe('large');
  });

  it('component prop works without provider', () => {
    const { result } = renderHook(() => useSize('small'));
    expect(result.current).toBe('small');
  });

  it('returns global size for all valid values', () => {
    const sizes: SizeType[] = ['small', 'medium', 'large'];
    for (const size of sizes) {
      const { result } = renderHook(() => useSize(), {
        wrapper: wrapper({ size }),
      });
      expect(result.current).toBe(size);
    }
  });
});

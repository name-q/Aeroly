import React, { useState, useEffect, useRef, useCallback } from 'react';
import './index.less';

// ---- Types ----

export type StatisticStatus = 'default' | 'success' | 'warning' | 'error';

export interface StatisticProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 数值 */
  value: number | string;
  /** 精度（小数位数），仅 value 为 number 时生效 */
  precision?: number;
  /** 前缀（图标或文字） */
  prefix?: React.ReactNode;
  /** 后缀（单位等） */
  suffix?: React.ReactNode;
  /** 千分位分隔符 */
  groupSeparator?: string;
  /** 小数点字符 */
  decimalSeparator?: string;
  /** 自定义数值格式化 */
  formatter?: (value: number | string) => React.ReactNode;
  /** 是否开启数值滚动动画 */
  animated?: boolean;
  /** 动画时长（ms） */
  animationDuration?: number;
  /** 状态色 */
  status?: StatisticStatus;
  /** 是否加载中 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CountdownProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 目标时间戳（ms） */
  value: number;
  /** 格式化模板 */
  format?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 状态色 */
  status?: StatisticStatus;
  /** 倒计时结束回调 */
  onFinish?: () => void;
  /** 变化回调（每秒） */
  onChange?: (remaining: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 工具函数 ----

function formatNumber(
  value: number,
  precision: number | undefined,
  groupSeparator: string,
  decimalSeparator: string,
): string {
  const fixed = precision !== undefined ? value.toFixed(precision) : String(value);
  const [intPart, decPart] = fixed.split('.');
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  return decPart !== undefined ? `${grouped}${decimalSeparator}${decPart}` : grouped;
}

function padZero(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

function formatCountdown(remaining: number, format: string): string {
  const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let result = format;
  if (result.includes('D')) {
    result = result.replace('DD', padZero(days)).replace('D', String(days));
  } else {
    // 没有天占位时，小时要累加天数
    const totalHours = days * 24 + hours;
    result = result.replace('HH', padZero(totalHours)).replace('H', String(totalHours));
    result = result.replace('mm', padZero(minutes)).replace('m', String(minutes));
    result = result.replace('ss', padZero(seconds)).replace('s', String(seconds));
    return result;
  }
  result = result.replace('HH', padZero(hours)).replace('H', String(hours));
  result = result.replace('mm', padZero(minutes)).replace('m', String(minutes));
  result = result.replace('ss', padZero(seconds)).replace('s', String(seconds));
  return result;
}

// ---- easeOutExpo ----
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// ---- useAnimatedValue ----
function useAnimatedValue(
  target: number,
  enabled: boolean,
  duration: number,
  precision: number | undefined,
  groupSeparator: string,
  decimalSeparator: string,
): string {
  const [display, setDisplay] = useState(() =>
    formatNumber(target, precision, groupSeparator, decimalSeparator),
  );
  const prevRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      prevRef.current = target;
      setDisplay(formatNumber(target, precision, groupSeparator, decimalSeparator));
      return;
    }

    const from = prevRef.current;
    const to = target;
    prevRef.current = to;

    if (from === to) return;

    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      const current = from + (to - from) * eased;
      setDisplay(formatNumber(current, precision, groupSeparator, decimalSeparator));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [target, enabled, duration, precision, groupSeparator, decimalSeparator]);

  return display;
}

// ---- Statistic ----

const Statistic: React.FC<StatisticProps> & { Countdown: React.FC<CountdownProps> } = ({
  title,
  value,
  precision,
  prefix,
  suffix,
  groupSeparator = ',',
  decimalSeparator = '.',
  formatter,
  animated = false,
  animationDuration = 800,
  status = 'default',
  loading = false,
  className,
  style,
}) => {
  const isNumber = typeof value === 'number';

  const animatedDisplay = useAnimatedValue(
    isNumber ? value : 0,
    animated && isNumber,
    animationDuration,
    precision,
    groupSeparator,
    decimalSeparator,
  );

  let displayValue: React.ReactNode;
  if (formatter) {
    displayValue = formatter(value);
  } else if (isNumber) {
    displayValue = animated
      ? animatedDisplay
      : formatNumber(value, precision, groupSeparator, decimalSeparator);
  } else {
    displayValue = value;
  }

  const cls = [
    'aero-statistic',
    status !== 'default' ? `aero-statistic--${status}` : '',
    loading ? 'aero-statistic--loading' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      {title && <div className="aero-statistic-title">{title}</div>}
      <div className="aero-statistic-value">
        {prefix && <span className="aero-statistic-prefix">{prefix}</span>}
        <span className="aero-statistic-number">
          {loading ? <span className="aero-statistic-skeleton" /> : displayValue}
        </span>
        {suffix && <span className="aero-statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

// ---- Countdown ----

const Countdown: React.FC<CountdownProps> = ({
  title,
  value: target,
  format = 'HH:mm:ss',
  prefix,
  suffix,
  status = 'default',
  onFinish,
  onChange,
  className,
  style,
}) => {
  const getRemaining = useCallback(() => Math.max(0, target - Date.now()), [target]);
  const [remaining, setRemaining] = useState(getRemaining);
  const onFinishRef = useRef(onFinish);
  const onChangeRef = useRef(onChange);
  onFinishRef.current = onFinish;
  onChangeRef.current = onChange;

  useEffect(() => {
    const tick = () => {
      const r = Math.max(0, target - Date.now());
      setRemaining(r);
      onChangeRef.current?.(r);
      if (r <= 0) {
        onFinishRef.current?.();
        return;
      }
      timer = window.setTimeout(tick, 1000);
    };
    let timer = window.setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [target]);

  const cls = [
    'aero-statistic',
    status !== 'default' ? `aero-statistic--${status}` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      {title && <div className="aero-statistic-title">{title}</div>}
      <div className="aero-statistic-value">
        {prefix && <span className="aero-statistic-prefix">{prefix}</span>}
        <span className="aero-statistic-number">{formatCountdown(remaining, format)}</span>
        {suffix && <span className="aero-statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

Statistic.Countdown = Countdown;

export default Statistic;

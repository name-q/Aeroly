import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface InputNumberProps {
  /** Current value (controlled)，null 表示空 */
  value?: number | null;
  /** Default value */
  defaultValue?: number | null;
  /** Value change callback */
  onChange?: (value: number | null) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step */
  step?: number;
  /** 小数精度 */
  precision?: number;
  /** Disabled */
  disabled?: boolean;
  /** 只读 */
  readOnly?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Status */
  status?: 'error' | 'warning';
  /** Placeholder */
  placeholder?: string;
  /** Whether visibleStep buttons */
  controls?: boolean;
  /** PrefixContent */
  prefix?: React.ReactNode;
  /** Format display */
  formatter?: (value: number | undefined) => string;
  /** 从显示值解析数字 */
  parser?: (displayValue: string) => number;
  /** Whether支持Keyboard上下键 */
  keyboard?: boolean;
  /** 步进Callback */
  onStep?: (value: number, info: { offset: number; type: 'up' | 'down' }) => void;
  /** 回车Callback */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Focus callback */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur callback */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Utilities ----

function getPrecision(num: number): number {
  const str = String(num);
  const dotIndex = str.indexOf('.');
  return dotIndex === -1 ? 0 : str.length - dotIndex - 1;
}

function toFixed(num: number, precision: number): number {
  const safePrecision = Math.min(Math.max(precision, 0), 100);
  return Number(Number(num).toFixed(safePrecision));
}

// 安全的数字上下限
const SAFE_MAX = Number.MAX_SAFE_INTEGER;
const SAFE_MIN = -Number.MAX_SAFE_INTEGER;

function safeClamp(val: number, min: number, max: number): number {
  const lo = Number.isFinite(min) ? min : SAFE_MIN;
  const hi = Number.isFinite(max) ? max : SAFE_MAX;
  return Math.min(Math.max(val, lo), hi);
}

// 数字转字符串，避免科学计数法
function numberToString(num: number, precision: number): string {
  if (!Number.isFinite(num)) return '';
  const safePrecision = Math.min(Math.max(precision, 0), 100);
  if (safePrecision > 0) return num.toFixed(safePrecision);
  if (Number.isInteger(num)) return num.toFixed(0);
  return String(num);
}

// ---- InputNumber ----

const InputNumber: React.FC<InputNumberProps> = ({
  value,
  defaultValue = null,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision: precisionProp,
  disabled = false,
  readOnly = false,
  size: sizeProp,
  status,
  placeholder,
  controls = true,
  prefix,
  formatter,
  parser,
  keyboard = true,
  onStep,
  onPressEnter,
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<number | null>(defaultValue);
  const currentValue = isControlled ? value! : internalValue;

  // 精度：优先 prop，否则从 step 推导
  const precision = precisionProp ?? getPrecision(step);

  // Input框Display text
  const formatValue = useCallback(
    (val: number | null | undefined): string => {
      if (val === null || val === undefined) return '';
      if (!Number.isFinite(val)) return '';
      if (formatter) return formatter(val);
      return numberToString(val, precision);
    },
    [formatter, precision],
  );

  const [displayValue, setDisplayValue] = useState(() => formatValue(currentValue));
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 同步外部 value 变化到 displayValue（非聚焦时）
  const prevValueRef = useRef(currentValue);
  if (prevValueRef.current !== currentValue && !focused) {
    prevValueRef.current = currentValue;
    setDisplayValue(formatValue(currentValue));
  }

  const triggerChange = useCallback(
    (val: number | null) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const parseInput = useCallback(
    (text: string): number => {
      if (parser) return parser(text);
      return parseFloat(text);
    },
    [parser],
  );

  // 步进
  const doStep = useCallback(
    (type: 'up' | 'down') => {
      if (disabled || readOnly) return;
      const base = currentValue ?? 0;
      const offset = type === 'up' ? step : -step;
      const raw = base + offset;
      const clamped = safeClamp(toFixed(raw, precision), min, max);
      triggerChange(clamped);
      setDisplayValue(formatValue(clamped));
      onStep?.(clamped, { offset: step, type });
    },
    [currentValue, step, precision, min, max, disabled, readOnly, triggerChange, formatValue, onStep],
  );

  // 长按
  const timerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startLongPress = useCallback(
    (type: 'up' | 'down') => {
      doStep(type);
      timerRef.current = window.setTimeout(() => {
        intervalRef.current = window.setInterval(() => doStep(type), 50);
      }, 300);
    },
    [doStep],
  );

  const stopLongPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => stopLongPress, [stopLongPress]);

  // Input处理 — 实时解析并Notifications Form，让Validation能即时响应
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setDisplayValue(text);

    const trimmed = text.trim();
    if (trimmed === '') {
      triggerChange(null);
    } else {
      const parsed = parseInput(trimmed);
      if (!isNaN(parsed)) {
        triggerChange(safeClamp(toFixed(parsed, precision), min, max));
      }
    }
  };

  const commitValue = useCallback(() => {
    const text = displayValue.trim();
    if (text === '') {
      // 仅当值确实有变化时才Notifications（避免聚焦不Input直接 blur 触发Validation）
      if (currentValue !== null && currentValue !== undefined && String(currentValue) !== '') {
        triggerChange(null);
      }
      setDisplayValue('');
      return;
    }
    const parsed = parseInput(text);
    if (isNaN(parsed)) {
      // 无效Input，恢复
      setDisplayValue(formatValue(currentValue));
      return;
    }
    const clamped = safeClamp(toFixed(parsed, precision), min, max);
    triggerChange(clamped);
    setDisplayValue(formatValue(clamped));
  }, [displayValue, parseInput, precision, min, max, triggerChange, formatValue, currentValue]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    // 聚焦时如果有 formatter，显示纯数字方便编辑
    if (formatter && currentValue !== null && currentValue !== undefined) {
      setDisplayValue(numberToString(currentValue, precision));
    }
    onFocusProp?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    commitValue();
    onBlurProp?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitValue();
      onPressEnter?.(e);
    }
    if (keyboard) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        doStep('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        doStep('down');
      }
    }
  };

  const isAtMin = currentValue !== null && currentValue !== undefined && currentValue <= min;
  const isAtMax = currentValue !== null && currentValue !== undefined && currentValue >= max;

  const iconSize = size === 'small' ? 12 : size === 'large' ? 16 : 14;

  const wrapperCls = [
    'aero-input-number',
    `aero-input-number--${size}`,
    focused ? 'aero-input-number--focused' : '',
    disabled ? 'aero-input-number--disabled' : '',
    status ? `aero-input-number--${status}` : '',
    controls ? '' : 'aero-input-number--no-controls',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls} style={style}>
      {/* Prefix */}
      {prefix && <span className="aero-input-number-prefix">{prefix}</span>}

      {/* Input container: mirror stretches width, input absolutely positioned on top */}
      <span className="aero-input-number-body">
        <span className="aero-input-number-mirror" aria-hidden="true">
          {displayValue || placeholder || ''}
        </span>

        <input
          ref={inputRef}
          className="aero-input-number-input"
          type="text"
          inputMode="decimal"
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </span>

      {/* Step buttons */}
      {controls && (
        <span className="aero-input-number-controls">
          <button
            className={[
              'aero-input-number-step',
              'aero-input-number-step--up',
              isAtMax || disabled || readOnly ? 'aero-input-number-step--disabled' : '',
            ].filter(Boolean).join(' ')}
            type="button"
            tabIndex={-1}
            disabled={disabled || readOnly || isAtMax}
            onMouseDown={(e) => {
              e.preventDefault();
              startLongPress('up');
            }}
            onMouseUp={stopLongPress}
            onMouseLeave={stopLongPress}
          >
            <Icon icon={ChevronUp} size={iconSize} />
          </button>
          <button
            className={[
              'aero-input-number-step',
              'aero-input-number-step--down',
              isAtMin || disabled || readOnly ? 'aero-input-number-step--disabled' : '',
            ].filter(Boolean).join(' ')}
            type="button"
            tabIndex={-1}
            disabled={disabled || readOnly || isAtMin}
            onMouseDown={(e) => {
              e.preventDefault();
              startLongPress('down');
            }}
            onMouseUp={stopLongPress}
            onMouseLeave={stopLongPress}
          >
            <Icon icon={ChevronDown} size={iconSize} />
          </button>
        </span>
      )}
    </div>
  );
};

(InputNumber as any).__AERO_FORM_CONTROL = true;

export default InputNumber;

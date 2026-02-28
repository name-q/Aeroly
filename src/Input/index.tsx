import React, { useState, useRef, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Eye, EyeOff, X, Loader } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface InputProps {
  /** Input value (controlled) */
  value?: string;
  /** Default value（uncontrolled) */
  defaultValue?: string;
  /** Value change callback */
  onChange?: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Whether disabled */
  disabled?: boolean;
  /** Whether readonly */
  readOnly?: boolean;
  /** Whether loading */
  loading?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Status */
  status?: 'error' | 'warning';
  /** InputType */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  /** Prefix icon（Lucide Iconcomponent) */
  prefixIcon?: LucideIcon;
  /** SuffixIcon（Lucide Iconcomponent) */
  suffixIcon?: LucideIcon;
  /** Prefix content (text/node) */
  prefix?: React.ReactNode;
  /** Suffix content (text/node) */
  suffix?: React.ReactNode;
  /** Addon before (outside input, left side) */
  addonBefore?: React.ReactNode;
  /** Addon after (outside input, right side) */
  addonAfter?: React.ReactNode;
  /** Whether clearable */
  allowClear?: boolean;
  /** Max length */
  maxLength?: number;
  /** Whether to show character count (requires maxLength) */
  showCount?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Focus callback */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur callback */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** Enter key callback */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Key press callback */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Input ----

const Input: React.FC<InputProps> = ({
  value,
  defaultValue = '',
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  loading = false,
  size: sizeProp,
  status,
  type = 'text',
  prefixIcon,
  suffixIcon,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  allowClear = false,
  maxLength,
  showCount = false,
  autoFocus = false,
  onFocus,
  onBlur,
  onPressEnter,
  onKeyDown,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;
  const [focused, setFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPassword = type === 'password';
  const inputType = isPassword ? (passwordVisible ? 'text' : 'password') : type;

  const triggerChange = useCallback(
    (val: string) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    triggerChange(e.target.value);
  };

  const handleClear = () => {
    triggerChange('');
    inputRef.current?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    onKeyDown?.(e);
  };

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  // Whether to show clear button
  const showClear = allowClear && currentValue.length > 0 && !disabled && !readOnly;

  // Suffix areaContent
  const hasSuffix = suffixIcon || suffix || isPassword || showClear || loading || showCount;

  const hasAddon = addonBefore || addonAfter;

  const wrapperClassNames = [
    'aero-input-wrapper',
    `aero-input-wrapper--${size}`,
    focused ? 'aero-input-wrapper--focused' : '',
    disabled ? 'aero-input-wrapper--disabled' : '',
    status ? `aero-input-wrapper--${status}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputEl = (
    <div className={wrapperClassNames} style={hasAddon ? undefined : style}>
      {/* Prefix */}
      {(prefixIcon || prefix) && (
        <span className="aero-input-prefix">
          {prefixIcon && <Icon icon={prefixIcon} size={iconSize} />}
          {prefix}
        </span>
      )}

      <input
        ref={inputRef}
        className="aero-input"
        type={inputType}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {/* Suffix area */}
      {hasSuffix && (
        <span className="aero-input-suffix">
          {loading && <Icon icon={Loader} spin size={iconSize} />}
          {showClear && (
            <span
              className="aero-input-clear"
              onClick={handleClear}
              role="button"
              tabIndex={-1}
            >
              <Icon icon={X} size={iconSize - 2} />
            </span>
          )}
          {isPassword && (
            <span
              className="aero-input-password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
              role="button"
              tabIndex={-1}
            >
              <Icon icon={passwordVisible ? EyeOff : Eye} size={iconSize} />
            </span>
          )}
          {showCount && (
            <span className="aero-input-count">
              {currentValue.length}{maxLength !== undefined ? ` / ${maxLength}` : ''}
            </span>
          )}
          {suffixIcon && <Icon icon={suffixIcon} size={iconSize} />}
          {suffix}
        </span>
      )}
    </div>
  );

  // Wrap with addon container
  if (hasAddon) {
    return (
      <div
        className={[
          'aero-input-group',
          `aero-input-group--${size}`,
          className || '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {addonBefore && (
          <span className="aero-input-addon aero-input-addon--before">{addonBefore}</span>
        )}
        {inputEl}
        {addonAfter && (
          <span className="aero-input-addon aero-input-addon--after">{addonAfter}</span>
        )}
      </div>
    );
  }

  return inputEl;
};

(Input as any).__AERO_FORM_CONTROL = true;

export default Input;

import React, { useState, useRef, useCallback } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Eye, EyeOff, X, Loader } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface InputProps {
  /** 输入值（受控） */
  value?: string;
  /** 默认值（非受控） */
  defaultValue?: string;
  /** 值变化回调 */
  onChange?: (value: string) => void;
  /** 占位文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 输入类型 */
  type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url';
  /** 前缀图标（Lucide 图标组件） */
  prefixIcon?: LucideIcon;
  /** 后缀图标（Lucide 图标组件） */
  suffixIcon?: LucideIcon;
  /** 前缀内容（文字/节点） */
  prefix?: React.ReactNode;
  /** 后缀内容（文字/节点） */
  suffix?: React.ReactNode;
  /** 前置附加内容（输入框外左侧） */
  addonBefore?: React.ReactNode;
  /** 后置附加内容（输入框外右侧） */
  addonAfter?: React.ReactNode;
  /** 是否可清除 */
  allowClear?: boolean;
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计（需配合 maxLength） */
  showCount?: boolean;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  /** 按下回车回调 */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 按键回调 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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

  // 是否显示清除按钮
  const showClear = allowClear && currentValue.length > 0 && !disabled && !readOnly;

  // 后缀区域内容
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
      {/* 前缀 */}
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

      {/* 后缀区域 */}
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

  // 有 addon 时包一层
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

export default Input;

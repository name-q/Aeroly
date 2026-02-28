import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface TextAreaProps {
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
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** ValidationStatus */
  status?: 'error' | 'warning';
  /** Max length */
  maxLength?: number;
  /** Whether to show character count */
  showCount?: boolean;
  /** 固定Number of rows（关闭自适应时生效） */
  rows?: number;
  /** 自适应高度，Default开启；可传对象限制最小/Maximum rows */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** Whether允许手动拖拽调整高度 */
  resize?: boolean;
  /** Auto focus */
  autoFocus?: boolean;
  /** Focus callback */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Blur callback */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Key press callback */
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- TextArea ----

const TextArea: React.FC<TextAreaProps> = ({
  value,
  defaultValue = '',
  onChange,
  placeholder,
  disabled = false,
  readOnly = false,
  size: sizeProp,
  status,
  maxLength,
  showCount = false,
  rows = 3,
  autoSize = true,
  resize = false,
  autoFocus = false,
  onFocus,
  onBlur,
  onKeyDown,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!isControlled) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  // 自适应高度核心逻辑
  const adjustHeight = useCallback(() => {
    const el = textareaRef.current;
    if (!el || !autoSize) return;

    // Reset以获取准确 scrollHeight
    el.style.height = 'auto';
    el.style.minHeight = '';
    el.style.maxHeight = '';

    const computed = getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.6;
    const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);

    const scrollH = el.scrollHeight; // Includes padding, excludes border

    if (typeof autoSize === 'object') {
      if (autoSize.minRows) {
        const min = autoSize.minRows * lineHeight + paddingY + borderY;
        el.style.minHeight = `${min}px`;
      }
      if (autoSize.maxRows) {
        const max = autoSize.maxRows * lineHeight + paddingY + borderY;
        el.style.maxHeight = `${max}px`;
        // scrollHeight 包含 padding 但不包含 border
        el.style.overflowY = (scrollH + borderY) > max ? 'auto' : 'hidden';
      } else {
        el.style.overflowY = 'hidden';
      }
    } else {
      el.style.overflowY = 'hidden';
    }

    // scrollHeight 已包含 padding，加上 border 即可
    el.style.height = `${scrollH + borderY}px`;
  }, [autoSize]);

  // useLayoutEffect 避免闪烁；size 变化时也需要重算（padding/font-size 影响 scrollHeight）
  useLayoutEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight, size]);

  const classNames = [
    'aero-textarea-wrapper',
    `aero-textarea-wrapper--${size}`,
    focused ? 'aero-textarea-wrapper--focused' : '',
    disabled ? 'aero-textarea-wrapper--disabled' : '',
    status ? `aero-textarea-wrapper--${status}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const textareaClassNames = [
    'aero-textarea',
    (!autoSize && resize) ? '' : 'aero-textarea--no-resize',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <textarea
        ref={textareaRef}
        className={textareaClassNames}
        value={currentValue}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        rows={autoSize ? 1 : rows}
        autoFocus={autoFocus}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
      />
      {showCount && (
        <span className="aero-textarea-count">
          {currentValue.length}{maxLength !== undefined ? ` / ${maxLength}` : ''}
        </span>
      )}
    </div>
  );
};

(TextArea as any).__AERO_FORM_CONTROL = true;

export default TextArea;

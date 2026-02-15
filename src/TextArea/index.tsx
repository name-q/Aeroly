import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface TextAreaProps {
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
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 校验状态 */
  status?: 'error' | 'warning';
  /** 最大长度 */
  maxLength?: number;
  /** 是否显示字数统计 */
  showCount?: boolean;
  /** 固定行数（关闭自适应时生效） */
  rows?: number;
  /** 自适应高度，默认开启；可传对象限制最小/最大行数 */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** 是否允许手动拖拽调整高度 */
  resize?: boolean;
  /** 自动聚焦 */
  autoFocus?: boolean;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** 按键回调 */
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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

    // 重置以获取准确 scrollHeight
    el.style.height = 'auto';
    el.style.minHeight = '';
    el.style.maxHeight = '';

    const computed = getComputedStyle(el);
    const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.6;
    const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
    const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);

    const scrollH = el.scrollHeight; // 包含 padding，不包含 border

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

  // useLayoutEffect 避免闪烁
  useLayoutEffect(() => {
    adjustHeight();
  }, [currentValue, adjustHeight]);

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

export default TextArea;

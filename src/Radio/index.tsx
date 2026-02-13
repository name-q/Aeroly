import React, { useState, useContext, createContext, useCallback } from 'react';
import './index.less';

// ---- Context ----

interface RadioGroupContextValue {
  value: string | number | undefined;
  disabled: boolean;
  size: 'small' | 'medium' | 'large';
  optionType: 'default' | 'button';
  onChange: (val: string | number) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

// ---- Types ----

export interface RadioProps {
  /** 是否选中（受控，单独使用时） */
  checked?: boolean;
  /** 默认是否选中（非受控，单独使用时） */
  defaultChecked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 在 Group 中使用时的标识值 */
  value?: string | number;
  /** 选中状态变化回调（单独使用时） */
  onChange?: (checked: boolean) => void;
  /** 标签内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface RadioGroupProps {
  /** 当前选中值（受控） */
  value?: string | number;
  /** 默认选中值（非受控） */
  defaultValue?: string | number;
  /** 选中变化回调 */
  onChange?: (value: string | number) => void;
  /** 是否整体禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 选项数据 */
  options?: (string | number | RadioOptionType)[];
  /** 选项展示类型 */
  optionType?: 'default' | 'button';
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface RadioOptionType {
  /** 选项值 */
  value: string | number;
  /** 显示内容 */
  label: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

// ---- RadioGroup ----

function normalizeOption(
  option: string | number | RadioOptionType,
): RadioOptionType {
  if (typeof option === 'string' || typeof option === 'number') {
    return { value: option, label: String(option) };
  }
  return option;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  size = 'medium',
  options,
  optionType = 'default',
  direction = 'horizontal',
  children,
  className,
  style,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const handleChange = useCallback(
    (val: string | number) => {
      if (!isControlled) {
        setInternalValue(val);
      }
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const contextValue: RadioGroupContextValue = {
    value: currentValue,
    disabled,
    size,
    optionType,
    onChange: handleChange,
  };

  const isButton = optionType === 'button';

  const classNames = [
    'aero-radio-group',
    `aero-radio-group--${direction}`,
    isButton ? 'aero-radio-group--button' : '',
    isButton ? `aero-radio-group--button-${size}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={classNames} style={style} role="radiogroup">
        {options
          ? options.map(normalizeOption).map((opt) => (
              <Radio key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </Radio>
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
};

// ---- Radio ----

const Radio: React.FC<RadioProps> & { Group: typeof RadioGroup } = ({
  checked,
  defaultChecked = false,
  disabled = false,
  size = 'medium',
  value,
  onChange,
  children,
  className,
  style,
}) => {
  const groupContext = useContext(RadioGroupContext);

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked = groupContext
    ? groupContext.value === value
    : isControlled
      ? checked!
      : internalChecked;

  const isDisabled = groupContext ? (disabled || groupContext.disabled) : disabled;
  const mergedSize = groupContext ? groupContext.size : size;
  const isButton = groupContext?.optionType === 'button';

  const handleChange = () => {
    if (isDisabled) return;

    if (groupContext) {
      groupContext.onChange(value!);
    } else {
      if (!isControlled) {
        setInternalChecked(true);
      }
      onChange?.(true);
    }
  };

  // ---- Button 模式 ----
  if (isButton) {
    const btnCls = [
      'aero-radio-button',
      `aero-radio-button--${mergedSize}`,
      isChecked ? 'aero-radio-button--checked' : '',
      isDisabled ? 'aero-radio-button--disabled' : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <label className={btnCls} style={style}>
        <input
          type="radio"
          className="aero-radio-input"
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
        />
        {children && <span className="aero-radio-button-label">{children}</span>}
      </label>
    );
  }

  // ---- 默认模式 ----
  const classNames = [
    'aero-radio',
    `aero-radio--${mergedSize}`,
    isChecked ? 'aero-radio--checked' : '',
    isDisabled ? 'aero-radio--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classNames} style={style}>
      <input
        type="radio"
        className="aero-radio-input"
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className="aero-radio-indicator" />
      {children && <span className="aero-radio-label">{children}</span>}
    </label>
  );
};

Radio.Group = RadioGroup;
(Radio as any).__AERO_CHECKABLE = true;

export default Radio;

import React, { useState, useContext, createContext, useCallback } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
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
  /** Whether selected (controlled, standalone) */
  checked?: boolean;
  /** Default whether selected (uncontrolled, standalone) */
  defaultChecked?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Identifier value when used in Group */
  value?: string | number;
  /** Selection state change callback (standalone) */
  onChange?: (checked: boolean) => void;
  /** Label content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface RadioGroupProps {
  /** Current selected value (controlled) */
  value?: string | number;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  /** Selection change callback */
  onChange?: (value: string | number) => void;
  /** Whether to disable all */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Options data */
  options?: (string | number | RadioOptionType)[];
  /** Option display type */
  optionType?: 'default' | 'button';
  /** Direction */
  direction?: 'horizontal' | 'vertical';
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface RadioOptionType {
  /** Option value */
  value: string | number;
  /** Display content */
  label: React.ReactNode;
  /** Whether disabled */
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
  size: sizeProp,
  options,
  optionType = 'default',
  direction = 'horizontal',
  children,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
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
  size: sizeProp,
  value,
  onChange,
  children,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
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

  // ---- Button Mode ----
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

  // ---- DefaultMode ----
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

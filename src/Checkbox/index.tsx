import React, { useState, useContext, createContext, useCallback } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Context ----

interface CheckboxGroupContextValue {
  value: (string | number)[];
  disabled: boolean;
  size: 'small' | 'medium' | 'large';
  toggleValue: (val: string | number) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

// ---- Types ----

export interface CheckboxProps {
  /** WhetherSelect（Controlled） */
  checked?: boolean;
  /** DefaultWhetherSelect（uncontrolled) */
  defaultChecked?: boolean;
  /** Whether half-checked state (visual only) */
  indeterminate?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Identifier value when used in Group */
  value?: string | number;
  /** SelectStatusChange callback */
  onChange?: (checked: boolean) => void;
  /** Label content */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps {
  /** Current selected value (controlled) */
  value?: (string | number)[];
  /** Default selected value (uncontrolled) */
  defaultValue?: (string | number)[];
  /** Selection change callback */
  onChange?: (value: (string | number)[]) => void;
  /** Whether to disable all */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Options data */
  options?: (string | number | CheckboxOptionType)[];
  /** Direction */
  direction?: 'horizontal' | 'vertical';
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface CheckboxOptionType {
  /** Option value */
  value: string | number;
  /** Display content */
  label: React.ReactNode;
  /** Whether disabled */
  disabled?: boolean;
}

// ---- CheckboxGroup ----

function normalizeOption(
  option: string | number | CheckboxOptionType,
): CheckboxOptionType {
  if (typeof option === 'string' || typeof option === 'number') {
    return { value: option, label: String(option) };
  }
  return option;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  size: sizeProp,
  options,
  direction = 'horizontal',
  children,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<(string | number)[]>(defaultValue);
  const currentValue = isControlled ? value! : internalValue;

  const toggleValue = useCallback(
    (val: string | number) => {
      const newValue = currentValue.includes(val)
        ? currentValue.filter((v) => v !== val)
        : [...currentValue, val];

      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [currentValue, isControlled, onChange],
  );

  const contextValue: CheckboxGroupContextValue = {
    value: currentValue,
    disabled,
    size,
    toggleValue,
  };

  const classNames = [
    'aero-checkbox-group',
    `aero-checkbox-group--${direction}`,
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={classNames} style={style} role="group">
        {options
          ? options.map(normalizeOption).map((opt) => (
              <Checkbox key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </Checkbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
};

// ---- Checkbox ----

const Checkbox: React.FC<CheckboxProps> & { Group: typeof CheckboxGroup } = ({
  checked,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  size: sizeProp,
  value,
  onChange,
  children,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const groupContext = useContext(CheckboxGroupContext);

  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);

  const isChecked = groupContext
    ? groupContext.value.includes(value!)
    : isControlled
      ? checked!
      : internalChecked;

  const isDisabled = groupContext ? (disabled || groupContext.disabled) : disabled;
  const mergedSize = groupContext ? groupContext.size : size;

  const handleChange = () => {
    if (isDisabled) return;

    if (groupContext) {
      groupContext.toggleValue(value!);
    } else {
      const newChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    }
  };

  const showIndeterminate = indeterminate && !isChecked;

  const classNames = [
    'aero-checkbox',
    `aero-checkbox--${mergedSize}`,
    isChecked ? 'aero-checkbox--checked' : '',
    showIndeterminate ? 'aero-checkbox--indeterminate' : '',
    isDisabled ? 'aero-checkbox--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classNames} style={style}>
      <input
        type="checkbox"
        className="aero-checkbox-input"
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleChange}
      />
      <span className="aero-checkbox-indicator" />
      {children && <span className="aero-checkbox-label">{children}</span>}
    </label>
  );
};

Checkbox.Group = CheckboxGroup;
(Checkbox as any).__AERO_CHECKABLE = true;

export default Checkbox;

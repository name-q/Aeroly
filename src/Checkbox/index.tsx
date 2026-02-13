import React, { useState, useContext, createContext, useCallback } from 'react';
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
  /** 是否选中（受控） */
  checked?: boolean;
  /** 默认是否选中（非受控） */
  defaultChecked?: boolean;
  /** 是否为半选状态（仅视觉） */
  indeterminate?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 在 Group 中使用时的标识值 */
  value?: string | number;
  /** 选中状态变化回调 */
  onChange?: (checked: boolean) => void;
  /** 标签内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CheckboxGroupProps {
  /** 当前选中值（受控） */
  value?: (string | number)[];
  /** 默认选中值（非受控） */
  defaultValue?: (string | number)[];
  /** 选中变化回调 */
  onChange?: (value: (string | number)[]) => void;
  /** 是否整体禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 选项数据 */
  options?: (string | number | CheckboxOptionType)[];
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface CheckboxOptionType {
  /** 选项值 */
  value: string | number;
  /** 显示内容 */
  label: React.ReactNode;
  /** 是否禁用 */
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
  size = 'medium',
  options,
  direction = 'horizontal',
  children,
  className,
  style,
}) => {
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
  size = 'medium',
  value,
  onChange,
  children,
  className,
  style,
}) => {
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

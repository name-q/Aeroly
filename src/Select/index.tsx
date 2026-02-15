import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, X, Check, Search } from 'lucide-react';
import Icon from '../Icon';
import { useDropdownPosition } from '../utils';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface SelectOption {
  /** 选项显示文本 */
  label: React.ReactNode;
  /** 选项值 */
  value: string | number;
  /** 是否禁用 */
  disabled?: boolean;
}

export interface SelectGroupOption {
  /** 分组标题 */
  label: React.ReactNode;
  /** 分组下的选项 */
  options: SelectOption[];
}

export type SelectOptionType = SelectOption | SelectGroupOption;

export interface SelectProps {
  /** 选项列表（支持分组） */
  options: SelectOptionType[];
  /** 当前值（受控） */
  value?: string | number | (string | number)[];
  /** 默认值 */
  defaultValue?: string | number | (string | number)[];
  /** 变化回调 */
  onChange?: (
    value: string | number | (string | number)[],
    option: SelectOption | SelectOption[],
  ) => void;
  /** 占位文案 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否可搜索 */
  showSearch?: boolean;
  /** 自定义搜索过滤 */
  filterOption?: (input: string, option: SelectOption) => boolean;
  /** 搜索框占位文案 */
  searchPlaceholder?: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 多选时最多显示的标签数，超出显示 +N */
  maxTagCount?: number;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 无数据时的提示 */
  notFoundContent?: React.ReactNode;
  /** 下拉面板是否显示（受控） */
  open?: boolean;
  /** 下拉面板显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 状态 */
  status?: 'error' | 'warning';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- Helpers ----

function isGroupOption(opt: SelectOptionType): opt is SelectGroupOption {
  return 'options' in opt && Array.isArray((opt as SelectGroupOption).options);
}

/** 将可能含分组的选项列表展平为纯选项 */
function flattenOptions(options: SelectOptionType[]): SelectOption[] {
  const result: SelectOption[] = [];
  for (const opt of options) {
    if (isGroupOption(opt)) {
      result.push(...opt.options);
    } else {
      result.push(opt);
    }
  }
  return result;
}

const defaultFilter: SelectProps['filterOption'] = (input, option) => {
  const label = typeof option.label === 'string' ? option.label : String(option.value);
  return label.toLowerCase().includes(input.toLowerCase());
};

// ---- Select ----

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  allowClear = false,
  showSearch = false,
  filterOption = defaultFilter,
  searchPlaceholder,
  multiple = false,
  maxTagCount,
  size: sizeProp,
  notFoundContent,
  open: openProp,
  onOpenChange,
  status,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  // ---- 受控/非受控值 ----
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    defaultValue ?? (multiple ? [] : ''),
  );
  const currentValue = isControlled ? value! : internalValue;

  // ---- 下拉开关 ----
  const isOpenControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isOpenControlled ? openProp! : internalOpen;

  const setOpen = useCallback(
    (val: boolean) => {
      if (!isOpenControlled) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [isOpenControlled, onOpenChange],
  );

  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { placement, alignment } = useDropdownPosition(wrapRef, dropdownRef, mounted);

  // ---- 展平选项 ----
  const flatOptions = useMemo(() => flattenOptions(options), [options]);

  const findOption = useCallback(
    (val: string | number) => flatOptions.find((o) => o.value === val),
    [flatOptions],
  );

  // ---- 过滤 ----
  const filteredFlat = useMemo(() => {
    if (!showSearch || !searchText) return flatOptions;
    return flatOptions.filter((o) => filterOption!(searchText, o));
  }, [flatOptions, showSearch, searchText, filterOption]);

  // 可导航的选项（排除 disabled）
  const navigableOptions = useMemo(
    () => filteredFlat.filter((o) => !o.disabled),
    [filteredFlat],
  );

  // ---- 打开/关闭动画 ----
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setSearchText('');
      setActiveIndex(-1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setAnimating(false);
    }
  }, [isOpen]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!isOpen && e.propertyName === 'opacity') {
      setMounted(false);
    }
  };

  // ---- 点击外部关闭 ----
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, setOpen]);

  // ---- 选中判断 ----
  const isSelected = useCallback(
    (val: string | number) => {
      if (multiple) {
        return (currentValue as (string | number)[]).includes(val);
      }
      return currentValue === val;
    },
    [currentValue, multiple],
  );

  // ---- 选择 ----
  const handleSelect = useCallback(
    (opt: SelectOption) => {
      if (opt.disabled) return;

      if (multiple) {
        const arr = currentValue as (string | number)[];
        let next: (string | number)[];
        if (arr.includes(opt.value)) {
          next = arr.filter((v) => v !== opt.value);
        } else {
          next = [...arr, opt.value];
        }
        if (!isControlled) setInternalValue(next);
        const selectedOpts = next.map((v) => findOption(v)!).filter(Boolean);
        onChange?.(next, selectedOpts);
      } else {
        if (!isControlled) setInternalValue(opt.value);
        onChange?.(opt.value, opt);
        setOpen(false);
      }
    },
    [currentValue, multiple, isControlled, onChange, findOption, setOpen],
  );

  // ---- 清除 ----
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = multiple ? [] : '';
    if (!isControlled) setInternalValue(next);
    onChange?.(next as any, multiple ? [] : (undefined as any));
    setOpen(false);
  };

  // ---- 多选移除标签 ----
  const handleRemoveTag = (val: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    const arr = (currentValue as (string | number)[]).filter((v) => v !== val);
    if (!isControlled) setInternalValue(arr);
    const selectedOpts = arr.map((v) => findOption(v)!).filter(Boolean);
    onChange?.(arr, selectedOpts);
  };

  // ---- 键盘导航 ----
  const scrollToActive = useCallback((index: number) => {
    const container = optionsRef.current;
    if (!container) return;
    const items = container.querySelectorAll('[data-selectable]');
    const target = items[index] as HTMLElement | undefined;
    if (target) {
      target.scrollIntoView({ block: 'nearest' });
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            return;
          }
          const next = activeIndex < navigableOptions.length - 1 ? activeIndex + 1 : 0;
          setActiveIndex(next);
          scrollToActive(next);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            return;
          }
          const prev = activeIndex > 0 ? activeIndex - 1 : navigableOptions.length - 1;
          setActiveIndex(prev);
          scrollToActive(prev);
          break;
        }
        case 'Enter': {
          e.preventDefault();
          if (isOpen && activeIndex >= 0 && activeIndex < navigableOptions.length) {
            handleSelect(navigableOptions[activeIndex]);
          } else if (!isOpen) {
            setOpen(true);
          }
          break;
        }
        case 'Escape': {
          if (isOpen) {
            e.preventDefault();
            e.stopPropagation();
            setOpen(false);
          }
          break;
        }
        case 'Backspace': {
          if (multiple && !searchText) {
            const arr = currentValue as (string | number)[];
            if (arr.length > 0) {
              const last = arr[arr.length - 1];
              const next = arr.slice(0, -1);
              if (!isControlled) setInternalValue(next);
              const selectedOpts = next.map((v) => findOption(v)!).filter(Boolean);
              onChange?.(next, selectedOpts);
            }
          }
          break;
        }
      }
    },
    [
      disabled, isOpen, activeIndex, navigableOptions, searchText,
      currentValue, multiple, isControlled, onChange, findOption,
      handleSelect, setOpen, scrollToActive,
    ],
  );

  // ---- 显示内容 ----
  const hasValue = multiple
    ? (currentValue as (string | number)[]).length > 0
    : currentValue !== '' && currentValue !== undefined;

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  const rootCls = [
    'aero-select',
    `aero-select--${size}`,
    isOpen ? 'aero-select--open' : '',
    disabled ? 'aero-select--disabled' : '',
    multiple ? 'aero-select--multiple' : '',
    status ? `aero-select--${status}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  // ---- 多选标签渲染 ----
  const renderTags = () => {
    const arr = currentValue as (string | number)[];
    const showArr = maxTagCount !== undefined ? arr.slice(0, maxTagCount) : arr;
    const rest = maxTagCount !== undefined ? arr.length - maxTagCount : 0;

    return (
      <div className="aero-select-selection-overflow">
        {showArr.map((val) => {
          const opt = findOption(val);
          return (
            <span key={String(val)} className="aero-select-tag">
              <span className="aero-select-tag-content">{opt?.label ?? val}</span>
              <span
                className="aero-select-tag-close"
                onClick={(e) => handleRemoveTag(val, e)}
              >
                <Icon icon={X} size={10} />
              </span>
            </span>
          );
        })}
        {rest > 0 && (
          <span className="aero-select-tag aero-select-tag--rest">+{rest}</span>
        )}
        {!hasValue && (
          <span className="aero-select-placeholder">{placeholder}</span>
        )}
      </div>
    );
  };

  // ---- 渲染选项（支持分组） ----
  const renderOptions = () => {
    if (filteredFlat.length === 0) {
      return <div className="aero-select-empty">{notFoundContent}</div>;
    }

    // 如果有分组
    const hasGroup = options.some(isGroupOption);

    if (hasGroup && !searchText) {
      let navIdx = 0;
      return options.map((group, gi) => {
        if (isGroupOption(group)) {
          const items = group.options;
          const groupEl = (
            <div key={`group-${gi}`} className="aero-select-group">
              <div className="aero-select-group-title">{group.label}</div>
              {items.map((opt) => {
                const currentNavIdx = !opt.disabled
                  ? navigableOptions.indexOf(opt)
                  : -1;
                const el = renderOptionItem(opt, currentNavIdx);
                if (!opt.disabled) navIdx++;
                return el;
              })}
            </div>
          );
          return groupEl;
        }
        const opt = group as SelectOption;
        const currentNavIdx = !opt.disabled
          ? navigableOptions.indexOf(opt)
          : -1;
        const el = renderOptionItem(opt, currentNavIdx);
        if (!opt.disabled) navIdx++;
        return el;
      });
    }

    // 无分组 / 搜索模式下展平
    return filteredFlat.map((opt) => {
      const navIdx = navigableOptions.indexOf(opt);
      return renderOptionItem(opt, navIdx);
    });
  };

  const renderOptionItem = (opt: SelectOption, navIdx: number) => {
    const selected = isSelected(opt.value);
    const active = navIdx >= 0 && navIdx === activeIndex;

    return (
      <div
        key={String(opt.value)}
        data-selectable={!opt.disabled ? '' : undefined}
        className={[
          'aero-select-option',
          selected ? 'aero-select-option--selected' : '',
          active ? 'aero-select-option--active' : '',
          opt.disabled ? 'aero-select-option--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => handleSelect(opt)}
        onMouseEnter={() => {
          if (!opt.disabled && navIdx >= 0) setActiveIndex(navIdx);
        }}
      >
        <span className="aero-select-option-content">{opt.label}</span>
        {selected && (
          <Icon icon={Check} size={14} className="aero-select-option-check" />
        )}
      </div>
    );
  };

  return (
    <div
      className={rootCls}
      style={style}
      ref={wrapRef}
      tabIndex={disabled ? undefined : 0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="aero-select-selector"
        onClick={() => !disabled && setOpen(!isOpen)}
      >
        {multiple ? (
          renderTags()
        ) : (
          <span
            className={`aero-select-value${!hasValue ? ' aero-select-placeholder' : ''}`}
          >
            {hasValue
              ? findOption(currentValue as string | number)?.label ?? currentValue
              : placeholder}
          </span>
        )}

        <span className="aero-select-suffix">
          {allowClear && hasValue && !disabled ? (
            <span className="aero-select-clear" onClick={handleClear}>
              <Icon icon={X} size={iconSize - 2} />
            </span>
          ) : (
            <span
              className={`aero-select-arrow${isOpen ? ' aero-select-arrow--open' : ''}`}
            >
              <Icon icon={ChevronDown} size={iconSize} />
            </span>
          )}
        </span>
      </div>

      {mounted && (
        <div
          ref={dropdownRef}
          className={`aero-select-dropdown aero-select-dropdown--${placement} aero-select-dropdown--${alignment}${animating ? ' aero-select-dropdown--open' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {showSearch && (
            <div className="aero-select-search">
              <Icon icon={Search} size={14} className="aero-select-search-icon" />
              <input
                ref={searchRef}
                className="aero-select-search-input"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div className="aero-select-options" ref={optionsRef}>
            {renderOptions()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;

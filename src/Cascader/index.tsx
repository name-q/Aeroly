import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronRight, X, Check, Search } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

// ---- Types ----

export interface CascaderOption {
  /** 选项值 */
  value: string | number;
  /** 显示文本 */
  label: React.ReactNode;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点（无展开箭头） */
  isLeaf?: boolean;
}

export type CascaderValueType = (string | number)[];

export interface CascaderProps {
  /** 级联选项数据 */
  options: CascaderOption[];
  /** 当前值（受控），每项为从根到叶的路径数组 */
  value?: CascaderValueType | CascaderValueType[];
  /** 默认值 */
  defaultValue?: CascaderValueType | CascaderValueType[];
  /** 变化回调 */
  onChange?: (
    value: CascaderValueType | CascaderValueType[],
    selectedOptions: CascaderOption[] | CascaderOption[][],
  ) => void;
  /** 占位文案 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否可搜索 */
  showSearch?: boolean;
  /** 搜索框占位文案 */
  searchPlaceholder?: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 多选时最多显示的标签数 */
  maxTagCount?: number;
  /** 选择即改变（选中任意层级即触发 onChange，而非仅叶子） */
  changeOnSelect?: boolean;
  /** 自定义显示文本的分隔符 */
  displaySeparator?: string;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 无数据时的提示 */
  notFoundContent?: React.ReactNode;
  /** 下拉面板是否显示（受控） */
  open?: boolean;
  /** 下拉面板显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- Helpers ----

/** 根据路径查找选项链 */
function getOptionsByPath(
  options: CascaderOption[],
  path: CascaderValueType,
): CascaderOption[] {
  const result: CascaderOption[] = [];
  let current = options;
  for (const val of path) {
    const found = current.find((o) => o.value === val);
    if (!found) break;
    result.push(found);
    current = found.children || [];
  }
  return result;
}

/** 获取路径对应的显示文本 */
function getLabels(
  options: CascaderOption[],
  path: CascaderValueType,
  separator: string,
): string {
  const chain = getOptionsByPath(options, path);
  return chain
    .map((o) => (typeof o.label === 'string' ? o.label : String(o.value)))
    .join(separator);
}

/** 展平所有叶子路径（用于搜索） */
interface FlatPath {
  path: CascaderValueType;
  options: CascaderOption[];
  labels: string[];
}

function flattenPaths(options: CascaderOption[]): FlatPath[] {
  const result: FlatPath[] = [];
  const walk = (opts: CascaderOption[], path: CascaderValueType, chain: CascaderOption[], labels: string[]) => {
    for (const opt of opts) {
      const nextPath = [...path, opt.value];
      const nextChain = [...chain, opt];
      const label = typeof opt.label === 'string' ? opt.label : String(opt.value);
      const nextLabels = [...labels, label];
      if (opt.children?.length && !opt.isLeaf) {
        walk(opt.children, nextPath, nextChain, nextLabels);
      } else {
        result.push({ path: nextPath, options: nextChain, labels: nextLabels });
      }
    }
  };
  walk(options, [], [], []);
  return result;
}

function pathEquals(a: CascaderValueType, b: CascaderValueType): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function includesPath(arr: CascaderValueType[], path: CascaderValueType): boolean {
  return arr.some((p) => pathEquals(p, path));
}

// ---- Cascader ----

const Cascader: React.FC<CascaderProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  allowClear = false,
  showSearch = false,
  searchPlaceholder,
  multiple = false,
  maxTagCount,
  changeOnSelect = false,
  displaySeparator = ' / ',
  size = 'medium',
  notFoundContent,
  open: openProp,
  onOpenChange,
  className,
  style,
}) => {
  // ---- 受控/非受控值 ----
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<CascaderValueType | CascaderValueType[]>(
    defaultValue ?? (multiple ? [] : []),
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

  // 当前展开的路径（用于多列面板展示）
  const [activePath, setActivePath] = useState<CascaderValueType>([]);

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ---- 搜索 ----
  const allPaths = useMemo(() => flattenPaths(options), [options]);

  const filteredPaths = useMemo(() => {
    if (!showSearch || !searchText) return [];
    const lower = searchText.toLowerCase();
    return allPaths.filter((fp) =>
      fp.labels.some((l) => l.toLowerCase().includes(lower)) ||
      fp.labels.join(' / ').toLowerCase().includes(lower),
    );
  }, [allPaths, showSearch, searchText]);

  // ---- 打开/关闭动画 ----
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setSearchText('');
      // 初始化 activePath 为当前选中值的路径
      if (!multiple) {
        const val = currentValue as CascaderValueType;
        setActivePath(val.length > 0 ? val.slice(0, -1) : []);
      } else {
        setActivePath([]);
      }
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

  // ---- 获取某一列的选项 ----
  const getColumnOptions = useCallback(
    (level: number): CascaderOption[] => {
      if (level === 0) return options;
      let current = options;
      for (let i = 0; i < level; i++) {
        const val = activePath[i];
        if (val === undefined) return [];
        const found = current.find((o) => o.value === val);
        if (!found?.children) return [];
        current = found.children;
      }
      return current;
    },
    [options, activePath],
  );

  // 计算要显示的列数
  const columns = useMemo(() => {
    const cols: CascaderOption[][] = [options];
    let current = options;
    for (let i = 0; i < activePath.length; i++) {
      const val = activePath[i];
      const found = current.find((o) => o.value === val);
      if (found?.children?.length && !found.isLeaf) {
        cols.push(found.children);
        current = found.children;
      } else {
        break;
      }
    }
    return cols;
  }, [options, activePath]);

  // ---- 选中判断 ----
  const isSelectedPath = useCallback(
    (path: CascaderValueType): boolean => {
      if (multiple) {
        return includesPath(currentValue as CascaderValueType[], path);
      }
      return pathEquals(currentValue as CascaderValueType, path);
    },
    [currentValue, multiple],
  );

  // ---- 选择 ----
  const handleSelect = useCallback(
    (opt: CascaderOption, level: number) => {
      if (opt.disabled) return;

      const newPath = [...activePath.slice(0, level), opt.value];
      const isLeaf = opt.isLeaf || !opt.children?.length;

      if (isLeaf || changeOnSelect) {
        const chain = getOptionsByPath(options, newPath);
        if (multiple) {
          const arr = currentValue as CascaderValueType[];
          let next: CascaderValueType[];
          if (includesPath(arr, newPath)) {
            next = arr.filter((p) => !pathEquals(p, newPath));
          } else {
            next = [...arr, newPath];
          }
          if (!isControlled) setInternalValue(next);
          const nextChains = next.map((p) => getOptionsByPath(options, p));
          onChange?.(next, nextChains);
        } else {
          if (!isControlled) setInternalValue(newPath);
          onChange?.(newPath, chain);
          if (isLeaf) setOpen(false);
        }
      }

      // 展开子列
      if (!isLeaf) {
        setActivePath(newPath);
      } else {
        setActivePath(newPath.slice(0, -1));
      }
    },
    [activePath, options, multiple, currentValue, isControlled, onChange, changeOnSelect, setOpen],
  );

  // ---- 搜索模式选择 ----
  const handleSearchSelect = useCallback(
    (fp: FlatPath) => {
      const disabled = fp.options.some((o) => o.disabled);
      if (disabled) return;

      if (multiple) {
        const arr = currentValue as CascaderValueType[];
        let next: CascaderValueType[];
        if (includesPath(arr, fp.path)) {
          next = arr.filter((p) => !pathEquals(p, fp.path));
        } else {
          next = [...arr, fp.path];
        }
        if (!isControlled) setInternalValue(next);
        const nextChains = next.map((p) => getOptionsByPath(options, p));
        onChange?.(next, nextChains);
      } else {
        if (!isControlled) setInternalValue(fp.path);
        onChange?.(fp.path, fp.options);
        setOpen(false);
      }
    },
    [multiple, currentValue, isControlled, onChange, options, setOpen],
  );

  // ---- 清除 ----
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next: CascaderValueType | CascaderValueType[] = multiple ? [] : [];
    if (!isControlled) setInternalValue(next);
    onChange?.(next as any, multiple ? [] : ([] as any));
    setOpen(false);
  };

  // ---- 多选移除标签 ----
  const handleRemoveTag = (path: CascaderValueType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    const arr = (currentValue as CascaderValueType[]).filter((p) => !pathEquals(p, path));
    if (!isControlled) setInternalValue(arr);
    const chains = arr.map((p) => getOptionsByPath(options, p));
    onChange?.(arr, chains);
  };

  // ---- 键盘 ----
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      }
      if ((e.key === 'ArrowDown' || e.key === 'Enter') && !isOpen) {
        e.preventDefault();
        setOpen(true);
      }
    },
    [disabled, isOpen, setOpen],
  );

  // ---- 显示内容 ----
  const hasValue = multiple
    ? (currentValue as CascaderValueType[]).length > 0
    : (currentValue as CascaderValueType).length > 0;

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  const rootCls = [
    'aero-cascader',
    `aero-cascader--${size}`,
    isOpen ? 'aero-cascader--open' : '',
    disabled ? 'aero-cascader--disabled' : '',
    multiple ? 'aero-cascader--multiple' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  // ---- 单选显示文本 ----
  const displayLabel = useMemo(() => {
    if (multiple || !hasValue) return '';
    return getLabels(options, currentValue as CascaderValueType, displaySeparator);
  }, [multiple, hasValue, options, currentValue, displaySeparator]);

  // ---- 多选标签渲染 ----
  const renderTags = () => {
    const arr = currentValue as CascaderValueType[];
    const showArr = maxTagCount !== undefined ? arr.slice(0, maxTagCount) : arr;
    const rest = maxTagCount !== undefined ? arr.length - maxTagCount : 0;

    return (
      <div className="aero-cascader-selection-overflow">
        {showArr.map((path, i) => {
          const label = getLabels(options, path, displaySeparator);
          return (
            <span key={path.join('-')} className="aero-cascader-tag">
              <span className="aero-cascader-tag-content">{label}</span>
              <span
                className="aero-cascader-tag-close"
                onClick={(e) => handleRemoveTag(path, e)}
              >
                <Icon icon={X} size={10} />
              </span>
            </span>
          );
        })}
        {rest > 0 && (
          <span className="aero-cascader-tag aero-cascader-tag--rest">+{rest}</span>
        )}
        {!hasValue && (
          <span className="aero-cascader-placeholder">{placeholder}</span>
        )}
      </div>
    );
  };

  // ---- 渲染多列面板 ----
  const renderColumns = () => (
    <div className="aero-cascader-menus">
      {columns.map((colOpts, level) => (
        <div key={level} className="aero-cascader-menu">
          {colOpts.map((opt) => {
            const isLeaf = opt.isLeaf || !opt.children?.length;
            const pathToHere = [...activePath.slice(0, level), opt.value];
            const isActive = activePath[level] === opt.value;
            const isSelected = isLeaf && isSelectedPath(pathToHere);

            return (
              <div
                key={String(opt.value)}
                className={[
                  'aero-cascader-option',
                  isActive ? 'aero-cascader-option--active' : '',
                  isSelected ? 'aero-cascader-option--selected' : '',
                  opt.disabled ? 'aero-cascader-option--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => handleSelect(opt, level)}
              >
                <span className="aero-cascader-option-content">{opt.label}</span>
                {isSelected && (
                  <Icon icon={Check} size={14} className="aero-cascader-option-check" />
                )}
                {!isLeaf && (
                  <Icon icon={ChevronRight} size={14} className="aero-cascader-option-expand" />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // ---- 渲染搜索结果 ----
  const renderSearchResults = () => {
    if (filteredPaths.length === 0) {
      return <div className="aero-cascader-empty">{notFoundContent}</div>;
    }
    return (
      <div className="aero-cascader-search-list">
        {filteredPaths.map((fp) => {
          const selected = isSelectedPath(fp.path);
          const isDisabled = fp.options.some((o) => o.disabled);
          return (
            <div
              key={fp.path.join('-')}
              className={[
                'aero-cascader-search-item',
                selected ? 'aero-cascader-search-item--selected' : '',
                isDisabled ? 'aero-cascader-search-item--disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleSearchSelect(fp)}
            >
              <span className="aero-cascader-search-item-label">
                {fp.labels.join(' / ')}
              </span>
              {selected && (
                <Icon icon={Check} size={14} className="aero-cascader-option-check" />
              )}
            </div>
          );
        })}
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
        className="aero-cascader-selector"
        onClick={() => !disabled && setOpen(!isOpen)}
      >
        {multiple ? (
          renderTags()
        ) : (
          <span
            className={`aero-cascader-value${!hasValue ? ' aero-cascader-placeholder' : ''}`}
          >
            {hasValue ? displayLabel : placeholder}
          </span>
        )}

        <span className="aero-cascader-suffix">
          {allowClear && hasValue && !disabled ? (
            <span className="aero-cascader-clear" onClick={handleClear}>
              <Icon icon={X} size={iconSize - 2} />
            </span>
          ) : (
            <span
              className={`aero-cascader-arrow${isOpen ? ' aero-cascader-arrow--open' : ''}`}
            >
              <Icon icon={ChevronDown} size={iconSize} />
            </span>
          )}
        </span>
      </div>

      {mounted && (
        <div
          className={`aero-cascader-dropdown${animating ? ' aero-cascader-dropdown--open' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {showSearch && (
            <div className="aero-cascader-search">
              <Icon icon={Search} size={14} className="aero-cascader-search-icon" />
              <input
                ref={searchRef}
                className="aero-cascader-search-input"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          {showSearch && searchText ? renderSearchResults() : renderColumns()}
        </div>
      )}
    </div>
  );
};

export default Cascader;

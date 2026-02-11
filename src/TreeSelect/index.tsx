import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { ChevronDown, ChevronRight, X, Check, Search } from 'lucide-react';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import './index.less';

// ---- Types ----

export interface TreeSelectNodeData {
  /** 唯一标识 */
  key: string;
  /** 显示内容 */
  title: React.ReactNode;
  /** 子节点 */
  children?: TreeSelectNodeData[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
}

export interface TreeSelectProps {
  /** 树数据 */
  treeData: TreeSelectNodeData[];
  /** 当前值（受控） */
  value?: string | string[];
  /** 默认值 */
  defaultValue?: string | string[];
  /** 变化回调 */
  onChange?: (value: string | string[], nodes: TreeSelectNodeData | TreeSelectNodeData[]) => void;
  /** 占位文案 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否可搜索 */
  showSearch?: boolean;
  /** 自定义搜索过滤（返回 true 表示匹配） */
  filterTreeNode?: (input: string, node: TreeSelectNodeData) => boolean;
  /** 搜索框占位文案 */
  searchPlaceholder?: string;
  /** 是否多选（使用勾选框模式） */
  multiple?: boolean;
  /** 多选时最多显示的标签数，超出显示 +N */
  maxTagCount?: number;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 无数据时的提示 */
  notFoundContent?: React.ReactNode;
  /** 默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点 key */
  defaultExpandedKeys?: string[];
  /** 是否只能选择叶子节点（单选模式） */
  treeLeafOnly?: boolean;
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

function collectAllKeys(data: TreeSelectNodeData[]): string[] {
  const keys: string[] = [];
  const walk = (nodes: TreeSelectNodeData[]) => {
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) walk(node.children);
    }
  };
  walk(data);
  return keys;
}

function findNode(data: TreeSelectNodeData[], key: string): TreeSelectNodeData | null {
  for (const node of data) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

/** 构建 key -> 子孙叶子 key 映射 */
function buildDescendantLeafMap(data: TreeSelectNodeData[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const walk = (nodes: TreeSelectNodeData[]): string[] => {
    const leafKeys: string[] = [];
    for (const node of nodes) {
      if (!node.children?.length || node.isLeaf) {
        map.set(node.key, [node.key]);
        leafKeys.push(node.key);
      } else {
        const childLeaves = walk(node.children);
        map.set(node.key, childLeaves);
        leafKeys.push(...childLeaves);
      }
    }
    return leafKeys;
  };
  walk(data);
  return map;
}

/** 根据叶子选中状态推导所有节点的 checked / halfChecked */
function deriveCheckedKeys(
  checkedLeafKeys: Set<string>,
  data: TreeSelectNodeData[],
  descendantMap: Map<string, string[]>,
): { checked: Set<string>; halfChecked: Set<string> } {
  const checked = new Set<string>();
  const halfChecked = new Set<string>();
  const walk = (nodes: TreeSelectNodeData[]) => {
    for (const node of nodes) {
      const leaves = descendantMap.get(node.key) || [];
      if (!node.children?.length || node.isLeaf) {
        if (checkedLeafKeys.has(node.key)) checked.add(node.key);
      } else {
        walk(node.children);
        const checkedCount = leaves.filter((k) => checkedLeafKeys.has(k)).length;
        if (checkedCount === leaves.length && leaves.length > 0) {
          checked.add(node.key);
        } else if (checkedCount > 0) {
          halfChecked.add(node.key);
        }
      }
    }
  };
  walk(data);
  return { checked, halfChecked };
}

/** 收集禁用叶子 key */
function collectDisabledLeafKeys(data: TreeSelectNodeData[], treeDisabled: boolean): Set<string> {
  const keys = new Set<string>();
  const walk = (nodes: TreeSelectNodeData[], parentDisabled: boolean) => {
    for (const node of nodes) {
      const isDisabled = parentDisabled || !!node.disabled;
      if (!node.children?.length || node.isLeaf) {
        if (isDisabled) keys.add(node.key);
      } else {
        walk(node.children, isDisabled);
      }
    }
  };
  walk(data, treeDisabled);
  return keys;
}

const defaultFilter: TreeSelectProps['filterTreeNode'] = (input, node) => {
  const title = typeof node.title === 'string' ? node.title : String(node.key);
  return title.toLowerCase().includes(input.toLowerCase());
};

/** 搜索时过滤树：保留匹配节点及其祖先路径 */
function filterTree(
  data: TreeSelectNodeData[],
  input: string,
  filter: (input: string, node: TreeSelectNodeData) => boolean,
): TreeSelectNodeData[] {
  const result: TreeSelectNodeData[] = [];
  for (const node of data) {
    const selfMatch = filter(input, node);
    const filteredChildren = node.children
      ? filterTree(node.children, input, filter)
      : [];
    if (selfMatch || filteredChildren.length > 0) {
      result.push({
        ...node,
        children: filteredChildren.length > 0 ? filteredChildren : node.children,
      });
    }
  }
  return result;
}

// ---- TreeSelect ----

const TreeSelect: React.FC<TreeSelectProps> = ({
  treeData,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled = false,
  allowClear = false,
  showSearch = false,
  filterTreeNode = defaultFilter,
  searchPlaceholder,
  multiple = false,
  maxTagCount,
  size = 'medium',
  notFoundContent,
  defaultExpandAll = false,
  defaultExpandedKeys,
  treeLeafOnly = false,
  open: openProp,
  onOpenChange,
  className,
  style,
}) => {
  // ---- 受控/非受控值 ----
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[]>(
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

  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // ---- 展开状态 ----
  const allKeys = useMemo(() => collectAllKeys(treeData), [treeData]);
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
    () => new Set(defaultExpandAll ? allKeys : (defaultExpandedKeys || [])),
  );

  // ---- 多选 checkable 相关 ----
  const descendantMap = useMemo(() => buildDescendantLeafMap(treeData), [treeData]);
  const disabledLeafKeys = useMemo(() => collectDisabledLeafKeys(treeData, disabled), [treeData, disabled]);

  // 从 currentValue 推导叶子选中集合
  const currentCheckedLeaves = useMemo(() => {
    if (!multiple) return new Set<string>();
    const arr = currentValue as string[];
    const leaves = new Set<string>();
    for (const key of arr) {
      const desc = descendantMap.get(key);
      if (desc) desc.forEach((k) => leaves.add(k));
    }
    return leaves;
  }, [multiple, currentValue, descendantMap]);

  const { checked: checkedSet, halfChecked: halfCheckedSet } = useMemo(
    () => multiple ? deriveCheckedKeys(currentCheckedLeaves, treeData, descendantMap) : { checked: new Set<string>(), halfChecked: new Set<string>() },
    [multiple, currentCheckedLeaves, treeData, descendantMap],
  );

  // ---- 搜索过滤 ----
  const filteredTreeData = useMemo(() => {
    if (!showSearch || !searchText) return treeData;
    return filterTree(treeData, searchText, filterTreeNode!);
  }, [treeData, showSearch, searchText, filterTreeNode]);

  // 搜索时自动展开所有匹配节点
  const displayExpandedKeys = useMemo(() => {
    if (showSearch && searchText) {
      return new Set(collectAllKeys(filteredTreeData));
    }
    return expandedKeys;
  }, [showSearch, searchText, filteredTreeData, expandedKeys]);

  // ---- 打开/关闭动画 ----
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setSearchText('');
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

  // ---- 展开/收起 ----
  const handleToggle = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // ---- 单选 ----
  const handleSelectSingle = useCallback(
    (node: TreeSelectNodeData) => {
      if (node.disabled || disabled) return;
      if (treeLeafOnly && node.children?.length && !node.isLeaf) return;
      const key = node.key;
      if (!isControlled) setInternalValue(key);
      onChange?.(key, node);
      setOpen(false);
    },
    [disabled, treeLeafOnly, isControlled, onChange, setOpen],
  );

  // ---- 多选 (checkable) ----
  const handleCheck = useCallback(
    (key: string) => {
      if (disabled) return;
      const allLeaves = descendantMap.get(key) || [key];
      const leaves = allLeaves.filter((k) => !disabledLeafKeys.has(k));
      if (leaves.length === 0) return;

      const allChecked = leaves.every((k) => currentCheckedLeaves.has(k));
      const nextLeaves = new Set(currentCheckedLeaves);

      if (allChecked) {
        leaves.forEach((k) => nextLeaves.delete(k));
      } else {
        leaves.forEach((k) => nextLeaves.add(k));
      }

      const { checked: nextChecked } = deriveCheckedKeys(nextLeaves, treeData, descendantMap);
      const nextKeys = Array.from(nextChecked);
      if (!isControlled) setInternalValue(nextKeys);
      const nodes = nextKeys.map((k) => findNode(treeData, k)!).filter(Boolean);
      onChange?.(nextKeys, nodes);
    },
    [disabled, descendantMap, disabledLeafKeys, currentCheckedLeaves, treeData, isControlled, onChange],
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
  const handleRemoveTag = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    // 取消勾选该节点对应的叶子
    const allLeaves = descendantMap.get(key) || [key];
    const nextLeaves = new Set(currentCheckedLeaves);
    allLeaves.forEach((k) => nextLeaves.delete(k));

    const { checked: nextChecked } = deriveCheckedKeys(nextLeaves, treeData, descendantMap);
    const nextKeys = Array.from(nextChecked);
    if (!isControlled) setInternalValue(nextKeys);
    const nodes = nextKeys.map((k) => findNode(treeData, k)!).filter(Boolean);
    onChange?.(nextKeys, nodes);
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
      if (e.key === 'Backspace' && multiple && !searchText) {
        const arr = currentValue as string[];
        if (arr.length > 0) {
          const lastKey = arr[arr.length - 1];
          handleRemoveTag(lastKey, e as any);
        }
      }
    },
    [disabled, isOpen, multiple, searchText, currentValue, setOpen, handleRemoveTag],
  );

  // ---- 显示内容 ----
  const hasValue = multiple
    ? (currentValue as string[]).length > 0
    : currentValue !== '' && currentValue !== undefined;

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  const rootCls = [
    'aero-tree-select',
    `aero-tree-select--${size}`,
    isOpen ? 'aero-tree-select--open' : '',
    disabled ? 'aero-tree-select--disabled' : '',
    multiple ? 'aero-tree-select--multiple' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  // ---- 多选标签渲染 ----
  const renderTags = () => {
    const arr = currentValue as string[];
    const showArr = maxTagCount !== undefined ? arr.slice(0, maxTagCount) : arr;
    const rest = maxTagCount !== undefined ? arr.length - maxTagCount : 0;

    return (
      <div className="aero-tree-select-selection-overflow">
        {showArr.map((key) => {
          const node = findNode(treeData, key);
          return (
            <span key={key} className="aero-tree-select-tag">
              <span className="aero-tree-select-tag-content">{node?.title ?? key}</span>
              <span
                className="aero-tree-select-tag-close"
                onClick={(e) => handleRemoveTag(key, e)}
              >
                <Icon icon={X} size={10} />
              </span>
            </span>
          );
        })}
        {rest > 0 && (
          <span className="aero-tree-select-tag aero-tree-select-tag--rest">+{rest}</span>
        )}
        {!hasValue && (
          <span className="aero-tree-select-placeholder">{placeholder}</span>
        )}
      </div>
    );
  };

  // ---- 渲染树节点 ----
  const renderTreeNodes = (nodes: TreeSelectNodeData[], level: number) => {
    return nodes.map((node) => {
      const isLeaf = node.isLeaf || !node.children?.length;
      const isExpanded = displayExpandedKeys.has(node.key);
      const isDisabled = disabled || !!node.disabled;
      const isChecked = checkedSet.has(node.key);
      const isHalfChecked = halfCheckedSet.has(node.key);
      const isSelected = !multiple && currentValue === node.key;
      const canSelect = !treeLeafOnly || isLeaf;

      return (
        <div key={node.key} className="aero-tree-select-node-wrapper">
          <div
            className={[
              'aero-tree-select-node',
              isSelected ? 'aero-tree-select-node--selected' : '',
              isDisabled ? 'aero-tree-select-node--disabled' : '',
              !multiple && !canSelect ? 'aero-tree-select-node--non-selectable' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            style={{ paddingLeft: level * 20 }}
            onClick={() => {
              if (isDisabled) return;
              if (multiple) {
                handleCheck(node.key);
              } else {
                handleSelectSingle(node);
              }
            }}
          >
            {/* 展开箭头 */}
            <span
              className={[
                'aero-tree-select-switcher',
                isLeaf ? 'aero-tree-select-switcher--leaf' : '',
                isExpanded ? 'aero-tree-select-switcher--open' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={(e) => {
                e.stopPropagation();
                if (!isLeaf) handleToggle(node.key);
              }}
            >
              {!isLeaf && <Icon icon={ChevronRight} size={14} />}
            </span>

            {/* 多选勾选框 */}
            {multiple && (
              <span
                className="aero-tree-select-checkbox-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={isChecked}
                  indeterminate={isHalfChecked}
                  disabled={isDisabled}
                  size="small"
                  onChange={() => { if (!isDisabled) handleCheck(node.key); }}
                />
              </span>
            )}

            {/* 标题 */}
            <span className="aero-tree-select-node-title">{node.title}</span>

            {/* 单选选中标记 */}
            {isSelected && !multiple && (
              <Icon icon={Check} size={14} className="aero-tree-select-node-check" />
            )}
          </div>

          {/* 子节点 */}
          {!isLeaf && isExpanded && node.children && (
            <div className="aero-tree-select-node-children">
              {renderTreeNodes(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
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
        className="aero-tree-select-selector"
        onClick={() => !disabled && setOpen(!isOpen)}
      >
        {multiple ? (
          renderTags()
        ) : (
          <span
            className={`aero-tree-select-value${!hasValue ? ' aero-tree-select-placeholder' : ''}`}
          >
            {hasValue
              ? findNode(treeData, currentValue as string)?.title ?? currentValue
              : placeholder}
          </span>
        )}

        <span className="aero-tree-select-suffix">
          {allowClear && hasValue && !disabled ? (
            <span className="aero-tree-select-clear" onClick={handleClear}>
              <Icon icon={X} size={iconSize - 2} />
            </span>
          ) : (
            <span
              className={`aero-tree-select-arrow${isOpen ? ' aero-tree-select-arrow--open' : ''}`}
            >
              <Icon icon={ChevronDown} size={iconSize} />
            </span>
          )}
        </span>
      </div>

      {mounted && (
        <div
          className={`aero-tree-select-dropdown${animating ? ' aero-tree-select-dropdown--open' : ''}`}
          onTransitionEnd={handleTransitionEnd}
        >
          {showSearch && (
            <div className="aero-tree-select-search">
              <Icon icon={Search} size={14} className="aero-tree-select-search-icon" />
              <input
                ref={searchRef}
                className="aero-tree-select-search-input"
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}
          <div className="aero-tree-select-tree-wrapper">
            {filteredTreeData.length === 0 ? (
              <div className="aero-tree-select-empty">{notFoundContent}</div>
            ) : (
              renderTreeNodes(filteredTreeData, 0)
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeSelect;

import React, { useState, useCallback, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

// ---- Types ----

export interface TreeNodeData {
  /** 唯一标识 */
  key: string;
  /** 显示内容 */
  title: React.ReactNode;
  /** 子节点 */
  children?: TreeNodeData[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否为叶子节点（无展开箭头） */
  isLeaf?: boolean;
}

export interface TreeProps {
  /** 树数据 */
  treeData: TreeNodeData[];
  /** 展开的节点 key（受控） */
  expandedKeys?: string[];
  /** 默认展开的节点 key（非受控） */
  defaultExpandedKeys?: string[];
  /** 展开/收起回调 */
  onExpand?: (expandedKeys: string[], info: { node: TreeNodeData; expanded: boolean }) => void;
  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 选中的节点 key（受控） */
  selectedKeys?: string[];
  /** 默认选中的节点 key（非受控） */
  defaultSelectedKeys?: string[];
  /** 选中回调 */
  onSelect?: (selectedKeys: string[], info: { node: TreeNodeData; selected: boolean }) => void;
  /** 勾选的节点 key（受控） */
  checkedKeys?: string[];
  /** 默认勾选的节点 key（非受控） */
  defaultCheckedKeys?: string[];
  /** 勾选回调 */
  onCheck?: (checkedKeys: string[], info: { node: TreeNodeData; checked: boolean }) => void;
  /** 是否显示勾选框 */
  checkable?: boolean;
  /** 是否允许多选 */
  multiple?: boolean;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 是否禁用整棵树 */
  disabled?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 工具函数 ----

function collectAllKeys(data: TreeNodeData[]): string[] {
  const keys: string[] = [];
  const walk = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) walk(node.children);
    }
  };
  walk(data);
  return keys;
}

// 收集所有叶子 key
function collectLeafKeys(data: TreeNodeData[]): Set<string> {
  const keys = new Set<string>();
  const walk = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      if (!node.children?.length || node.isLeaf) {
        keys.add(node.key);
      } else {
        walk(node.children);
      }
    }
  };
  walk(data);
  return keys;
}

// 收集所有禁用节点的叶子 key
function collectDisabledLeafKeys(data: TreeNodeData[], treeDisabled: boolean): Set<string> {
  const keys = new Set<string>();
  const walk = (nodes: TreeNodeData[], parentDisabled: boolean) => {
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

// 构建 key -> 子孙叶子 key 映射
function buildDescendantLeafMap(data: TreeNodeData[]): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const walk = (nodes: TreeNodeData[]): string[] => {
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

// 根据叶子选中状态，向上推导父节点选中状态
function deriveCheckedKeys(
  checkedLeafKeys: Set<string>,
  data: TreeNodeData[],
  descendantMap: Map<string, string[]>,
): { checked: Set<string>; halfChecked: Set<string> } {
  const checked = new Set<string>();
  const halfChecked = new Set<string>();

  const walk = (nodes: TreeNodeData[]) => {
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

// ---- TreeNode 组件 ----

interface TreeNodeProps {
  node: TreeNodeData;
  level: number;
  expanded: boolean;
  selected: boolean;
  checked: boolean;
  halfChecked: boolean;
  checkable: boolean;
  showLine: boolean;
  showIcon: boolean;
  disabled: boolean;
  onToggle: (key: string) => void;
  onSelect: (key: string) => void;
  onCheck: (key: string) => void;
  renderChildren: (children: TreeNodeData[], level: number) => React.ReactNode;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  level,
  expanded,
  selected,
  checked,
  halfChecked,
  checkable,
  showLine,
  showIcon,
  disabled: treeDisabled,
  onToggle,
  onSelect,
  onCheck,
  renderChildren,
}) => {
  const isLeaf = node.isLeaf || !node.children?.length;
  const isDisabled = treeDisabled || node.disabled;

  const nodeClassNames = [
    'aero-tree-node',
    selected ? 'aero-tree-node--selected' : '',
    isDisabled ? 'aero-tree-node--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLeaf) onToggle(node.key);
  };

  const handleSelect = () => {
    if (isDisabled) return;
    if (checkable) {
      onCheck(node.key);
    } else {
      onSelect(node.key);
    }
  };

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDisabled) return;
    onCheck(node.key);
  };

  return (
    <div className="aero-tree-node-wrapper">
      <div
        className={nodeClassNames}
        style={{ paddingLeft: level * 20 }}
        onClick={handleSelect}
      >
        {/* 展开箭头 */}
        <span
          className={[
            'aero-tree-switcher',
            isLeaf ? 'aero-tree-switcher--leaf' : '',
            expanded ? 'aero-tree-switcher--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleToggle}
        >
          {!isLeaf && <Icon icon={ChevronRight} size={14} />}
        </span>

        {/* 勾选框 */}
        {checkable && (
          <span
            className={[
              'aero-tree-checkbox',
              checked ? 'aero-tree-checkbox--checked' : '',
              halfChecked ? 'aero-tree-checkbox--half' : '',
              isDisabled ? 'aero-tree-checkbox--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={handleCheck}
          >
            <span className="aero-tree-checkbox-inner" />
          </span>
        )}

        {/* 图标 */}
        {showIcon && node.icon && (
          <span className="aero-tree-icon">{node.icon}</span>
        )}

        {/* 标题 */}
        <span className="aero-tree-title">{node.title}</span>
      </div>

      {/* 子节点 */}
      {!isLeaf && (
        <div
          className={[
            'aero-tree-children',
            showLine ? 'aero-tree-children--line' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          style={{
            height: expanded ? 'auto' : 0,
            opacity: expanded ? 1 : 0,
            overflow: 'hidden',
            ...(showLine ? { '--line-left': `${level * 20 + 9}px` } as React.CSSProperties : {}),
          }}
        >
          {expanded && node.children && renderChildren(node.children, level + 1)}
        </div>
      )}
    </div>
  );
};

// ---- Tree ----

const Tree: React.FC<TreeProps> = ({
  treeData,
  expandedKeys,
  defaultExpandedKeys,
  onExpand,
  defaultExpandAll = false,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelect: onSelectProp,
  checkedKeys,
  defaultCheckedKeys = [],
  onCheck: onCheckProp,
  checkable = false,
  multiple = false,
  showLine = false,
  showIcon = false,
  disabled = false,
  className,
  style,
}) => {
  // ---- 展开状态 ----
  const allKeys = useMemo(() => collectAllKeys(treeData), [treeData]);
  const isExpandControlled = expandedKeys !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<string[]>(
    defaultExpandAll ? allKeys : (defaultExpandedKeys || []),
  );
  const currentExpanded = isExpandControlled ? expandedKeys! : internalExpanded;
  const expandedSet = useMemo(() => new Set(currentExpanded), [currentExpanded]);

  const handleToggle = useCallback(
    (key: string) => {
      const isExpanded = expandedSet.has(key);
      const next = isExpanded
        ? currentExpanded.filter((k) => k !== key)
        : [...currentExpanded, key];
      if (!isExpandControlled) setInternalExpanded(next);
      const node = findNode(treeData, key);
      if (node) onExpand?.(next, { node, expanded: !isExpanded });
    },
    [currentExpanded, expandedSet, isExpandControlled, onExpand, treeData],
  );

  // ---- 选中状态 ----
  const isSelectControlled = selectedKeys !== undefined;
  const [internalSelected, setInternalSelected] = useState<string[]>(defaultSelectedKeys);
  const currentSelected = isSelectControlled ? selectedKeys! : internalSelected;
  const selectedSet = useMemo(() => new Set(currentSelected), [currentSelected]);

  const handleSelect = useCallback(
    (key: string) => {
      const isSelected = selectedSet.has(key);
      let next: string[];
      if (multiple) {
        next = isSelected
          ? currentSelected.filter((k) => k !== key)
          : [...currentSelected, key];
      } else {
        next = isSelected ? [] : [key];
      }
      if (!isSelectControlled) setInternalSelected(next);
      const node = findNode(treeData, key);
      if (node) onSelectProp?.(next, { node, selected: !isSelected });
    },
    [currentSelected, selectedSet, isSelectControlled, multiple, onSelectProp, treeData],
  );

  // ---- 勾选状态（基于叶子节点，自动推导父节点） ----
  const leafKeys = useMemo(() => collectLeafKeys(treeData), [treeData]);
  const descendantMap = useMemo(() => buildDescendantLeafMap(treeData), [treeData]);
  const disabledLeafKeys = useMemo(() => collectDisabledLeafKeys(treeData, disabled), [treeData, disabled]);

  const isCheckControlled = checkedKeys !== undefined;
  const [internalCheckedLeaves, setInternalCheckedLeaves] = useState<Set<string>>(() => {
    // 初始化：将 defaultCheckedKeys 中的叶子提取出来
    const initial = new Set<string>();
    for (const key of defaultCheckedKeys) {
      const leaves = descendantMap.get(key);
      if (leaves) leaves.forEach((k) => initial.add(k));
    }
    return initial;
  });

  // 受控模式：从 checkedKeys 推导叶子
  const currentCheckedLeaves = useMemo(() => {
    if (!isCheckControlled) return internalCheckedLeaves;
    const leaves = new Set<string>();
    for (const key of checkedKeys!) {
      const desc = descendantMap.get(key);
      if (desc) desc.forEach((k) => leaves.add(k));
    }
    return leaves;
  }, [isCheckControlled, checkedKeys, descendantMap, internalCheckedLeaves]);

  const { checked: checkedSet, halfChecked: halfCheckedSet } = useMemo(
    () => deriveCheckedKeys(currentCheckedLeaves, treeData, descendantMap),
    [currentCheckedLeaves, treeData, descendantMap],
  );

  const handleCheck = useCallback(
    (key: string) => {
      const allLeaves = descendantMap.get(key) || [key];
      // 排除禁用叶子
      const leaves = allLeaves.filter((k) => !disabledLeafKeys.has(k));
      if (leaves.length === 0) return;

      // 判断可操作叶子是否已全部选中
      const allChecked = leaves.every((k) => currentCheckedLeaves.has(k));
      const nextLeaves = new Set(currentCheckedLeaves);

      if (allChecked) {
        leaves.forEach((k) => nextLeaves.delete(k));
      } else {
        leaves.forEach((k) => nextLeaves.add(k));
      }

      if (!isCheckControlled) setInternalCheckedLeaves(nextLeaves);

      const { checked: nextChecked } = deriveCheckedKeys(nextLeaves, treeData, descendantMap);
      const nextCheckedKeys = Array.from(nextChecked);
      const node = findNode(treeData, key);
      if (node) onCheckProp?.(nextCheckedKeys, { node, checked: !allChecked });
    },
    [currentCheckedLeaves, descendantMap, disabledLeafKeys, isCheckControlled, onCheckProp, treeData],
  );

  // ---- 渲染 ----
  const renderChildren = useCallback(
    (nodes: TreeNodeData[], level: number) =>
      nodes.map((node) => (
        <TreeNode
          key={node.key}
          node={node}
          level={level}
          expanded={expandedSet.has(node.key)}
          selected={selectedSet.has(node.key)}
          checked={checkedSet.has(node.key)}
          halfChecked={halfCheckedSet.has(node.key)}
          checkable={checkable}
          showLine={showLine}
          showIcon={showIcon}
          disabled={disabled}
          onToggle={handleToggle}
          onSelect={handleSelect}
          onCheck={handleCheck}
          renderChildren={renderChildren}
        />
      )),
    [expandedSet, selectedSet, checkedSet, halfCheckedSet, checkable, showLine, showIcon, disabled, handleToggle, handleSelect, handleCheck],
  );

  const classNames = [
    'aero-tree',
    showLine ? 'aero-tree--line' : '',
    disabled ? 'aero-tree--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style} role="tree">
      {renderChildren(treeData, 0)}
    </div>
  );
};

// ---- 辅助 ----

function findNode(data: TreeNodeData[], key: string): TreeNodeData | null {
  for (const node of data) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findNode(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

export default Tree;

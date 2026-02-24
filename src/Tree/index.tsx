import React, { useState, useCallback, useMemo, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import Checkbox from '../Checkbox';
import './index.less';

// ---- Types ----

export interface TreeNodeData {
  /** Unique identifier */
  key: string;
  /** Display content */
  title: React.ReactNode;
  /** Children nodes */
  children?: TreeNodeData[];
  /** Whether disabled */
  disabled?: boolean;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Whether it is a leaf node（no expand arrow) */
  isLeaf?: boolean;
}

export interface TreeProps {
  /** Tree data */
  treeData: TreeNodeData[];
  /** Expanded node keys (controlled) */
  expandedKeys?: string[];
  /** Default expanded node keys（uncontrolled) */
  defaultExpandedKeys?: string[];
  /** Expand/collapse callback */
  onExpand?: (expandedKeys: string[], info: { node: TreeNodeData; expanded: boolean }) => void;
  /** WhetherExpand all nodes by default */
  defaultExpandAll?: boolean;
  /** Selected node key (controlled) */
  selectedKeys?: string[];
  /** Default selected node key (uncontrolled) */
  defaultSelectedKeys?: string[];
  /** Selection callback */
  onSelect?: (selectedKeys: string[], info: { node: TreeNodeData; selected: boolean }) => void;
  /** Checked node keys (controlled) */
  checkedKeys?: string[];
  /** Default checked node keys (uncontrolled) */
  defaultCheckedKeys?: string[];
  /** Check callback */
  onCheck?: (checkedKeys: string[], info: { node: TreeNodeData; checked: boolean }) => void;
  /** Whether visibleCheckbox */
  checkable?: boolean;
  /** Whether to allow multiple selection */
  multiple?: boolean;
  /** Whether to show connecting lines */
  showLine?: boolean;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Whether to disable the entire tree */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export type DropPosition = 'before' | 'inside' | 'after';

export interface DropInfo {
  /** Dragged node */
  dragNode: TreeNodeData;
  /** Target node */
  dropNode: TreeNodeData;
  /** Drop position */
  dropPosition: DropPosition;
  /** New tree data after move */
  treeData: TreeNodeData[];
}

export interface DraggableTreeProps extends TreeProps {
  /** Drag finish callback */
  onDrop?: (info: DropInfo) => void;
  /** Control whether drop is allowed */
  allowDrop?: (info: { dragNode: TreeNodeData; dropNode: TreeNodeData; dropPosition: DropPosition }) => boolean;
}

// ---- Utilities ----

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

// Collect all disabled node leaf keys
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

// Build key -> descendant leaf key mapping
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

// Derive parent node selection state from leaf selection state
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

// ---- TreeNode Component ----

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
  // drag props (optional, only passed by DraggableTree)
  draggable?: boolean;
  dragOverClass?: string;
  onDragStart?: (e: React.DragEvent, node: TreeNodeData) => void;
  onDragOver?: (e: React.DragEvent, node: TreeNodeData) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, node: TreeNodeData) => void;
  onDragEnd?: (e: React.DragEvent) => void;
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
  draggable: isDraggable,
  dragOverClass,
  onDragStart: onDragStartProp,
  onDragOver: onDragOverProp,
  onDragLeave: onDragLeaveProp,
  onDrop: onDropProp,
  onDragEnd: onDragEndProp,
}) => {
  const isLeaf = node.isLeaf || !node.children?.length;
  const isDisabled = treeDisabled || node.disabled;

  const nodeClassNames = [
    'aero-tree-node',
    selected ? 'aero-tree-node--selected' : '',
    isDisabled ? 'aero-tree-node--disabled' : '',
    dragOverClass || '',
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

  return (
    <div className="aero-tree-node-wrapper">
      <div
        className={nodeClassNames}
        style={{ paddingLeft: level * 20 }}
        onClick={handleSelect}
        draggable={isDraggable && !isDisabled}
        onDragStart={isDraggable ? (e) => onDragStartProp?.(e, node) : undefined}
        onDragOver={isDraggable ? (e) => onDragOverProp?.(e, node) : undefined}
        onDragLeave={isDraggable ? onDragLeaveProp : undefined}
        onDrop={isDraggable ? (e) => onDropProp?.(e, node) : undefined}
        onDragEnd={isDraggable ? onDragEndProp : undefined}
      >
        {/* Expand arrow */}
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

        {/* Checkbox */}
        {checkable && (
          <span className="aero-tree-checkbox-wrap" onClick={(e) => e.stopPropagation()}>
            <Checkbox
              checked={checked}
              indeterminate={halfChecked}
              disabled={isDisabled}
              size="small"
              onChange={() => { if (!isDisabled) onCheck(node.key); }}
            />
          </span>
        )}

        {/* Icon */}
        {showIcon && node.icon && (
          <span className="aero-tree-icon">{node.icon}</span>
        )}

        {/* Title */}
        <span className="aero-tree-title">{node.title}</span>
      </div>

      {/* Children nodes */}
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
  // ---- Expand state ----
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

  // ---- SelectStatus ----
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

  // ---- Check state (based on leaf nodes, auto-derive parent nodes) ----
  const descendantMap = useMemo(() => buildDescendantLeafMap(treeData), [treeData]);
  const disabledLeafKeys = useMemo(() => collectDisabledLeafKeys(treeData, disabled), [treeData, disabled]);

  const isCheckControlled = checkedKeys !== undefined;
  const [internalCheckedLeaves, setInternalCheckedLeaves] = useState<Set<string>>(() => {
    // Initialize: extract leaves from defaultCheckedKeys
    const initial = new Set<string>();
    for (const key of defaultCheckedKeys) {
      const leaves = descendantMap.get(key);
      if (leaves) leaves.forEach((k) => initial.add(k));
    }
    return initial;
  });

  // Controlled mode: derive leaves from checkedKeys
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
      // Exclude disabled leaves
      const leaves = allLeaves.filter((k) => !disabledLeafKeys.has(k));
      if (leaves.length === 0) return;

      // Check if all actionable leaves are selected
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

  // ---- Render ----
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

// ---- Helpers ----

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

// ---- Drag utilities ----

function removeNode(data: TreeNodeData[], key: string): TreeNodeData[] {
  return data
    .filter((n) => n.key !== key)
    .map((n) =>
      n.children ? { ...n, children: removeNode(n.children, key) } : n,
    );
}

function insertNode(
  data: TreeNodeData[],
  targetKey: string,
  node: TreeNodeData,
  position: DropPosition,
): TreeNodeData[] {
  const result: TreeNodeData[] = [];
  for (const item of data) {
    if (item.key === targetKey) {
      if (position === 'before') {
        result.push(node, { ...item, children: item.children ? [...item.children] : undefined });
      } else if (position === 'after') {
        result.push({ ...item, children: item.children ? [...item.children] : undefined }, node);
      } else {
        // inside
        result.push({
          ...item,
          children: [...(item.children || []), node],
        });
      }
    } else {
      result.push(
        item.children
          ? { ...item, children: insertNode(item.children, targetKey, node, position) }
          : item,
      );
    }
  }
  return result;
}

function isDescendant(data: TreeNodeData[], ancestorKey: string, targetKey: string): boolean {
  const node = findNode(data, ancestorKey);
  if (!node?.children) return false;
  for (const child of node.children) {
    if (child.key === targetKey) return true;
    if (child.children && isDescendant([child], child.key, targetKey)) return true;
  }
  return false;
}

// ---- DraggableTree ----

const DraggableTree: React.FC<DraggableTreeProps> = ({
  onDrop: onDropProp,
  allowDrop,
  treeData,
  className,
  ...restProps
}) => {
  const dragRef = useRef<{
    dragNode: TreeNodeData | null;
    dropNode: TreeNodeData | null;
    dropPosition: DropPosition;
  }>({ dragNode: null, dropNode: null, dropPosition: 'inside' });

  const [dragOverKey, setDragOverKey] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition>('inside');
  const [draggingKey, setDraggingKey] = useState<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, node: TreeNodeData) => {
    dragRef.current.dragNode = node;
    setDraggingKey(node.key);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires setData
    e.dataTransfer.setData('text/plain', node.key);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent, node: TreeNodeData) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const y = e.clientY - rect.top;
      const h = rect.height;
      let pos: DropPosition;
      if (y < h * 0.25) pos = 'before';
      else if (y > h * 0.75) pos = 'after';
      else pos = 'inside';

      // Check allowDrop
      if (allowDrop && dragRef.current.dragNode) {
        const allowed = allowDrop({
          dragNode: dragRef.current.dragNode,
          dropNode: node,
          dropPosition: pos,
        });
        if (!allowed) {
          setDragOverKey(null);
          return;
        }
      }

      // Prevent dropping onto self or descendants
      if (dragRef.current.dragNode) {
        if (node.key === dragRef.current.dragNode.key) return;
        if (isDescendant(treeData, dragRef.current.dragNode.key, node.key)) return;
      }

      dragRef.current.dropNode = node;
      dragRef.current.dropPosition = pos;
      setDragOverKey(node.key);
      setDropPosition(pos);
    },
    [allowDrop, treeData],
  );

  const handleDragLeave = useCallback(() => {
    setDragOverKey(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, node: TreeNodeData) => {
      e.preventDefault();
      setDragOverKey(null);
      setDraggingKey(null);

      const { dragNode, dropPosition: pos } = dragRef.current;
      if (!dragNode || !node || dragNode.key === node.key) return;
      if (isDescendant(treeData, dragNode.key, node.key)) return;

      const removed = removeNode(treeData, dragNode.key);
      const newData = insertNode(removed, node.key, dragNode, pos);

      onDropProp?.({
        dragNode,
        dropNode: node,
        dropPosition: pos,
        treeData: newData,
      });

      dragRef.current = { dragNode: null, dropNode: null, dropPosition: 'inside' };
    },
    [treeData, onDropProp],
  );

  const handleDragEnd = useCallback(() => {
    setDragOverKey(null);
    setDraggingKey(null);
    dragRef.current = { dragNode: null, dropNode: null, dropPosition: 'inside' };
  }, []);

  // Build drag class map for each node key
  const getDragOverClass = useCallback(
    (key: string) => {
      const classes: string[] = [];
      if (draggingKey === key) classes.push('aero-tree-node--dragging');
      if (dragOverKey === key) {
        if (dropPosition === 'before') classes.push('aero-tree-node--drag-over-top');
        else if (dropPosition === 'after') classes.push('aero-tree-node--drag-over-bottom');
        else classes.push('aero-tree-node--drag-over-inner');
      }
      return classes.join(' ');
    },
    [draggingKey, dragOverKey, dropPosition],
  );

  // We need to pass drag props through to TreeNode via a wrapper Tree
  // Strategy: use a custom renderChildren-like approach by wrapping Tree
  // and injecting drag props. Since Tree's renderChildren is internal,
  // we'll create a DraggableTree that duplicates Tree's rendering with drag props.

  return (
    <DraggableTreeInner
      treeData={treeData}
      className={className}
      {...restProps}
      getDragOverClass={getDragOverClass}
      onNodeDragStart={handleDragStart}
      onNodeDragOver={handleDragOver}
      onNodeDragLeave={handleDragLeave}
      onNodeDrop={handleDrop}
      onNodeDragEnd={handleDragEnd}
    />
  );
};

// Inner component that renders Tree with drag props injected into TreeNode
interface DraggableTreeInnerProps extends TreeProps {
  getDragOverClass: (key: string) => string;
  onNodeDragStart: (e: React.DragEvent, node: TreeNodeData) => void;
  onNodeDragOver: (e: React.DragEvent, node: TreeNodeData) => void;
  onNodeDragLeave: (e: React.DragEvent) => void;
  onNodeDrop: (e: React.DragEvent, node: TreeNodeData) => void;
  onNodeDragEnd: (e: React.DragEvent) => void;
}

const DraggableTreeInner: React.FC<DraggableTreeInnerProps> = ({
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
  getDragOverClass,
  onNodeDragStart,
  onNodeDragOver,
  onNodeDragLeave,
  onNodeDrop,
  onNodeDragEnd,
}) => {
  // Duplicate Tree's state logic (same as Tree component)
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

  const descendantMap = useMemo(() => buildDescendantLeafMap(treeData), [treeData]);
  const disabledLeafKeys = useMemo(() => collectDisabledLeafKeys(treeData, disabled), [treeData, disabled]);

  const isCheckControlled = checkedKeys !== undefined;
  const [internalCheckedLeaves, setInternalCheckedLeaves] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const key of defaultCheckedKeys) {
      const leaves = descendantMap.get(key);
      if (leaves) leaves.forEach((k) => initial.add(k));
    }
    return initial;
  });

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
      const leaves = allLeaves.filter((k) => !disabledLeafKeys.has(k));
      if (leaves.length === 0) return;
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
          draggable
          dragOverClass={getDragOverClass(node.key)}
          onDragStart={onNodeDragStart}
          onDragOver={onNodeDragOver}
          onDragLeave={onNodeDragLeave}
          onDrop={onNodeDrop}
          onDragEnd={onNodeDragEnd}
        />
      )),
    [expandedSet, selectedSet, checkedSet, halfCheckedSet, checkable, showLine, showIcon, disabled, handleToggle, handleSelect, handleCheck, getDragOverClass, onNodeDragStart, onNodeDragOver, onNodeDragLeave, onNodeDrop, onNodeDragEnd],
  );

  const classNames = [
    'aero-tree',
    'aero-tree--draggable',
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

// ---- Compound export ----

type TreeComponent = React.FC<TreeProps> & {
  Draggable: React.FC<DraggableTreeProps>;
};

const TreeWithDraggable = Tree as TreeComponent;
TreeWithDraggable.Draggable = DraggableTree;

export default TreeWithDraggable;

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Checkbox from '../Checkbox';
import Pagination from '../Pagination';
import Empty from '../Empty';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export type SortOrder = 'ascend' | 'descend' | null;
export type ColumnAlign = 'left' | 'center' | 'right';
export type TableSize = 'small' | 'medium' | 'large';
export type RowKey<T> = keyof T | ((record: T) => string | number);

export interface ColumnType<T = any> {
  /** 列标题 */
  title: React.ReactNode;
  /** 数据字段名 */
  dataIndex?: string;
  /** 唯一标识（默认取 dataIndex） */
  key?: string;
  /** 列宽 */
  width?: number | string;
  /** 对齐方式 */
  align?: ColumnAlign;
  /** 固定列 */
  fixed?: 'left' | 'right';
  /** 自定义渲染 */
  render?: (value: any, record: T, index: number) => React.ReactNode;
  /** 排序函数 */
  sorter?: (a: T, b: T) => number;
  /** 默认排序 */
  defaultSortOrder?: SortOrder;
  /** 文本溢出省略 */
  ellipsis?: boolean;
  /** 自定义 className */
  className?: string;
}

export interface RowSelection<T = any> {
  /** 选中的行 key */
  selectedRowKeys?: (string | number)[];
  /** 选中变化回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void;
  /** 行是否可选 */
  getCheckboxProps?: (record: T) => { disabled?: boolean };
}

export interface TableProps<T = any> {
  /** 列配置 */
  columns: ColumnType<T>[];
  /** 数据源 */
  dataSource: T[];
  /** 行唯一标识 */
  rowKey?: RowKey<T>;
  /** 行选择配置 */
  rowSelection?: RowSelection<T>;
  /** 分页配置，false 关闭分页 */
  pagination?: {
    current?: number;
    defaultCurrent?: number;
    pageSize?: number;
    defaultPageSize?: number;
    total?: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    pageSizeOptions?: number[];
    onChange?: (page: number, pageSize: number) => void;
  } | false;
  /** 尺寸 */
  size?: TableSize;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 空状态自定义 */
  emptyText?: React.ReactNode;
  /** 行点击 */
  onRow?: (record: T, index: number) => {
    onClick?: (e: React.MouseEvent) => void;
  };
  /** 表头吸顶 */
  sticky?: boolean;
  /** 纵向滚动高度 */
  scroll?: { y?: number | string };
  /** 默认展开的行 key（非受控） */
  defaultExpandedRowKeys?: (string | number)[];
  /** 展开的行 key（受控） */
  expandedRowKeys?: (string | number)[];
  /** 展开行变化回调 */
  onExpandedRowsChange?: (keys: (string | number)[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 工具函数 ----

function getRowKeyValue<T>(record: T, rowKey: RowKey<T>, index: number): string | number {
  if (typeof rowKey === 'function') return rowKey(record);
  const val = (record as any)[rowKey];
  return val !== undefined ? val : index;
}

function getFieldValue(record: any, dataIndex?: string): any {
  if (!dataIndex) return undefined;
  return record[dataIndex];
}

function getColumnKey<T>(col: ColumnType<T>, index: number): string {
  return (col.key ?? col.dataIndex ?? String(index)) as string;
}

// ---- 展开行工具 ----

interface FlatRow<T> {
  record: T;
  level: number;
  key: string | number;
  hasChildren: boolean;
}

function flattenData<T>(
  data: T[],
  rowKey: RowKey<T>,
  expandedKeys: Set<string | number>,
  level = 0,
  parentIndex = 0,
): FlatRow<T>[] {
  const result: FlatRow<T>[] = [];
  data.forEach((record, i) => {
    const key = getRowKeyValue(record, rowKey, parentIndex + i);
    const children = (record as any).children as T[] | undefined;
    const hasChildren = Array.isArray(children) && children.length > 0;
    result.push({ record, level, key, hasChildren });
    if (hasChildren && expandedKeys.has(key)) {
      result.push(...flattenData(children!, rowKey, expandedKeys, level + 1, 0));
    }
  });
  return result;
}

// ---- 排序图标 ----

const SortIcon: React.FC<{ order: SortOrder }> = ({ order }) => (
  <span className="aero-table-sorter">
    <svg className={`aero-table-sorter-icon${order === 'ascend' ? ' aero-table-sorter-icon--active' : ''}`} viewBox="0 0 10 6" width="10" height="6">
      <path d="M5 0L10 6H0z" fill="currentColor" />
    </svg>
    <svg className={`aero-table-sorter-icon${order === 'descend' ? ' aero-table-sorter-icon--active' : ''}`} viewBox="0 0 10 6" width="10" height="6" style={{ transform: 'rotate(180deg)' }}>
      <path d="M5 0L10 6H0z" fill="currentColor" />
    </svg>
  </span>
);

// ---- Loading 骨架 ----

const LoadingOverlay: React.FC = () => (
  <div className="aero-table-loading">
    <div className="aero-table-loading-spinner">
      <span /><span /><span />
    </div>
  </div>
);

// ---- Table ----

function Table<T = any>({
  columns,
  dataSource,
  rowKey = 'id' as RowKey<T>,
  rowSelection,
  pagination,
  size: sizeProp = 'medium',
  bordered = false,
  striped = false,
  loading = false,
  emptyText,
  onRow,
  sticky = false,
  scroll,
  defaultExpandedRowKeys,
  expandedRowKeys: expandedRowKeysProp,
  onExpandedRowsChange,
  className,
  style,
}: TableProps<T>) {
  const size = useSize(sizeProp);
  // ---- 展开行 ----
  const [innerExpandedKeys, setInnerExpandedKeys] = useState<(string | number)[]>(defaultExpandedRowKeys ?? []);
  const expandedKeys = expandedRowKeysProp ?? innerExpandedKeys;
  const expandedSet = useMemo(() => new Set(expandedKeys), [expandedKeys]);

  const hasTreeData = useMemo(() =>
    dataSource.some((r) => Array.isArray((r as any).children) && (r as any).children.length > 0),
  [dataSource]);

  const handleToggleExpand = useCallback((key: string | number) => {
    const next = expandedSet.has(key)
      ? expandedKeys.filter((k) => k !== key)
      : [...expandedKeys, key];
    if (expandedRowKeysProp === undefined) setInnerExpandedKeys(next);
    onExpandedRowsChange?.(next);
  }, [expandedKeys, expandedSet, expandedRowKeysProp, onExpandedRowsChange]);
  // ---- 排序 ----
  const defaultSort = useMemo(() => {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].defaultSortOrder) {
        return { key: getColumnKey(columns[i], i), order: columns[i].defaultSortOrder! };
      }
    }
    return { key: '', order: null as SortOrder };
  }, [columns]);

  const [sortKey, setSortKey] = useState(defaultSort.key);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultSort.order);

  const handleSort = useCallback((colKey: string) => {
    if (sortKey === colKey) {
      const next: SortOrder = sortOrder === 'ascend' ? 'descend' : sortOrder === 'descend' ? null : 'ascend';
      setSortOrder(next);
      if (next === null) setSortKey('');
    } else {
      setSortKey(colKey);
      setSortOrder('ascend');
    }
  }, [sortKey, sortOrder]);

  const sortedData = useMemo(() => {
    if (!sortOrder || !sortKey) return dataSource;
    const col = columns.find((c, i) => getColumnKey(c, i) === sortKey);
    if (!col?.sorter) return dataSource;
    const sorted = [...dataSource].sort(col.sorter);
    return sortOrder === 'descend' ? sorted.reverse() : sorted;
  }, [dataSource, columns, sortKey, sortOrder]);

  // ---- 分页 ----
  const paginationEnabled = pagination !== false;
  const pg = paginationEnabled ? pagination : undefined;
  const [innerPage, setInnerPage] = useState(pg?.defaultCurrent ?? 1);
  const [innerPageSize, setInnerPageSize] = useState(pg?.defaultPageSize ?? 10);

  const currentPage = pg?.current !== undefined ? pg.current : innerPage;
  const pageSize = pg?.pageSize !== undefined ? pg.pageSize : innerPageSize;
  const total = pg?.total !== undefined ? pg.total : sortedData.length;
  const isRemotePagination = pg?.total !== undefined;

  const pagedData = useMemo(() => {
    if (!paginationEnabled || isRemotePagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, paginationEnabled, isRemotePagination, currentPage, pageSize]);

  const handlePageChange = useCallback((page: number, ps: number) => {
    setInnerPage(page);
    setInnerPageSize(ps);
    pg?.onChange?.(page, ps);
  }, [pg]);

  // ---- 选择 ----
  const selectable = !!rowSelection;
  const selectedKeys = rowSelection?.selectedRowKeys ?? [];

  const allRowKeys = useMemo(() =>
    pagedData.map((r, i) => getRowKeyValue(r, rowKey, i)),
  [pagedData, rowKey]);

  const selectableKeys = useMemo(() => {
    if (!rowSelection?.getCheckboxProps) return allRowKeys;
    return allRowKeys.filter((_, i) => !rowSelection.getCheckboxProps!(pagedData[i])?.disabled);
  }, [allRowKeys, pagedData, rowSelection]);

  const allSelected = selectableKeys.length > 0 && selectableKeys.every((k) => selectedKeys.includes(k));
  const someSelected = !allSelected && selectableKeys.some((k) => selectedKeys.includes(k));

  const handleSelectAll = useCallback((checked: boolean) => {
    if (!rowSelection?.onChange) return;
    let nextKeys: (string | number)[];
    if (checked) {
      const set = new Set(selectedKeys);
      selectableKeys.forEach((k) => set.add(k));
      nextKeys = Array.from(set);
    } else {
      const removeSet = new Set(selectableKeys);
      nextKeys = selectedKeys.filter((k) => !removeSet.has(k));
    }
    const nextRows = dataSource.filter((r, i) => nextKeys.includes(getRowKeyValue(r, rowKey, i)));
    rowSelection.onChange(nextKeys, nextRows);
  }, [rowSelection, selectedKeys, selectableKeys, dataSource, rowKey]);

  const handleSelectRow = useCallback((key: string | number, checked: boolean) => {
    if (!rowSelection?.onChange) return;
    const nextKeys = checked ? [...selectedKeys, key] : selectedKeys.filter((k) => k !== key);
    const nextRows = dataSource.filter((r, i) => nextKeys.includes(getRowKeyValue(r, rowKey, i)));
    rowSelection.onChange(nextKeys, nextRows);
  }, [rowSelection, selectedKeys, dataSource, rowKey]);

  // ---- 固定列偏移计算 ----
  const SELECTION_WIDTH = size === 'small' ? 40 : 48;

  const fixedOffsets = useMemo(() => {
    // 构建完整列列表（含选择列）
    type ColEntry = { key: string; fixed?: 'left' | 'right'; width: number };
    const allCols: ColEntry[] = [];
    if (selectable) {
      allCols.push({ key: '__selection__', fixed: 'left', width: SELECTION_WIDTH });
    }
    columns.forEach((col, ci) => {
      const w = typeof col.width === 'number' ? col.width : (typeof col.width === 'string' ? parseInt(col.width, 10) || 0 : 0);
      allCols.push({ key: getColumnKey(col, ci), fixed: col.fixed, width: w });
    });

    const offsets = new Map<string, number>();

    // 从左往右累加 fixed-left
    let leftAcc = 0;
    for (const col of allCols) {
      if (col.fixed === 'left') {
        offsets.set(col.key, leftAcc);
        leftAcc += col.width;
      }
    }

    // 从右往左累加 fixed-right
    let rightAcc = 0;
    for (let i = allCols.length - 1; i >= 0; i--) {
      const col = allCols[i];
      if (col.fixed === 'right') {
        offsets.set(col.key, rightAcc);
        rightAcc += col.width;
      }
    }

    return offsets;
  }, [columns, selectable, SELECTION_WIDTH]);

  // 找出边界列 key（阴影只画在边界列上）
  const fixedBoundary = useMemo(() => {
    type ColEntry = { key: string; fixed?: 'left' | 'right' };
    const allCols: ColEntry[] = [];
    if (selectable) allCols.push({ key: '__selection__', fixed: 'left' });
    columns.forEach((col, ci) => allCols.push({ key: getColumnKey(col, ci), fixed: col.fixed }));

    let lastFixedLeft = '';
    let firstFixedRight = '';
    for (const col of allCols) {
      if (col.fixed === 'left') lastFixedLeft = col.key;
    }
    for (const col of allCols) {
      if (col.fixed === 'right') { firstFixedRight = col.key; break; }
    }
    return { lastFixedLeft, firstFixedRight };
  }, [columns, selectable]);

  const getFixedStyle = (key: string, fixed?: 'left' | 'right'): React.CSSProperties | undefined => {
    if (!fixed) return undefined;
    const offset = fixedOffsets.get(key) ?? 0;
    return fixed === 'left' ? { left: offset } : { right: offset };
  };

  const getFixedCls = (key: string, fixed?: 'left' | 'right'): string => {
    if (!fixed) return '';
    const base = `aero-table-cell--fixed-${fixed}`;
    const isBoundary =
      (fixed === 'left' && key === fixedBoundary.lastFixedLeft) ||
      (fixed === 'right' && key === fixedBoundary.firstFixedRight);
    return isBoundary ? `${base} aero-table-cell--fixed-${fixed}-boundary` : base;
  };

  // ---- 固定列阴影 ----
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ left: false, right: false });
  const hasFixedLeft = columns.some((c) => c.fixed === 'left') || selectable;
  const hasFixedRight = columns.some((c) => c.fixed === 'right');

  const updateScrollShadow = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setScrollState({
      left: el.scrollLeft > 0,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
    });
  }, []);

  useEffect(() => {
    updateScrollShadow();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollShadow, { passive: true });
    const ro = new ResizeObserver(updateScrollShadow);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', updateScrollShadow);
      ro.disconnect();
    };
  }, [updateScrollShadow]);

  // ---- 渲染 ----
  const cls = [
    'aero-table-wrapper',
    `aero-table--${size}`,
    bordered ? 'aero-table--bordered' : '',
    striped ? 'aero-table--striped' : '',
    sticky ? 'aero-table--sticky' : '',
    loading ? 'aero-table--loading' : '',
    hasFixedLeft && scrollState.left ? 'aero-table--scroll-left' : '',
    hasFixedRight && scrollState.right ? 'aero-table--scroll-right' : '',
    className || '',
  ].filter(Boolean).join(' ');

  const scrollStyle: React.CSSProperties | undefined = scroll?.y
    ? { maxHeight: scroll.y, overflowY: 'auto' }
    : undefined;

  // ---- 展平树形数据（排序后、分页后） ----
  const flatRows = useMemo<FlatRow<T>[]>(() => {
    if (!hasTreeData) return pagedData.map((record, i) => ({
      record,
      level: 0,
      key: getRowKeyValue(record, rowKey, i),
      hasChildren: false,
    }));
    return flattenData(pagedData, rowKey, expandedSet);
  }, [pagedData, rowKey, expandedSet, hasTreeData]);

  // 找到第一个数据列的 index（用于放展开图标）
  const firstDataColIndex = 0;

  return (
    <div className={cls} style={style}>
      <div className="aero-table-container" ref={scrollRef} style={scrollStyle}>
        {loading && <LoadingOverlay />}
        <table className="aero-table">
          <colgroup>
            {selectable && <col className="aero-table-col-selection" />}
            {columns.map((col, ci) => (
              <col key={getColumnKey(col, ci)} style={col.width ? { width: col.width } : undefined} />
            ))}
          </colgroup>
          <thead className="aero-table-thead">
            <tr>
              {selectable && (
                <th className={['aero-table-cell', 'aero-table-cell-checkbox', getFixedCls('__selection__', 'left')].join(' ')} style={getFixedStyle('__selection__', 'left')}>
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={handleSelectAll}
                    size="small"
                  />
                </th>
              )}
              {columns.map((col, ci) => {
                const colKey = getColumnKey(col, ci);
                const sortable = !!col.sorter;
                const currentOrder = sortKey === colKey ? sortOrder : null;
                return (
                  <th
                    key={colKey}
                    className={[
                      'aero-table-cell',
                      'aero-table-cell-header',
                      col.align ? `aero-table-cell--${col.align}` : '',
                      sortable ? 'aero-table-cell--sortable' : '',
                      currentOrder ? `aero-table-cell--sorted` : '',
                      getFixedCls(colKey, col.fixed),
                      col.className || '',
                    ].filter(Boolean).join(' ')}
                    style={getFixedStyle(colKey, col.fixed)}
                    onClick={sortable ? () => handleSort(colKey) : undefined}
                  >
                    <span className="aero-table-cell-content">
                      {col.title}
                      {sortable && <SortIcon order={currentOrder} />}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="aero-table-tbody">
            {flatRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="aero-table-cell aero-table-cell-empty">
                  {emptyText ?? <Empty preset="noData" style={{ padding: '24px 16px' }} />}
                </td>
              </tr>
            ) : (
              flatRows.map(({ record, level, key, hasChildren }, ri) => {
                const isSelected = selectedKeys.includes(key);
                const checkboxProps = rowSelection?.getCheckboxProps?.(record);
                const rowEvents = onRow?.(record, ri);
                return (
                  <tr
                    key={key}
                    className={[
                      'aero-table-row',
                      isSelected ? 'aero-table-row--selected' : '',
                      level > 0 ? 'aero-table-row--child' : '',
                    ].filter(Boolean).join(' ')}
                    onClick={rowEvents?.onClick}
                  >
                    {selectable && (
                      <td className={['aero-table-cell', 'aero-table-cell-checkbox', getFixedCls('__selection__', 'left')].join(' ')} style={getFixedStyle('__selection__', 'left')}>
                        <Checkbox
                          checked={isSelected}
                          disabled={checkboxProps?.disabled}
                          onChange={(checked) => handleSelectRow(key, checked)}
                          size="small"
                        />
                      </td>
                    )}
                    {columns.map((col, ci) => {
                      const colKey = getColumnKey(col, ci);
                      const val = getFieldValue(record, col.dataIndex);
                      const isExpandCol = hasTreeData && ci === firstDataColIndex;
                      return (
                        <td
                          key={colKey}
                          className={[
                            'aero-table-cell',
                            col.align ? `aero-table-cell--${col.align}` : '',
                            col.ellipsis ? 'aero-table-cell--ellipsis' : '',
                            getFixedCls(colKey, col.fixed),
                            col.className || '',
                          ].filter(Boolean).join(' ')}
                          style={getFixedStyle(colKey, col.fixed)}
                        >
                          {isExpandCol ? (
                            <span className="aero-table-expand-cell">
                              {hasChildren ? (
                                <span
                                  className={`aero-table-expand-icon${expandedSet.has(key) ? ' aero-table-expand-icon--open' : ''}`}
                                  onClick={(e) => { e.stopPropagation(); handleToggleExpand(key); }}
                                >
                                  <ChevronRight size={14} />
                                </span>
                              ) : (
                                <span className="aero-table-expand-placeholder" />
                              )}
                              {col.render ? col.render(val, record, ri) : val}
                            </span>
                          ) : (
                            col.render ? col.render(val, record, ri) : val
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {paginationEnabled && total > 0 && (
        <div className="aero-table-pagination">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={total}
            size={size === 'large' ? 'medium' : 'small'}
            onChange={handlePageChange}
            showSizeChanger={pg?.showSizeChanger}
            showQuickJumper={pg?.showQuickJumper}
            showTotal={pg?.showTotal}
            pageSizeOptions={pg?.pageSizeOptions}
          />
        </div>
      )}
    </div>
  );
}

export default Table;

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import Icon from '../Icon';
import InputNumber from '../InputNumber';
import Select from '../Select';
import './index.less';

// ---- Types ----

export interface PaginationProps {
  /** 当前页（受控） */
  current?: number;
  /** 默认当前页 */
  defaultCurrent?: number;
  /** 数据总数 */
  total?: number;
  /** 每页条数（受控） */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 页码/pageSize 变化回调 */
  onChange?: (page: number, pageSize: number) => void;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 禁用 */
  disabled?: boolean;
  /** 显示快速跳转输入框 */
  showQuickJumper?: boolean;
  /** 显示 pageSize 切换器 */
  showSizeChanger?: boolean;
  /** pageSize 选项 */
  pageSizeOptions?: number[];
  /** 显示总数 */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /** 简洁模式 */
  simple?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 页码生成 ----

type PageItem = number | 'left' | 'right';

function generatePages(current: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: PageItem[] = [];
  const left = Math.max(2, current - 2);
  const right = Math.min(totalPages - 1, current + 2);

  pages.push(1);

  if (left > 2) {
    pages.push('left');
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < totalPages - 1) {
    pages.push('right');
  }

  pages.push(totalPages);

  return pages;
}

// ---- 尺寸映射 ----

const iconSizeMap = { small: 12, medium: 14, large: 16 };

// ---- 省略号按钮 ----

const EllipsisButton: React.FC<{
  direction: 'left' | 'right';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
}> = ({ direction, size, disabled, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const iconSize = iconSizeMap[size];

  return (
    <button
      className={[
        'aero-pagination-item',
        'aero-pagination-ellipsis',
        disabled ? 'aero-pagination-item--disabled' : '',
      ].filter(Boolean).join(' ')}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      type="button"
    >
      {hovered && !disabled ? (
        <Icon icon={direction === 'left' ? ChevronsLeft : ChevronsRight} size={iconSize} />
      ) : (
        <Icon icon={Ellipsis} size={iconSize} />
      )}
    </button>
  );
};

// ---- Pagination ----

const Pagination: React.FC<PaginationProps> = ({
  current,
  defaultCurrent = 1,
  total = 0,
  pageSize,
  defaultPageSize = 10,
  onChange,
  size = 'medium',
  disabled = false,
  showQuickJumper = false,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal,
  simple = false,
  className,
  style,
}) => {
  // ---- pageSize 状态 ----
  const isPageSizeControlled = pageSize !== undefined;
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const currentPageSize = isPageSizeControlled ? pageSize! : internalPageSize;

  // ---- current 状态 ----
  const isCurrentControlled = current !== undefined;
  const [internalCurrent, setInternalCurrent] = useState(defaultCurrent);
  const currentPage = isCurrentControlled ? current! : internalCurrent;

  const totalPages = Math.max(1, Math.ceil(total / currentPageSize));
  const safeCurrent = Math.max(1, Math.min(currentPage, totalPages));

  const changePage = useCallback(
    (page: number, newPageSize?: number) => {
      const ps = newPageSize ?? currentPageSize;
      const maxPage = Math.max(1, Math.ceil(total / ps));
      const safePage = Math.max(1, Math.min(page, maxPage));
      if (!isCurrentControlled) setInternalCurrent(safePage);
      if (newPageSize !== undefined && !isPageSizeControlled) setInternalPageSize(newPageSize);
      onChange?.(safePage, ps);
    },
    [currentPageSize, total, isCurrentControlled, isPageSizeControlled, onChange],
  );

  // ---- 页码列表 ----
  const pages = useMemo(() => generatePages(safeCurrent, totalPages), [safeCurrent, totalPages]);

  const iconSize = iconSizeMap[size];

  // ---- simple 模式 ----
  if (simple) {
    return (
      <SimplePagination
        current={safeCurrent}
        totalPages={totalPages}
        size={size}
        disabled={disabled}
        className={className}
        style={style}
        onChange={(page) => changePage(page)}
      />
    );
  }

  // ---- range for showTotal ----
  const rangeStart = total === 0 ? 0 : (safeCurrent - 1) * currentPageSize + 1;
  const rangeEnd = Math.min(safeCurrent * currentPageSize, total);

  const containerCls = [
    'aero-pagination',
    `aero-pagination--${size}`,
    disabled ? 'aero-pagination--disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={containerCls} style={style} aria-label="pagination">
      {/* 总数 */}
      {showTotal && (
        <span className="aero-pagination-total">
          {showTotal(total, [rangeStart, rangeEnd])}
        </span>
      )}

      {/* 上一页 */}
      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-prev',
          safeCurrent <= 1 ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || safeCurrent <= 1}
        onClick={() => changePage(safeCurrent - 1)}
        type="button"
        aria-label="上一页"
      >
        <Icon icon={ChevronLeft} size={iconSize} />
      </button>

      {/* 页码 */}
      {pages.map((item, idx) => {
        if (item === 'left') {
          return (
            <EllipsisButton
              key="left-ellipsis"
              direction="left"
              size={size}
              disabled={disabled}
              onClick={() => changePage(Math.max(1, safeCurrent - 5))}
            />
          );
        }
        if (item === 'right') {
          return (
            <EllipsisButton
              key="right-ellipsis"
              direction="right"
              size={size}
              disabled={disabled}
              onClick={() => changePage(Math.min(totalPages, safeCurrent + 5))}
            />
          );
        }
        return (
          <button
            key={item}
            className={[
              'aero-pagination-item',
              item === safeCurrent ? 'aero-pagination-item--active' : '',
            ].filter(Boolean).join(' ')}
            disabled={disabled}
            onClick={() => changePage(item)}
            type="button"
            aria-current={item === safeCurrent ? 'page' : undefined}
          >
            {item}
          </button>
        );
      })}

      {/* 下一页 */}
      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-next',
          safeCurrent >= totalPages ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || safeCurrent >= totalPages}
        onClick={() => changePage(safeCurrent + 1)}
        type="button"
        aria-label="下一页"
      >
        <Icon icon={ChevronRight} size={iconSize} />
      </button>

      {/* pageSize 切换 */}
      {showSizeChanger && (
        <Select
          className="aero-pagination-size-changer"
          size={size}
          disabled={disabled}
          value={currentPageSize}
          options={pageSizeOptions.map((opt) => ({ label: `${opt} 条/页`, value: opt }))}
          onChange={(val) => {
            const newSize = Number(val);
            const newPage = Math.max(1, Math.ceil(rangeStart / newSize));
            changePage(newPage, newSize);
          }}
        />
      )}

      {/* 快速跳转 */}
      {showQuickJumper && (
        <QuickJumper
          disabled={disabled}
          totalPages={totalPages}
          size={size}
          onChange={(page) => changePage(page)}
        />
      )}
    </nav>
  );
};

// ---- QuickJumper ----

const QuickJumper: React.FC<{
  disabled?: boolean;
  totalPages: number;
  size: 'small' | 'medium' | 'large';
  onChange: (page: number) => void;
}> = ({ disabled, totalPages, size, onChange }) => {
  const handleChange = useCallback(
    (val: number | null) => {
      if (val !== null && val >= 1 && val <= totalPages) {
        onChange(val);
      }
    },
    [totalPages, onChange],
  );

  return (
    <span className="aero-pagination-jumper">
      <span className="aero-pagination-jumper-text">跳至</span>
      <InputNumber
        className="aero-pagination-jumper-input"
        size={size}
        min={1}
        max={totalPages}
        disabled={disabled}
        controls={false}
        placeholder=""
        onPressEnter={() => {}}
        onChange={handleChange}
      />
      <span className="aero-pagination-jumper-text">页</span>
    </span>
  );
};

// ---- SimplePagination ----

const SimplePagination: React.FC<{
  current: number;
  totalPages: number;
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange: (page: number) => void;
}> = ({ current, totalPages, size, disabled, className, style, onChange }) => {
  const iconSize = iconSizeMap[size];

  const containerCls = [
    'aero-pagination',
    'aero-pagination--simple',
    `aero-pagination--${size}`,
    disabled ? 'aero-pagination--disabled' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <nav className={containerCls} style={style} aria-label="pagination">
      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-prev',
          current <= 1 ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || current <= 1}
        onClick={() => onChange(current - 1)}
        type="button"
        aria-label="上一页"
      >
        <Icon icon={ChevronLeft} size={iconSize} />
      </button>

      <span className="aero-pagination-simple-pager">
        <InputNumber
          className="aero-pagination-simple-input"
          size={size}
          value={current}
          min={1}
          max={totalPages}
          disabled={disabled}
          controls={false}
          onChange={(val) => {
            if (val !== null && val >= 1 && val <= totalPages) {
              onChange(val);
            }
          }}
        />
        <span className="aero-pagination-simple-separator">/</span>
        <span className="aero-pagination-simple-total">{totalPages}</span>
      </span>

      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-next',
          current >= totalPages ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || current >= totalPages}
        onClick={() => onChange(current + 1)}
        type="button"
        aria-label="下一页"
      >
        <Icon icon={ChevronRight} size={iconSize} />
      </button>
    </nav>
  );
};

export default Pagination;

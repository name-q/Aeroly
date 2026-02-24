import React, { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Ellipsis } from 'lucide-react';
import Icon from '../Icon';
import InputNumber from '../InputNumber';
import Select from '../Select';
import { useLocale, useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface PaginationProps {
  /** Current page (controlled) */
  current?: number;
  /** Default current page */
  defaultCurrent?: number;
  /** Total data count */
  total?: number;
  /** Items per page（Controlled） */
  pageSize?: number;
  /** DefaultItems per page */
  defaultPageSize?: number;
  /** Page numbers/pageSize Change callback */
  onChange?: (page: number, pageSize: number) => void;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Disabled */
  disabled?: boolean;
  /** Show quick jump input */
  showQuickJumper?: boolean;
  /** Show page size switcher */
  showSizeChanger?: boolean;
  /** Page size options */
  pageSizeOptions?: number[];
  /** Show total count */
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
  /** Simple mode */
  simple?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Page number generation ----

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

// ---- Size mapping ----

const iconSizeMap = { small: 12, medium: 14, large: 16 };

// ---- Ellipsis button ----

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
  size: sizeProp,
  disabled = false,
  showQuickJumper = false,
  showSizeChanger = false,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal,
  simple = false,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const localePag = useLocale('Pagination');
  // ---- pageSize Status ----
  const isPageSizeControlled = pageSize !== undefined;
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const currentPageSize = isPageSizeControlled ? pageSize! : internalPageSize;

  // ---- current Status ----
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

  // ---- Page number list ----
  const pages = useMemo(() => generatePages(safeCurrent, totalPages), [safeCurrent, totalPages]);

  const iconSize = iconSizeMap[size];

  // ---- simple Mode ----
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
      {/* Total count */}
      {showTotal && (
        <span className="aero-pagination-total">
          {showTotal(total, [rangeStart, rangeEnd])}
        </span>
      )}

      {/* Previous page */}
      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-prev',
          safeCurrent <= 1 ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || safeCurrent <= 1}
        onClick={() => changePage(safeCurrent - 1)}
        type="button"
        aria-label={localePag.prevPage}
      >
        <Icon icon={ChevronLeft} size={iconSize} />
      </button>

      {/* Page numbers */}
      {pages.map((item) => {
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

      {/* Next page */}
      <button
        className={[
          'aero-pagination-item',
          'aero-pagination-next',
          safeCurrent >= totalPages ? 'aero-pagination-item--disabled' : '',
        ].filter(Boolean).join(' ')}
        disabled={disabled || safeCurrent >= totalPages}
        onClick={() => changePage(safeCurrent + 1)}
        type="button"
        aria-label={localePag.nextPage}
      >
        <Icon icon={ChevronRight} size={iconSize} />
      </button>

      {/* pageSize switcher */}
      {showSizeChanger && (
        <Select
          className="aero-pagination-size-changer"
          size={size}
          disabled={disabled}
          value={currentPageSize}
          options={pageSizeOptions.map((opt) => ({ label: localePag.itemsPerPage.replace('{size}', String(opt)), value: opt }))}
          onChange={(val) => {
            const newSize = Number(val);
            const newPage = Math.max(1, Math.ceil(rangeStart / newSize));
            changePage(newPage, newSize);
          }}
        />
      )}

      {/* Quick jump */}
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
  const localePag = useLocale('Pagination');
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
      <span className="aero-pagination-jumper-text">{localePag.jumpTo}</span>
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
      <span className="aero-pagination-jumper-text">{localePag.page}</span>
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
  const localePag = useLocale('Pagination');
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
        aria-label={localePag.prevPage}
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
        aria-label={localePag.nextPage}
      >
        <Icon icon={ChevronRight} size={iconSize} />
      </button>
    </nav>
  );
};

export default Pagination;

import React from 'react';
import './index.less';

// ---- Types ----

export interface DescriptionsItem {
  /** 标签名 */
  label: React.ReactNode;
  /** 内容 */
  children: React.ReactNode;
  /** 占据列数 */
  span?: number;
}

export interface DescriptionsProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 额外操作区（右上角） */
  extra?: React.ReactNode;
  /** 描述项列表 */
  items: DescriptionsItem[];
  /** 每行列数 */
  column?: number;
  /** 布局方向 */
  layout?: 'horizontal' | 'vertical';
  /** 是否显示边框 */
  bordered?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** label 对齐方式 */
  labelAlign?: 'left' | 'right';
  /** 冒号 */
  colon?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- 将 items 按 column 分行，支持 span ----

function buildRows(items: DescriptionsItem[], column: number): DescriptionsItem[][] {
  const rows: DescriptionsItem[][] = [];
  let cur: DescriptionsItem[] = [];
  let used = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLast = i === items.length - 1;
    let span = Math.min(item.span ?? 1, column);
    if (isLast && used + span < column) {
      span = column - used;
    }
    if (used + span > column) {
      rows.push(cur);
      cur = [];
      used = 0;
    }
    cur.push({ ...item, span });
    used += span;
    if (used >= column) {
      rows.push(cur);
      cur = [];
      used = 0;
    }
  }
  if (cur.length) rows.push(cur);
  return rows;
}

// ---- 渲染 label + colon ----

function renderLabel(item: DescriptionsItem, labelAlign: string, colon: boolean) {
  return (
    <>
      {item.label}
      {colon && <span className="aero-descriptions-colon">:</span>}
    </>
  );
}

// ---- Component ----

const Descriptions: React.FC<DescriptionsProps> = ({
  title,
  extra,
  items,
  column = 3,
  layout = 'horizontal',
  bordered = false,
  size = 'medium',
  labelAlign = 'left',
  colon = true,
  className,
  style,
}) => {
  const rows = buildRows(items, column);

  const cls = [
    'aero-descriptions',
    `aero-descriptions--${size}`,
    `aero-descriptions--${layout}`,
    bordered ? 'aero-descriptions--bordered' : '',
    className || '',
  ].filter(Boolean).join(' ');

  const labelCls = `aero-descriptions-label aero-descriptions-label--${labelAlign}`;

  const renderVerticalRows = () =>
    rows.map((row, ri) => (
      <React.Fragment key={ri}>
        <tr className="aero-descriptions-row">
          {row.map((item, ci) => (
            <th key={ci} className={labelCls} colSpan={item.span}>
              {renderLabel(item, labelAlign, colon)}
            </th>
          ))}
        </tr>
        <tr className="aero-descriptions-row">
          {row.map((item, ci) => (
            <td key={ci} className="aero-descriptions-content" colSpan={item.span}>
              {item.children}
            </td>
          ))}
        </tr>
      </React.Fragment>
    ));

  const renderHorizontalRows = () =>
    rows.map((row, ri) => (
      <tr key={ri} className="aero-descriptions-row">
        {row.map((item, ci) => (
          <React.Fragment key={ci}>
            <th className={labelCls}>
              {renderLabel(item, labelAlign, colon)}
            </th>
            <td
              className="aero-descriptions-content"
              colSpan={bordered ? (item.span! * 2 - 1) : item.span! * 2 - 1}
            >
              {item.children}
            </td>
          </React.Fragment>
        ))}
      </tr>
    ));

  return (
    <div className={cls} style={style}>
      {(title || extra) && (
        <div className="aero-descriptions-header">
          {title && <div className="aero-descriptions-title">{title}</div>}
          {extra && <div className="aero-descriptions-extra">{extra}</div>}
        </div>
      )}
      <table className="aero-descriptions-table">
        <tbody>
          {layout === 'vertical' ? renderVerticalRows() : renderHorizontalRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Descriptions;

import React from 'react';
import './index.less';

export interface DividerProps {
  /** 分割线方向 */
  direction?: 'horizontal' | 'vertical';
  /** 文字位置（仅水平方向有效） */
  orientation?: 'left' | 'center' | 'right';
  /** 分割线内嵌文字 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  orientation = 'center',
  children,
  className,
  style,
}) => {
  const hasChildren = children !== undefined && children !== null;

  const classNames = [
    'aero-divider',
    `aero-divider--${direction}`,
    hasChildren ? `aero-divider--with-text` : '',
    hasChildren ? `aero-divider--text-${orientation}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  if (direction === 'vertical') {
    return <span className={classNames} style={style} role="separator" />;
  }

  return (
    <div className={classNames} style={style} role="separator">
      {hasChildren && (
        <span className="aero-divider-text">{children}</span>
      )}
    </div>
  );
};

export default Divider;

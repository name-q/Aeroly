import React from 'react';
import './index.less';

export interface DividerProps {
  /** Divider direction */
  direction?: 'horizontal' | 'vertical';
  /** 线条样式 */
  type?: 'solid' | 'dashed' | 'fade';
  /** Text position（仅水平Direction有效） */
  orientation?: 'left' | 'center' | 'right';
  /** Divider内嵌文字 */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
  direction = 'horizontal',
  type = 'solid',
  orientation = 'center',
  children,
  className,
  style,
}) => {
  const hasChildren = children !== undefined && children !== null;

  const classNames = [
    'aero-divider',
    `aero-divider--${direction}`,
    `aero-divider--${type}`,
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

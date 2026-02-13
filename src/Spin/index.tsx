import React, { useState, useEffect, useRef } from 'react';
import './index.less';

export interface SpinProps {
  /** 是否为加载状态 */
  spinning?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 提示文字 */
  tip?: React.ReactNode;
  /** 延迟显示（ms），防闪烁 */
  delay?: number;
  /** 自定义指示器 */
  indicator?: React.ReactNode;
  /** 包裹内容 */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Spin: React.FC<SpinProps> = ({
  spinning = true,
  size = 'medium',
  tip,
  delay,
  indicator,
  children,
  className,
  style,
}) => {
  const [show, setShow] = useState(() => (delay && delay > 0 ? false : spinning));
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (spinning) {
      if (delay && delay > 0) {
        timerRef.current = setTimeout(() => setShow(true), delay);
      } else {
        setShow(true);
      }
    } else {
      clearTimeout(timerRef.current);
      setShow(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [spinning, delay]);

  const renderIndicator = () => (
    <div className="aero-spin-indicator">
      {indicator || (
        <div className="aero-spin-dots">
          <span className="aero-spin-dot" />
          <span className="aero-spin-dot" />
          <span className="aero-spin-dot" />
        </div>
      )}
      {tip && <div className="aero-spin-tip">{tip}</div>}
    </div>
  );

  const cls = ['aero-spin', `aero-spin--${size}`, className].filter(Boolean).join(' ');

  // 容器模式
  if (children) {
    return (
      <div className={`aero-spin-container${show ? ' aero-spin-container--spinning' : ''}`} style={style}>
        <div className={show ? 'aero-spin-content aero-spin-content--blur' : 'aero-spin-content'}>
          {children}
        </div>
        {show && (
          <div className="aero-spin-mask">
            <div className={cls}>{renderIndicator()}</div>
          </div>
        )}
      </div>
    );
  }

  // 独立模式
  if (!show) return null;

  return (
    <div className={cls} style={style}>
      {renderIndicator()}
    </div>
  );
};

export default Spin;

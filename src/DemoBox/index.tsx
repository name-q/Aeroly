import React from 'react';

export interface DemoBoxProps {
  w?: number | string;
  h?: number | string;
  color?: string;
  children?: React.ReactNode;
}

const DemoBox: React.FC<DemoBoxProps> = ({
  w = 60,
  h = 40,
  color = '#50b8e7',
  children,
}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 8,
      background: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 12,
      fontWeight: 500,
      boxSizing: 'border-box',
      flexShrink: w === '100%' ? undefined : 0,
      padding: typeof w === 'string' ? '0 16px' : undefined,
    }}
  >
    {children}
  </div>
);

export default DemoBox;

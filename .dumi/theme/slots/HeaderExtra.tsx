import React, { useState, useRef, useEffect } from 'react';

const versions = [
  { label: '1.x', value: '1.x', link: '/' },
  // { label: '2.x', value: '2.x', link: '/v2/' },
];

const HeaderExtra: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = versions[0];

  return (
    <div ref={ref} style={{ position: 'relative', marginRight: 8 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 10px',
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--dumi-default-text-color, #454d64)',
          background: 'var(--dumi-default-fill-color, #f5f6f8)',
          border: '1px solid var(--dumi-default-border-color, #e8e8e8)',
          borderRadius: 6,
          cursor: 'pointer',
          lineHeight: '22px',
          transition: 'all 0.2s',
        }}
      >
        {current.label}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 4,
            padding: 4,
            minWidth: 80,
            background: 'var(--dumi-default-bg-color, #fff)',
            border: '1px solid var(--dumi-default-border-color, #e8e8e8)',
            borderRadius: 8,
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            zIndex: 100,
          }}
        >
          {versions.map((v) => (
            <a
              key={v.value}
              href={v.link}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '6px 12px',
                fontSize: 13,
                color: v.value === current.value ? 'var(--dumi-default-primary-color, #1677ff)' : 'var(--dumi-default-text-color, #454d64)',
                fontWeight: v.value === current.value ? 600 : 400,
                textDecoration: 'none',
                borderRadius: 4,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'var(--dumi-default-fill-color, #f5f6f8)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {v.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderExtra;

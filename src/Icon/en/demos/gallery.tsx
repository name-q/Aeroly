/**
 * inline: true
 */
import React, { useState, useMemo } from 'react';
import { Icon } from 'aeroly';
import { icons } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import '../../demos/gallery.less';

const allIcons = Object.entries(icons) as [string, LucideIcon][];

const IconGallery: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [copied, setCopied] = useState('');

  const filtered = useMemo(() => {
    if (!keyword.trim()) return allIcons;
    const lower = keyword.toLowerCase();
    return allIcons.filter(([name]) => name.toLowerCase().includes(lower));
  }, [keyword]);

  const handleCopy = (name: string) => {
    const code = `<Icon icon={${name}} />`;
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setCopied(name);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <div className="aero-icon-gallery">
      <input
        type="text"
        className="aero-icon-gallery-search"
        placeholder="Search icons..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="aero-icon-gallery-count">
        {filtered.length} icons{keyword ? ` (search: "${keyword}")` : ''}
      </div>
      <div className="aero-icon-gallery-grid">
        {filtered.map(([name, IconComp]) => (
          <div
            key={name}
            className={`aero-icon-gallery-item${copied === name ? ' aero-icon-gallery-item--copied' : ''}`}
            onClick={() => handleCopy(name)}
            title={`Click to copy <Icon icon={${name}} />`}
          >
            <span className="aero-icon-gallery-item-icon">
              <Icon icon={IconComp} size={24} color="currentColor" />
            </span>
            <span className="aero-icon-gallery-item-name">
              {copied === name ? 'Copied' : name}
            </span>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="aero-icon-gallery-empty">No matching icons found</div>
      )}
    </div>
  );
};

export default IconGallery;

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Inbox,
  Search,
  FileX2,
  ShieldX,
  WifiOff,
  PackageOpen,
} from 'lucide-react';
import Icon from '../Icon';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

/** Built-in scene presets */
export type EmptyPreset =
  | 'default'
  | 'search'
  | 'noData'
  | 'noPermission'
  | 'networkError'
  | 'noContent';

export interface EmptyProps {
  /** Built-in scene presets, auto-match icon and text */
  preset?: EmptyPreset;
  /** Custom icon */
  icon?: LucideIcon | React.ReactNode | null;
  /** Icon size */
  iconSize?: number;
  /** Main text */
  title?: React.ReactNode;
  /** Description text */
  description?: React.ReactNode;
  /** Action area (buttons, etc.) */
  extra?: React.ReactNode;
  /** Fully custom image area (overrides icon) */
  image?: React.ReactNode;
  /** Image area size */
  imageSize?: number;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Children (placed at bottom) */
  children?: React.ReactNode;
}

interface PresetConfig {
  icon: LucideIcon;
}

const presetIconMap: Record<EmptyPreset, LucideIcon> = {
  default: Inbox,
  search: Search,
  noData: PackageOpen,
  noPermission: ShieldX,
  networkError: WifiOff,
  noContent: FileX2,
};

const Empty: React.FC<EmptyProps> = ({
  preset = 'default',
  icon,
  iconSize = 48,
  title,
  description,
  extra,
  image,
  imageSize = 120,
  className,
  style,
  children,
}) => {
  const localeEmpty = useLocale('Empty');
  const presetLocale = localeEmpty[preset];
  const presetIcon = presetIconMap[preset];

  // Final display text
  const finalTitle = title ?? presetLocale.title;
  const finalDesc = description ?? presetLocale.description;

  // Image / icon area
  const renderVisual = () => {
    if (image) {
      return (
        <div
          className="aero-empty__image"
          style={{ width: imageSize, height: imageSize }}
        >
          {image}
        </div>
      );
    }

    if (icon === null) return null;

    // Already a JSX element (e.g. <MyIcon />)
    if (React.isValidElement(icon)) {
      return <div className="aero-empty__icon">{icon}</div>;
    }

    // LucideIcon / forwardRef component / regular component
    if (icon) {
      return (
        <div className="aero-empty__icon">
          <Icon icon={icon as LucideIcon} size={iconSize} />
        </div>
      );
    }

    // preset Default
    return (
      <div className="aero-empty__icon">
        <Icon icon={presetIcon} size={iconSize} />
      </div>
    );
  };

  const cls = ['aero-empty', className || ''].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      {renderVisual()}
      {finalTitle && <div className="aero-empty__title">{finalTitle}</div>}
      {finalDesc && (
        <div className="aero-empty__description">{finalDesc}</div>
      )}
      {extra && <div className="aero-empty__extra">{extra}</div>}
      {children}
    </div>
  );
};

export default Empty;

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
import './index.less';

/** 内置场景预设 */
export type EmptyPreset =
  | 'default'
  | 'search'
  | 'noData'
  | 'noPermission'
  | 'networkError'
  | 'noContent';

export interface EmptyProps {
  /** 内置场景预设，自动匹配图标和文案 */
  preset?: EmptyPreset;
  /** 自定义图标 */
  icon?: LucideIcon | React.ReactNode | null;
  /** 图标大小 */
  iconSize?: number;
  /** 主文案 */
  title?: React.ReactNode;
  /** 描述文案 */
  description?: React.ReactNode;
  /** 操作区（按钮等） */
  extra?: React.ReactNode;
  /** 完全自定义图片区域（覆盖 icon） */
  image?: React.ReactNode;
  /** 图片区域尺寸 */
  imageSize?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素（放在最底部） */
  children?: React.ReactNode;
}

interface PresetConfig {
  icon: LucideIcon;
  title: string;
  description: string;
}

const presetMap: Record<EmptyPreset, PresetConfig> = {
  default: {
    icon: Inbox,
    title: '暂无数据',
    description: '当前没有可显示的内容',
  },
  search: {
    icon: Search,
    title: '未找到结果',
    description: '试试调整搜索条件或关键词',
  },
  noData: {
    icon: PackageOpen,
    title: '暂无数据',
    description: '数据为空，请稍后再试',
  },
  noPermission: {
    icon: ShieldX,
    title: '无访问权限',
    description: '你没有权限查看此内容',
  },
  networkError: {
    icon: WifiOff,
    title: '网络异常',
    description: '请检查网络连接后重试',
  },
  noContent: {
    icon: FileX2,
    title: '暂无内容',
    description: '还没有创建任何内容',
  },
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
  const config = presetMap[preset];

  // 最终显示的文案
  const finalTitle = title ?? config.title;
  const finalDesc = description ?? config.description;

  // 图片/图标区域
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

    // 已经是 JSX 元素（如 <MyIcon />）
    if (React.isValidElement(icon)) {
      return <div className="aero-empty__icon">{icon}</div>;
    }

    // LucideIcon / forwardRef 组件 / 普通组件
    if (icon) {
      return (
        <div className="aero-empty__icon">
          <Icon icon={icon as LucideIcon} size={iconSize} />
        </div>
      );
    }

    // preset 默认
    return (
      <div className="aero-empty__icon">
        <Icon icon={config.icon} size={iconSize} />
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

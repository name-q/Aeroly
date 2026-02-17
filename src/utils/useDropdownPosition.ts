import { useEffect, useState, RefObject } from 'react';

export type Placement = 'top' | 'bottom';
export type Alignment = 'left' | 'right';

interface DropdownPosition {
  placement: Placement;
  alignment: Alignment;
}

const GAP = 6; // Gap between dropdown and trigger

/**
 * 自动检测 dropdown 应该向上/向下弹出、左/右对齐
 * @param triggerRef  触发器（Input框）的 ref
 * @param dropdownRef 弹出Panel的 ref
 * @param open        CurrentWhether展开
 */
export function useDropdownPosition(
  triggerRef: RefObject<HTMLElement | null>,
  dropdownRef: RefObject<HTMLElement | null>,
  open: boolean,
): DropdownPosition {
  const [pos, setPos] = useState<DropdownPosition>({ placement: 'bottom', alignment: 'left' });

  useEffect(() => {
    if (!open) return;

    // 等 dropdown 挂载后再测量
    const frame = requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;
      if (!trigger || !dropdown) return;

      const triggerRect = trigger.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;

      // 垂直Direction：下方空间不够 && 上方空间够 → 向上弹出
      const spaceBelow = innerHeight - triggerRect.bottom - GAP;
      const spaceAbove = triggerRect.top - GAP;
      const placement: Placement =
        spaceBelow < dropdownRect.height && spaceAbove > spaceBelow
          ? 'top'
          : 'bottom';

      // 水平Direction：右侧溢出 → 右对齐
      const overflowRight = triggerRect.left + dropdownRect.width - innerWidth;
      const alignment: Alignment = overflowRight > 0 ? 'right' : 'left';

      setPos({ placement, alignment });
    });

    return () => cancelAnimationFrame(frame);
  }, [open, triggerRef, dropdownRef]);

  return pos;
}

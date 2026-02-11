import React, { useRef, useEffect, useCallback, useState } from 'react';
import { pad } from './utils';

export const ITEM_HEIGHT = 32;
export const VISIBLE_COUNT = 7;
const REPEAT_COUNT = 100;
const SIDE_VISIBLE_COUNT = Math.floor(283 / ITEM_HEIGHT); // 侧边布局可见数
const CENTER_OFFSET = Math.floor(SIDE_VISIBLE_COUNT / 2) * ITEM_HEIGHT;
const BUFFER = 10;

export interface ColumnProps {
  items: number[];
  selected: number;
  onSelect: (val: number) => void;
  classPrefix?: string;
}

const Column: React.FC<ColumnProps> = ({ items, selected, onSelect, classPrefix = 'aero-date-picker' }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const snapTimer = useRef<number>(0);
  const programmatic = useRef(false);
  const count = items.length;
  const midBase = Math.floor(REPEAT_COUNT / 2) * count;
  const prevSelected = useRef(selected);
  const mountedRef = useRef(false);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = count * REPEAT_COUNT * ITEM_HEIGHT;

  const scrollTo = useCallback((top: number, smooth: boolean) => {
    const el = listRef.current;
    if (!el) return;
    programmatic.current = true;
    el.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      programmatic.current = false;
    }, smooth ? 300 : 50);
  }, []);

  const getTopForValue = useCallback((val: number, nearCurrentScroll = false) => {
    const idx = items.indexOf(val);
    if (idx < 0) return 0;
    if (!nearCurrentScroll) {
      return (midBase + idx) * ITEM_HEIGHT - CENTER_OFFSET;
    }
    const el = listRef.current;
    const currentTop = el ? el.scrollTop : 0;
    const currentCenter = Math.round((currentTop + CENTER_OFFSET) / ITEM_HEIGHT);
    const groupIdx = Math.round((currentCenter - idx) / count);
    const nearestGlobal = groupIdx * count + idx;
    return nearestGlobal * ITEM_HEIGHT - CENTER_OFFSET;
  }, [items, midBase, count]);

  useEffect(() => {
    mountedRef.current = true;
    const top = getTopForValue(selected);
    setScrollTop(top);
    scrollTo(top, false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mountedRef.current) return;
    if (selected !== prevSelected.current) {
      prevSelected.current = selected;
      scrollTo(getTopForValue(selected, true), true);
    }
  }, [selected, scrollTo, getTopForValue]);

  const handleScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;

    setScrollTop(el.scrollTop);

    if (programmatic.current) return;

    clearTimeout(snapTimer.current);
    snapTimer.current = window.setTimeout(() => {
      if (!el) return;

      const centerScroll = el.scrollTop + CENTER_OFFSET;
      const rawIdx = Math.round(centerScroll / ITEM_HEIGHT);
      const itemIdx = ((rawIdx % count) + count) % count;
      const val = items[itemIdx];

      const snapTop = rawIdx * ITEM_HEIGHT - CENTER_OFFSET;
      scrollTo(snapTop, true);

      if (val !== prevSelected.current) {
        prevSelected.current = val;
        onSelect(val);
      }
    }, 100);
  }, [count, items, onSelect, scrollTo]);

  const handleClick = useCallback(
    (val: number) => {
      prevSelected.current = val;
      onSelect(val);
      scrollTo(getTopForValue(val, true), true);
    },
    [onSelect, scrollTo, getTopForValue],
  );

  const viewportHeight = VISIBLE_COUNT * ITEM_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIdx = Math.min(
    count * REPEAT_COUNT,
    Math.ceil((scrollTop + viewportHeight) / ITEM_HEIGHT) + BUFFER,
  );

  const cells: React.ReactNode[] = [];
  for (let globalIdx = startIdx; globalIdx < endIdx; globalIdx++) {
    const itemIdx = ((globalIdx % count) + count) % count;
    const val = items[itemIdx];
    cells.push(
      <div
        key={globalIdx}
        className={`${classPrefix}-time-cell${val === selected ? ` ${classPrefix}-time-cell--active` : ''}`}
        style={{
          position: 'absolute',
          top: globalIdx * ITEM_HEIGHT,
          left: 0,
          right: 0,
          height: ITEM_HEIGHT,
        }}
        onClick={() => handleClick(val)}
      >
        {pad(val)}
      </div>,
    );
  }

  return (
    <div
      className={`${classPrefix}-time-column`}
      ref={listRef}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {cells}
      </div>
    </div>
  );
};

export default Column;

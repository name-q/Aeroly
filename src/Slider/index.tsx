import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { throttle } from '../utils';
import './index.less';

// ---- Types ----

export interface SliderMarks {
  [key: number]: React.ReactNode;
}

export interface SliderProps {
  /** Current value (controlled) */
  value?: number | [number, number];
  /** Default value（uncontrolled) */
  defaultValue?: number | [number, number];
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step, set to null to only select mark values */
  step?: number | null;
  /** Marks */
  marks?: SliderMarks;
  /** Whether disabled (grayed out + no interaction) */
  disabled?: boolean;
  /** Whether readonly (normal style but no interaction, value can only be changed externally) */
  readOnly?: boolean;
  /** Whether range selection */
  range?: boolean;
  /** Whether vertical */
  vertical?: boolean;
  /** Whether to always show tooltip */
  tooltipVisible?: boolean;
  /** Custom tooltip formatter */
  tipFormatter?: ((value: number) => React.ReactNode) | null;
  /** Whether to enable track shimmer animation */
  animated?: boolean;
  /** Change callback */
  onChange?: (value: number | [number, number]) => void;
  /** Drag end callback */
  onChangeComplete?: (value: number | [number, number]) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- Utilities ----

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, min: number, max: number, step: number | null, marks?: SliderMarks): number {
  if (step === null && marks) {
    const markValues = Object.keys(marks).map(Number);
    let closest = markValues[0] ?? min;
    let minDist = Math.abs(val - closest);
    for (const mv of markValues) {
      const dist = Math.abs(val - mv);
      if (dist < minDist) { minDist = dist; closest = mv; }
    }
    return closest;
  }
  const s = step ?? 1;
  const stepped = Math.round((val - min) / s) * s + min;
  return clamp(Number(stepped.toFixed(10)), min, max);
}

function percentOf(val: number, min: number, max: number) {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

function toOutput(val: [number, number], isRange: boolean): number | [number, number] {
  return isRange ? val : val[1];
}

// ---- Slider ----

const Slider: React.FC<SliderProps> = ({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  marks,
  disabled = false,
  readOnly = false,
  range = false,
  vertical = false,
  tooltipVisible,
  tipFormatter = (v) => v,
  animated = true,
  onChange,
  onChangeComplete,
  className,
  style,
}) => {
  const isControlled = value !== undefined;
  const inactive = disabled || readOnly;
  const getDefault = (): [number, number] => {
    if (defaultValue !== undefined) {
      return Array.isArray(defaultValue) ? defaultValue : [min, defaultValue];
    }
    return range ? [min, min + (max - min) / 3] : [min, min];
  };
  const [internalValue, setInternalValue] = useState<[number, number]>(getDefault);
  const [dragValue, setDragValue] = useState<[number, number] | null>(null);

  const controlledValue: [number, number] = isControlled
    ? Array.isArray(value) ? value : [min, value!]
    : internalValue;

  const display = dragValue ?? controlledValue;

  const railRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<null | 0 | 1>(null);
  const [hovering, setHovering] = useState<null | 0 | 1>(null);

  // Store all mutable state in ref, read from ref in drag events to avoid stale closures
  const stateRef = useRef({
    dragging: null as null | 0 | 1,
    display,
    isControlled,
    range,
    onChange: onChange as SliderProps['onChange'],
    onChangeComplete: onChangeComplete as SliderProps['onChangeComplete'],
  });
  stateRef.current.display = display;
  stateRef.current.isControlled = isControlled;
  stateRef.current.range = range;
  stateRef.current.onChange = onChange;
  stateRef.current.onChangeComplete = onChangeComplete;

  const throttledOnChange = useMemo(
    () => throttle((val: [number, number]) => {
      const { onChange: cb, range: r } = stateRef.current;
      cb?.(toOutput(val, r));
    }, 16),
    [],
  );

  const getValueFromPosition = useCallback(
    (clientX: number, clientY: number): number => {
      const rail = railRef.current;
      if (!rail) return min;
      const rect = rail.getBoundingClientRect();
      let ratio: number;
      if (vertical) {
        ratio = 1 - (clientY - rect.top) / rect.height;
      } else {
        ratio = (clientX - rect.left) / rect.width;
      }
      ratio = clamp(ratio, 0, 1);
      const raw = min + ratio * (max - min);
      return snapToStep(raw, min, max, step, marks);
    },
    [min, max, step, marks, vertical],
  );

  // Drag events: all read from stateRef, function references never change
  const onPointerMove = useCallback((e: PointerEvent) => {
    const { dragging: idx, display: prev, range: r } = stateRef.current;
    if (idx === null) return;
    const val = getValueFromPosition(e.clientX, e.clientY);
    const next: [number, number] = [...prev];
    next[idx] = val;
    if (r && next[0] > next[1]) {
      if (idx === 0) next[0] = next[1]; else next[1] = next[0];
    }
    if (!stateRef.current.isControlled) setInternalValue(next);
    setDragValue(next);
    throttledOnChange(next);
  }, [getValueFromPosition, throttledOnChange]);

  const onPointerUp = useCallback(() => {
    setDragging(null);
    stateRef.current.dragging = null;
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp);
    const { display: final, range: r, isControlled: ctrl, onChange: cb, onChangeComplete: cbComplete } = stateRef.current;
    if (!ctrl) setInternalValue(final);
    cb?.(toOutput(final, r));
    cbComplete?.(toOutput(final, r));
    setDragValue(null);
  }, [onPointerMove]);

  const startDrag = useCallback((idx: 0 | 1, e: React.PointerEvent) => {
    if (inactive) return;
    e.preventDefault();
    setDragging(idx);
    stateRef.current.dragging = idx;
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }, [inactive, onPointerMove, onPointerUp]);

  const handleRailClick = (e: React.MouseEvent) => {
    if (inactive) return;
    const val = getValueFromPosition(e.clientX, e.clientY);
    // Find closer handle
    let idx: 0 | 1 = 1;
    if (range) {
      const d0 = Math.abs(val - display[0]);
      const d1 = Math.abs(val - display[1]);
      idx = d0 < d1 ? 0 : d1 < d0 ? 1 : val <= display[0] ? 0 : 1;
    }
    const next: [number, number] = [...display];
    next[idx] = val;
    if (range && next[0] > next[1]) {
      if (idx === 0) next[0] = next[1]; else next[1] = next[0];
    }
    if (!isControlled) setInternalValue(next);
    onChange?.(toOutput(next, range));
    onChangeComplete?.(toOutput(next, range));
  };

  const handleKeyDown = (idx: 0 | 1) => (e: React.KeyboardEvent) => {
    if (inactive) return;
    const s = step ?? 1;
    let delta = 0;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = s;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -s;
    if (!delta) return;
    e.preventDefault();
    const next: [number, number] = [...display];
    next[idx] = clamp(next[idx] + delta, min, max);
    if (range && next[0] > next[1]) return;
    if (!isControlled) setInternalValue(next);
    onChange?.(toOutput(next, range));
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  // ---- Render ----
  const p0 = percentOf(display[0], min, max);
  const p1 = percentOf(display[1], min, max);
  const showTooltip = tipFormatter !== null;

  const trackStyle: React.CSSProperties = vertical
    ? { bottom: `${range ? p0 : 0}%`, height: `${range ? p1 - p0 : p1}%` }
    : { left: `${range ? p0 : 0}%`, width: `${range ? p1 - p0 : p1}%` };

  const renderHandle = (idx: 0 | 1, percent: number) => {
    const pos: React.CSSProperties = vertical
      ? { bottom: `${percent}%` }
      : { left: `${percent}%` };
    const isActive = dragging === idx || hovering === idx;
    const alwaysShow = tooltipVisible === true;
    const neverShow = tooltipVisible === false;

    return (
      <div
        key={idx}
        className={['aero-slider-handle', isActive ? 'aero-slider-handle--active' : ''].filter(Boolean).join(' ')}
        style={pos}
        role="slider"
        tabIndex={inactive ? undefined : 0}
        aria-valuenow={display[idx]}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-disabled={disabled}
        aria-readonly={readOnly}
        onPointerDown={(e) => startDrag(idx, e)}
        onMouseEnter={() => setHovering(idx)}
        onMouseLeave={() => setHovering(null)}
        onKeyDown={handleKeyDown(idx)}
      >
        {showTooltip && !neverShow && (alwaysShow || isActive) && (
          <div className="aero-slider-tooltip">{tipFormatter!(display[idx])}</div>
        )}
      </div>
    );
  };

  const cls = [
    'aero-slider',
    vertical ? 'aero-slider--vertical' : '',
    disabled ? 'aero-slider--disabled' : '',
    readOnly ? 'aero-slider--readonly' : '',
    dragging !== null ? 'aero-slider--dragging' : '',
    animated ? '' : 'aero-slider--no-animate',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} style={style}>
      <div className="aero-slider-rail" ref={railRef} onClick={handleRailClick}>
        <div className="aero-slider-track" style={trackStyle} />
        {marks && Object.entries(marks).map(([key, label]) => {
          const val = Number(key);
          const pct = percentOf(val, min, max);
          const active = range ? val >= display[0] && val <= display[1] : val <= display[1];
          const dotPos: React.CSSProperties = vertical ? { bottom: `${pct}%` } : { left: `${pct}%` };
          return (
            <React.Fragment key={key}>
              <span className={['aero-slider-dot', active ? 'aero-slider-dot--active' : ''].filter(Boolean).join(' ')} style={dotPos} />
              <span className={['aero-slider-mark', active ? 'aero-slider-mark--active' : ''].filter(Boolean).join(' ')} style={dotPos}>{label}</span>
            </React.Fragment>
          );
        })}
      </div>
      {range && renderHandle(0, p0)}
      {renderHandle(1, p1)}
    </div>
  );
};

export default Slider;

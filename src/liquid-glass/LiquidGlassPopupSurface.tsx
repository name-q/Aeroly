import React from 'react';
import type { UseLiquidGlassResult } from './useLiquidGlass';

interface LiquidGlassPopupSurfaceProps {
  glass: UseLiquidGlassResult;
  children: React.ReactNode;
}

export function LiquidGlassPopupSurface({ glass, children }: LiquidGlassPopupSurfaceProps) {
  return (
    <div
      ref={glass.refs.surfaceRef}
      className={`aero-lg-popup-surface aero-lg-surface aero-lg-panel${glass.isFull ? ' aero-lg-surface--full' : ''}`}
      style={glass.vars}
      {...glass.surfaceProps}
    >
      {glass.isFull && <div ref={glass.refs.warpRef} className="aero-lg-warp" />}
      <div className="aero-lg-content">{children}</div>
    </div>
  );
}

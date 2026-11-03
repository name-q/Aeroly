import React from 'react';
import './index.less';

export type FlexOrientation = 'horizontal' | 'vertical';

export type FlexGapSize = 'small' | 'medium' | 'large';

export interface FlexProps extends Omit<React.HTMLAttributes<HTMLElement>, 'wrap'> {
  /** Whether the main axis is vertical (`flex-direction: column`) */
  vertical?: boolean;
  /** Main axis orientation, takes precedence over `vertical` */
  orientation?: FlexOrientation;
  /** Wrapping behavior; `true` equals `'wrap'` */
  wrap?: boolean | React.CSSProperties['flexWrap'];
  /** Main axis alignment (`justify-content`) */
  justify?: React.CSSProperties['justifyContent'];
  /** Cross axis alignment (`align-items`) */
  align?: React.CSSProperties['alignItems'];
  /** `flex` CSS shorthand */
  flex?: React.CSSProperties['flex'];
  /** Gap between items */
  gap?: FlexGapSize | React.CSSProperties['gap'];
  /** Custom element type */
  component?: React.ElementType;
}

const presetGaps: FlexGapSize[] = ['small', 'medium', 'large'];

const Flex = React.forwardRef<HTMLElement, FlexProps>(
  (
    {
      vertical,
      orientation,
      wrap,
      justify,
      align,
      flex,
      gap,
      component: Component = 'div',
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const isVertical = orientation ? orientation === 'vertical' : !!vertical;
    const isPresetGap = presetGaps.includes(gap as FlexGapSize);
    const mergedWrap = wrap === true ? 'wrap' : wrap || undefined;

    const cls = [
      'aero-flex',
      isVertical ? 'aero-flex-vertical' : '',
      isPresetGap ? `aero-flex-gap-${gap}` : '',
      className || '',
    ]
      .filter(Boolean)
      .join(' ');

    const s: React.CSSProperties = {};
    if (mergedWrap) s.flexWrap = mergedWrap;
    if (justify) s.justifyContent = justify;
    if (align) s.alignItems = align;
    else if (isVertical) s.alignItems = 'stretch';
    if (flex !== undefined && flex !== null) s.flex = flex;
    if (gap !== undefined && gap !== null && !isPresetGap) s.gap = gap;

    return (
      <Component ref={ref} className={cls} style={{ ...s, ...style }} {...rest}>
        {children}
      </Component>
    );
  },
);

Flex.displayName = 'Flex';

export default Flex;

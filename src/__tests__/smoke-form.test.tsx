import { describe, it, expect } from 'vitest';
import React from 'react';
import { render } from '@testing-library/react';
import {
  Checkbox,
  Radio,
  Switch,
  Input,
  TextArea,
  InputNumber,
  Select,
  TreeSelect,
  Cascader,
  ColorPicker,
  DatePicker,
  TimePicker,
  DateRangePicker,
  AutoComplete,
  Rate,
  Slider,
  Upload,
} from '../index';

describe('Smoke Tests — Form Controls', () => {
  it('Checkbox', () => {
    const { container } = render(<Checkbox>Check</Checkbox>);
    expect(container.querySelector('.aero-checkbox')).toBeTruthy();
  });

  it('Checkbox.Group', () => {
    const { container } = render(
      <Checkbox.Group options={[{ label: 'A', value: 'a' }]} />,
    );
    expect(container).toBeTruthy();
  });

  it('Radio', () => {
    const { container } = render(<Radio>Radio</Radio>);
    expect(container.querySelector('.aero-radio')).toBeTruthy();
  });

  it('Radio.Group', () => {
    const { container } = render(
      <Radio.Group options={[{ label: 'A', value: 'a' }]} />,
    );
    expect(container).toBeTruthy();
  });

  it('Switch', () => {
    const { container } = render(<Switch />);
    expect(container.querySelector('.aero-switch')).toBeTruthy();
  });

  it('Input', () => {
    const { container } = render(<Input placeholder="test" />);
    expect(container.querySelector('.aero-input')).toBeTruthy();
  });

  it('TextArea', () => {
    const { container } = render(<TextArea placeholder="test" />);
    expect(container.querySelector('.aero-textarea')).toBeTruthy();
  });

  it('InputNumber', () => {
    const { container } = render(<InputNumber />);
    expect(container.querySelector('.aero-input-number')).toBeTruthy();
  });

  it('Select', () => {
    const { container } = render(
      <Select options={[{ label: 'A', value: 'a' }]} />,
    );
    expect(container.querySelector('.aero-select')).toBeTruthy();
  });

  it('TreeSelect', () => {
    const { container } = render(
      <TreeSelect treeData={[{ key: '1', title: 'Node', value: '1' }]} />,
    );
    expect(container.querySelector('.aero-tree-select')).toBeTruthy();
  });

  it('Cascader', () => {
    const { container } = render(
      <Cascader options={[{ label: 'A', value: 'a' }]} />,
    );
    expect(container.querySelector('.aero-cascader')).toBeTruthy();
  });

  it('ColorPicker', () => {
    const { container } = render(<ColorPicker />);
    expect(container.querySelector('.aero-colorpicker')).toBeTruthy();
  });

  it('DatePicker', () => {
    const { container } = render(<DatePicker />);
    expect(container.querySelector('.aero-date-picker')).toBeTruthy();
  });

  it('TimePicker', () => {
    const { container } = render(<TimePicker />);
    expect(container.querySelector('.aero-time-picker')).toBeTruthy();
  });

  it('DateRangePicker', () => {
    const { container } = render(<DateRangePicker />);
    expect(container.querySelector('.aero-date-range-picker')).toBeTruthy();
  });

  it('AutoComplete', () => {
    const { container } = render(<AutoComplete />);
    expect(container.querySelector('.aero-autocomplete')).toBeTruthy();
  });

  it('Rate', () => {
    const { container } = render(<Rate />);
    expect(container.querySelector('.aero-rate')).toBeTruthy();
  });

  it('Slider', () => {
    const { container } = render(<Slider />);
    expect(container.querySelector('.aero-slider')).toBeTruthy();
  });

  it('Upload', () => {
    const { container } = render(<Upload />);
    expect(container.querySelector('.aero-upload')).toBeTruthy();
  });
});

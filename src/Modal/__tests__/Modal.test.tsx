import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Button from '../../Button';
import Modal from '../index';

describe('Modal liquid glass layering', () => {
  it('renders one mask for a stack and does not portal decor spans to body', () => {
    render(
      <>
        <Modal open mask onOpenChange={vi.fn()} title="First">
          First
        </Modal>
        <Modal open mask onOpenChange={vi.fn()} title="Second">
          Second
        </Modal>
      </>,
    );

    const roots = document.body.querySelectorAll('.aero-modal-root');
    expect(roots).toHaveLength(2);
    expect(document.body.querySelectorAll('.aero-modal-mask')).toHaveLength(1);
    expect(document.body.querySelectorAll('.aero-lg-edge')).toHaveLength(0);
    expect(document.body.querySelectorAll('.aero-lg-sheen')).toHaveLength(0);
    expect(roots[1].getAttribute('style')).toContain('z-index: 1001');
  });

  it('keeps default buttons free of body-level glass decoration nodes', () => {
    render(<Button>Default</Button>);

    expect(screen.getByRole('button', { name: 'Default' })).toBeTruthy();
    expect(document.querySelector('.aero-button-glass')?.getAttribute('style') || '').not.toContain('aero-lg-filter');
    expect(document.body.querySelector('svg[aria-hidden="true"]')).toBeNull();
    expect(document.body.querySelectorAll('.aero-lg-edge')).toHaveLength(0);
    expect(document.body.querySelectorAll('.aero-lg-sheen')).toHaveLength(0);
  });

  it('closes only the top modal on Escape', () => {
    const firstOnOpenChange = vi.fn();
    const secondOnOpenChange = vi.fn();

    render(
      <>
        <Modal open onOpenChange={firstOnOpenChange} title="First" />
        <Modal open onOpenChange={secondOnOpenChange} title="Second" />
      </>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(firstOnOpenChange).not.toHaveBeenCalled();
    expect(secondOnOpenChange).toHaveBeenCalledWith(false);
  });
});

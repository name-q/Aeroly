import { attachLiquidGlassFilter } from './filter';
import { getLiquidGlassSupport } from './support';

const managed = new WeakMap<HTMLElement, () => void>();
let started = false;
let sequence = 0;

function isGlassNode(node: Element): node is HTMLElement {
  if (!(node instanceof HTMLElement)) return false;
  if (node.classList.contains('aero-lg-surface') || node.classList.contains('aero-lg-warp')) return false;
  if (node.classList.contains('aero-lg-filter-defs')) return false;
  const styles = getComputedStyle(node);
  const webkitBackdropFilter = (styles as CSSStyleDeclaration & { webkitBackdropFilter?: string }).webkitBackdropFilter;
  return Boolean((styles.backdropFilter && styles.backdropFilter !== 'none') || (webkitBackdropFilter && webkitBackdropFilter !== 'none'));
}

function enhance(node: HTMLElement): void {
  if (!node.isConnected || managed.has(node) || !isGlassNode(node)) return;
  const rect = node.getBoundingClientRect();
  if (!rect.width && !rect.height) return;

  const id = `aero-lg-auto-${++sequence}`;
  managed.set(node, attachLiquidGlassFilter(node, node, id, 36));
}

function refresh(node: HTMLElement): void {
  if (!node.isConnected) {
    managed.get(node)?.();
    managed.delete(node);
    return;
  }
  const cleanup = managed.get(node);
  if (!isGlassNode(node)) {
    cleanup?.();
    managed.delete(node);
    return;
  }
  if (!cleanup) enhance(node);
}

function scan(root: ParentNode): void {
  if (root instanceof HTMLElement) enhance(root);
  root.querySelectorAll<HTMLElement>('*').forEach(enhance);
}

function release(root: Node): void {
  if (root instanceof HTMLElement) {
    managed.get(root)?.();
    managed.delete(root);
  }
  if (root instanceof Element || root instanceof DocumentFragment) {
    root.querySelectorAll('*').forEach((node) => {
      if (node instanceof HTMLElement) {
        managed.get(node)?.();
        managed.delete(node);
      }
    });
  }
}

export function ensureLiquidGlassAuto(): void {
  if (started || typeof document === 'undefined' || !getLiquidGlassSupport().displacement) return;
  started = true;

  const start = () => {
    if (!document.body) return;
    scan(document.body);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        record.removedNodes.forEach(release);
        record.addedNodes.forEach((node) => {
          if (node instanceof Element || node instanceof DocumentFragment) scan(node);
        });
        if (record.type === 'attributes' && record.target instanceof HTMLElement) {
          refresh(record.target);
          record.target.querySelectorAll<HTMLElement>('*').forEach(refresh);
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style'] });
  };

  if (document.body) start();
  else document.addEventListener('DOMContentLoaded', start, { once: true });
}

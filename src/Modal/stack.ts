import { useEffect, useRef, useState } from 'react';

const MODAL_BASE_Z_INDEX = 1000;

interface ModalLayer {
  id: symbol;
  zIndex: number;
}

const layers: ModalLayer[] = [];
const listeners = new Set<() => void>();
let nextZIndex = MODAL_BASE_Z_INDEX;

function notify() {
  listeners.forEach((listener) => listener());
}

export function useModalLayer(active: boolean) {
  const [, forceUpdate] = useState(0);
  const layerRef = useRef<ModalLayer | null>(null);

  useEffect(() => {
    if (!active) return undefined;

    const layer: ModalLayer = {
      id: Symbol('aero-modal-layer'),
      zIndex: nextZIndex++,
    };
    layerRef.current = layer;
    layers.push(layer);

    const listener = () => forceUpdate((value) => value + 1);
    listeners.add(listener);
    forceUpdate((value) => value + 1);

    return () => {
      listeners.delete(listener);
      const index = layers.findIndex((item) => item.id === layer.id);
      if (index >= 0) layers.splice(index, 1);
      layerRef.current = null;
      notify();
    };
  }, [active]);

  const layer = layerRef.current;
  return {
    zIndex: layer?.zIndex ?? MODAL_BASE_Z_INDEX,
    isTop: Boolean(layer && layers[layers.length - 1]?.id === layer.id),
  };
}

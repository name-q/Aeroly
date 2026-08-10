import { getDisplacementEdgeMap, getDisplacementMap } from './displacement';

const SVG_NS = 'http://www.w3.org/2000/svg';

function decodeImage(source: string): Promise<void> {
  const image = new Image();
  image.src = source;
  if (typeof image.decode === 'function') {
    return image.decode().catch(() => undefined);
  }
  return new Promise((resolve) => {
    image.onload = () => resolve();
    image.onerror = () => resolve();
  });
}

function filterMarkup(
  id: string,
  width: number,
  height: number,
  scale: number,
  map: string,
  edgeMap: string,
  aberrationIntensity: number,
  edgeOnly: boolean,
): string {
  const aberration = Math.max(0, Math.min(3, aberrationIntensity));
  const channelDisplacement = aberration > 0
    ? `
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale}" xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED"/>
      <feColorMatrix in="RED_DISPLACED" type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="RED_CHANNEL"/>
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale * (1 - aberration * 0.05)}" xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED"/>
      <feColorMatrix in="GREEN_DISPLACED" type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="GREEN_CHANNEL"/>
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale * (1 - aberration * 0.1)}" xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED"/>
      <feColorMatrix in="BLUE_DISPLACED" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
        result="BLUE_CHANNEL"/>
      <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED"/>
      <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="ABERRATED"/>
      <feGaussianBlur in="ABERRATED" stdDeviation="0.2" result="EDGE_SOURCE"/>`
    : `
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale}"
        xChannelSelector="R" yChannelSelector="B" result="EDGE_SOURCE"/>`;

  const output = edgeOnly
    ? '<feComposite in="EDGE_SOURCE" in2="EDGE_ALPHA" operator="in"/>'
    : `
      <feComposite in="EDGE_SOURCE" in2="EDGE_ALPHA" operator="in" result="EDGE_GLASS"/>
      <feComponentTransfer in="EDGE_ALPHA" result="CENTER_MASK">
        <feFuncA type="table" tableValues="1 0"/>
      </feComponentTransfer>
      <feComposite in="SourceGraphic" in2="CENTER_MASK" operator="in" result="CENTER_GLASS"/>
      <feComposite in="EDGE_GLASS" in2="CENTER_GLASS" operator="over"/>`;

  return `
    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
      <feImage x="0" y="0" width="${width}" height="${height}" href="${map}" preserveAspectRatio="none" result="DISPLACEMENT_MAP"/>
      <feImage x="0" y="0" width="${width}" height="${height}" href="${edgeMap}" preserveAspectRatio="none" result="EDGE_MAP"/>
      <feColorMatrix in="EDGE_MAP" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="EDGE_ALPHA"/>
      ${channelDisplacement}
      ${output}
    </filter>`;
}

export function attachLiquidGlassFilter(
  surface: HTMLElement,
  warp: HTMLElement,
  id: string,
  scale: number,
  aberrationIntensity = 0,
  edgeOnly = false,
  onPrepared?: () => void,
): () => void {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'aero-lg-filter-defs');
  svg.setAttribute('aria-hidden', 'true');
  surface.appendChild(svg);

  const update = (): [string, string] | null => {
    const rect = surface.getBoundingClientRect();
    // 入场缩放只改变视觉尺寸，位移图始终按稳定的布局尺寸生成。
    const width = Math.max(1, Math.ceil(surface.offsetWidth || rect.width));
    const height = Math.max(1, Math.ceil(surface.offsetHeight || rect.height));
    const displacement = getDisplacementMap(width, height);
    const edge = getDisplacementEdgeMap(width, height);
    if (!displacement || !edge) return null;

    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = `<defs>${filterMarkup(id, width, height, Math.max(18, Math.min(72, scale)), displacement, edge, aberrationIntensity, edgeOnly)}</defs>`;
    return [displacement, edge];
  };

  const initialMaps = update();
  // defs 完整写入后再引用，避免首帧解析到空滤镜。
  warp.style.filter = `url(#${id})`;
  let disposed = false;
  if (onPrepared) {
    const notifyPrepared = () => {
      if (!disposed) onPrepared();
    };
    if (initialMaps) {
      Promise.all(initialMaps.map(decodeImage)).then(notifyPrepared);
    } else {
      Promise.resolve().then(notifyPrepared);
    }
  }
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
  observer?.observe(surface);
  window.addEventListener('resize', update);

  return () => {
    disposed = true;
    observer?.disconnect();
    window.removeEventListener('resize', update);
    warp.style.filter = '';
    svg.remove();
  };
}

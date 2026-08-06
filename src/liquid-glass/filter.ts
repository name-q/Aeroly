import { getDisplacementEdgeMap, getDisplacementMap } from './displacement';

const SVG_NS = 'http://www.w3.org/2000/svg';

function filterMarkup(id: string, width: number, height: number, scale: number, map: string, edgeMap: string): string {
  return `
    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
      <feImage x="0" y="0" width="${width}" height="${height}" href="${map}" preserveAspectRatio="none" result="DISPLACEMENT_MAP"/>
      <feImage x="0" y="0" width="${width}" height="${height}" href="${edgeMap}" preserveAspectRatio="none" result="EDGE_MAP"/>
      <feColorMatrix in="EDGE_MAP" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="EDGE_ALPHA"/>
      <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${scale}"
        xChannelSelector="R" yChannelSelector="B" result="DISPLACED"/>
      <feComposite in="DISPLACED" in2="EDGE_ALPHA" operator="in" result="EDGE_GLASS"/>
      <feComponentTransfer in="EDGE_ALPHA" result="CENTER_MASK">
        <feFuncA type="table" tableValues="1 0"/>
      </feComponentTransfer>
      <feComposite in="SourceGraphic" in2="CENTER_MASK" operator="in" result="CENTER_GLASS"/>
      <feComposite in="EDGE_GLASS" in2="CENTER_GLASS" operator="over"/>
    </filter>`;
}

export function attachLiquidGlassFilter(
  surface: HTMLElement,
  warp: HTMLElement,
  id: string,
  scale: number,
): () => void {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'aero-lg-filter-defs');
  svg.setAttribute('aria-hidden', 'true');
  surface.appendChild(svg);
  warp.style.filter = `url(#${id})`;

  const update = () => {
    const rect = surface.getBoundingClientRect();
    // 入场缩放只改变视觉尺寸，位移图始终按稳定的布局尺寸生成。
    const width = Math.max(1, Math.ceil(surface.offsetWidth || rect.width));
    const height = Math.max(1, Math.ceil(surface.offsetHeight || rect.height));
    const displacement = getDisplacementMap(width, height);
    const edge = getDisplacementEdgeMap(width, height);
    if (!displacement || !edge) return;

    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = `<defs>${filterMarkup(id, width, height, Math.max(18, Math.min(48, scale)), displacement, edge)}</defs>`;
  };

  update();
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
  observer?.observe(surface);
  window.addEventListener('resize', update);

  return () => {
    observer?.disconnect();
    window.removeEventListener('resize', update);
    warp.style.filter = '';
    svg.remove();
  };
}

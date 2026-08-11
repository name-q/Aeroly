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

function colorLuminance(value: string): number | null {
  const hex = value.match(/^#([\da-f]{3}|[\da-f]{6})$/i)?.[1];
  let channels: number[] | null = null;

  if (hex) {
    const normalized = hex.length === 3
      ? hex.split('').map((char) => `${char}${char}`).join('')
      : hex;
    channels = [0, 2, 4].map((offset) => parseInt(normalized.slice(offset, offset + 2), 16));
  } else {
    const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (rgb) channels = rgb.slice(1, 4).map(Number);
  }

  if (!channels || channels.some(Number.isNaN)) return null;
  const [r, g, b] = channels.map((channel) => channel / 255);
  return r * 0.2126 + g * 0.7152 + b * 0.0722;
}

function usesDarkMaterial(surface: HTMLElement): boolean {
  const background = getComputedStyle(surface).getPropertyValue('--aero-bg-color').trim();
  const luminance = colorLuminance(background);
  if (luminance !== null) return luminance < 0.5;
  return Boolean(surface.closest('[data-theme="dark"], [data-prefers-color="dark"]'));
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
  isolateContent: boolean,
  darkMaterial: boolean,
): string {
  const aberration = Math.max(0, Math.min(3, aberrationIntensity));
  const isolationBlur = Math.max(14, Math.min(28, Math.min(width, height) * 0.08));
  const toneSlope = darkMaterial ? 0.72 : 0.68;
  const toneIntercept = darkMaterial ? 0 : 0.32;
  const source = isolateContent ? 'PANEL_SOURCE' : 'SourceGraphic';
  const panelSource = isolateContent
    ? `
      <feGaussianBlur in="SourceGraphic" stdDeviation="${isolationBlur.toFixed(2)}"
        edgeMode="duplicate" result="PANEL_SOFTENED"/>
      <feColorMatrix in="PANEL_SOFTENED" type="saturate" values="1.8" result="PANEL_SATURATED"/>
      <feComponentTransfer in="PANEL_SATURATED" result="PANEL_SOURCE">
        <feFuncR type="linear" slope="${toneSlope}" intercept="${toneIntercept}"/>
        <feFuncG type="linear" slope="${toneSlope}" intercept="${toneIntercept}"/>
        <feFuncB type="linear" slope="${toneSlope}" intercept="${toneIntercept}"/>
        <feFuncA type="identity"/>
      </feComponentTransfer>`
    : '';
  const channelDisplacement = aberration > 0
    ? `
      <feDisplacementMap in="${source}" in2="DISPLACEMENT_MAP" scale="${scale}" xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED"/>
      <feColorMatrix in="RED_DISPLACED" type="matrix"
        values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="RED_CHANNEL"/>
      <feDisplacementMap in="${source}" in2="DISPLACEMENT_MAP" scale="${scale * (1 - aberration * 0.05)}" xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED"/>
      <feColorMatrix in="GREEN_DISPLACED" type="matrix"
        values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="GREEN_CHANNEL"/>
      <feDisplacementMap in="${source}" in2="DISPLACEMENT_MAP" scale="${scale * (1 - aberration * 0.1)}" xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED"/>
      <feColorMatrix in="BLUE_DISPLACED" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
        result="BLUE_CHANNEL"/>
      <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED"/>
      <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="ABERRATED"/>
      <feGaussianBlur in="ABERRATED" stdDeviation="0.2" result="EDGE_SOURCE"/>`
    : `
      <feDisplacementMap in="${source}" in2="DISPLACEMENT_MAP" scale="${scale}"
        xChannelSelector="R" yChannelSelector="B" result="EDGE_SOURCE"/>`;

  const output = edgeOnly
    ? '<feComposite in="EDGE_SOURCE" in2="EDGE_ALPHA" operator="in"/>'
    : `
      <feComposite in="EDGE_SOURCE" in2="EDGE_ALPHA" operator="in" result="EDGE_GLASS"/>
      <feComponentTransfer in="EDGE_ALPHA" result="CENTER_MASK">
        <feFuncA type="table" tableValues="1 0"/>
      </feComponentTransfer>
      <feComposite in="${source}" in2="CENTER_MASK" operator="in" result="CENTER_GLASS"/>
      <feComposite in="EDGE_GLASS" in2="CENTER_GLASS" operator="arithmetic"
        k1="0" k2="1" k3="1" k4="0"/>`;

  return `
    <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
      <feImage x="0" y="0" width="${width}" height="${height}" href="${map}" preserveAspectRatio="none" result="DISPLACEMENT_MAP"/>
      <feImage x="0" y="0" width="${width}" height="${height}" href="${edgeMap}" preserveAspectRatio="none" result="EDGE_MAP"/>
      <feColorMatrix in="EDGE_MAP" type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
        result="EDGE_ALPHA"/>
      ${panelSource}
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
  isolateContent = false,
): () => void {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', 'aero-lg-filter-defs');
  svg.setAttribute('aria-hidden', 'true');
  surface.appendChild(svg);

  let disposed = false;
  let renderSignature = '';
  let renderRevision = 0;
  let prepareFrame = 0;
  let settleFrame = 0;

  const schedulePrepared = (maps: [string, string], revision: number) => {
    if (!onPrepared) return;
    Promise.all(maps.map(decodeImage)).then(() => {
      if (disposed || revision !== renderRevision) return;
      cancelAnimationFrame(prepareFrame);
      cancelAnimationFrame(settleFrame);
      prepareFrame = requestAnimationFrame(() => {
        settleFrame = requestAnimationFrame(() => {
          if (!disposed && revision === renderRevision) onPrepared();
        });
      });
    });
  };

  const update = (): [string, string] | null => {
    const rect = surface.getBoundingClientRect();
    // 入场缩放只改变视觉尺寸，位移图始终按稳定的布局尺寸生成。
    const width = Math.max(1, Math.ceil(surface.offsetWidth || rect.width));
    const height = Math.max(1, Math.ceil(surface.offsetHeight || rect.height));
    const displacement = getDisplacementMap(width, height);
    const edge = getDisplacementEdgeMap(width, height);
    if (!displacement || !edge) return null;

    const darkMaterial = isolateContent && usesDarkMaterial(surface);
    const nextSignature = `${width}:${height}:${darkMaterial}`;
    if (nextSignature === renderSignature) return null;
    renderSignature = nextSignature;
    renderRevision += 1;

    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = `<defs>${filterMarkup(
      id,
      width,
      height,
      Math.max(18, Math.min(72, scale)),
      displacement,
      edge,
      aberrationIntensity,
      edgeOnly,
      isolateContent,
      darkMaterial,
    )}</defs>`;
    const maps: [string, string] = [displacement, edge];
    schedulePrepared(maps, renderRevision);
    return maps;
  };

  const initialMaps = update();
  if (!initialMaps && onPrepared) {
    renderRevision += 1;
    const revision = renderRevision;
    Promise.resolve().then(() => {
      if (disposed || revision !== renderRevision) return;
      prepareFrame = requestAnimationFrame(() => {
        if (!disposed && revision === renderRevision) onPrepared();
      });
    });
  }
  // defs 完整写入后再引用，避免首帧解析到空滤镜。
  warp.style.filter = `url(#${id})`;
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : null;
  observer?.observe(surface);
  const themeObserver = isolateContent && typeof MutationObserver !== 'undefined'
    ? new MutationObserver(update)
    : null;
  themeObserver?.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'style', 'data-theme', 'data-prefers-color'],
  });
  window.addEventListener('resize', update);

  return () => {
    disposed = true;
    cancelAnimationFrame(prepareFrame);
    cancelAnimationFrame(settleFrame);
    observer?.disconnect();
    themeObserver?.disconnect();
    window.removeEventListener('resize', update);
    warp.style.filter = '';
    svg.remove();
  };
}

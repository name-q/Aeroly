// 共享 SVG 位移滤镜注入：向 body 挂一个零尺寸 SVG，
// 定义标准/强折射两套滤镜（含边缘色差），全文档只注入一次。
// 所有液态玻璃表面复用同一 filter ID，Chromium 由 GPU 缓存，不重复编译。

import { getDisplacementMap } from './displacement';

const FILTER_ID = 'aero-lg-filter';
const FILTER_ID_STRONG = 'aero-lg-filter-strong';

function filterMarkup(id: string, scale: number, aberration: number): string {
  const r = -scale;
  const g = -scale - aberration * 0.05 * scale;
  const b = -scale - aberration * 0.1 * scale;
  return `
  <filter id="${id}" x="-35%" y="-35%" width="170%" height="170%" color-interpolation-filters="sRGB">
    <feImage x="0" y="0" width="100%" height="100%" result="DISPLACEMENT_MAP"
             href="__MAP__" xlink:href="__MAP__" preserveAspectRatio="xMidYMid slice"/>
    <feColorMatrix in="DISPLACEMENT_MAP" type="matrix"
      values="0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0.3 0.3 0.3 0 0  0 0 0 1 0"
      result="EDGE_INTENSITY"/>
    <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
      <feFuncA type="discrete" tableValues="0 ${(aberration * 0.05).toFixed(2)} 1"/>
    </feComponentTransfer>
    <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL"/>
    <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${r}" xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED"/>
    <feColorMatrix in="RED_DISPLACED" type="matrix"
      values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
      result="RED_CHANNEL"/>
    <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${g}" xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED"/>
    <feColorMatrix in="GREEN_DISPLACED" type="matrix"
      values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
      result="GREEN_CHANNEL"/>
    <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale="${b}" xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED"/>
    <feColorMatrix in="BLUE_DISPLACED" type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
      result="BLUE_CHANNEL"/>
    <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED"/>
    <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED"/>
    <feGaussianBlur in="RGB_COMBINED" stdDeviation="0.3" result="ABERRATED_BLURRED"/>
    <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION"/>
    <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
      <feFuncA type="table" tableValues="1 0"/>
    </feComponentTransfer>
    <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN"/>
    <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over"/>
  </filter>`;
}

let injected = false;

export function ensureLiquidGlassFilter(): void {
  if (injected || typeof document === 'undefined') return;
  injected = true;

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';

  const map = getDisplacementMap();
  const defs = [
    `<radialGradient id="aero-lg-edge-mask" cx="50%" cy="50%" r="50%">
       <stop offset="0%" stop-color="black" stop-opacity="0"/>
       <stop offset="76%" stop-color="black" stop-opacity="0"/>
       <stop offset="100%" stop-color="white" stop-opacity="1"/>
     </radialGradient>`,
    filterMarkup(FILTER_ID, 60, 2).replace(/__MAP__/g, map),
    filterMarkup(FILTER_ID_STRONG, 90, 3).replace(/__MAP__/g, map),
  ].join('');

  svg.innerHTML = `<defs>${defs}</defs>`;
  (document.body || document.documentElement).appendChild(svg);
}

export { FILTER_ID, FILTER_ID_STRONG };

// 位移贴图：canvas 惰性生成一次并缓存 data URL
// 边缘聚焦的径向位移（roundedRect shader），
// 位移图的 R/G/B 通道编码 X/Y 位移，边缘图的 Alpha 通道编码边缘强度。

const mapCache = new Map<string, string>();
const edgeMapCache = new Map<string, string>();

function createMap(width: number, height: number, edgeOnly: boolean): string {
  if (typeof document === 'undefined') return '';

  const mapScale = Math.min(1, 320 / width, 240 / height);
  const mapWidth = Math.max(32, Math.round(width * mapScale));
  const mapHeight = Math.max(24, Math.round(height * mapScale));
  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  let ctx: CanvasRenderingContext2D | null = null;
  try {
    ctx = canvas.getContext('2d');
  } catch {
    return '';
  }
  if (!ctx) return '';

  const imageData = ctx.createImageData(mapWidth, mapHeight);
  const data = imageData.data;

  for (let y = 0; y < mapHeight; y += 1) {
    for (let x = 0; x < mapWidth; x += 1) {
      const nx = (x / mapWidth - 0.5) * 2;
      const ny = (y / mapHeight - 0.5) * 2;
      const edgeDistance = Math.min(
        x / mapWidth,
        1 - x / mapWidth,
        y / mapHeight,
        1 - y / mapHeight,
      );
      const t = Math.max(0, Math.min(1, (0.24 - edgeDistance) / 0.24));
      const disp = t * t * (3 - 2 * t);
      const dx = nx * disp;
      const dy = ny * disp;

      const i = (y * mapWidth + x) * 4;
      data[i] = Math.round((dx * 0.5 + 0.5) * 255);
      data[i + 1] = Math.round((dy * 0.5 + 0.5) * 255);
      data[i + 2] = Math.round((dy * 0.5 + 0.5) * 255);
      data[i + 3] = edgeOnly ? Math.round(disp * 255) : 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL('image/png');
}

function mapKey(width: number, height: number): string {
  return `${Math.round(width)}x${Math.round(height)}`;
}

export function getDisplacementMap(width: number, height: number): string {
  const key = mapKey(width, height);
  const cached = mapCache.get(key);
  if (cached) return cached;
  const map = createMap(width, height, false);
  mapCache.set(key, map);
  return map;
}

export function getDisplacementEdgeMap(width: number, height: number): string {
  const key = mapKey(width, height);
  const cached = edgeMapCache.get(key);
  if (cached) return cached;
  const map = createMap(width, height, true);
  edgeMapCache.set(key, map);
  return map;
}

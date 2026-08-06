// 位移贴图：canvas 惰性生成一次并缓存 data URL
// 边缘聚焦的径向位移（roundedRect shader），
// R/G/B 通道编码 X/Y 位移，供 SVG feDisplacementMap 消费

let mapUrl: string | null = null;

export function getDisplacementMap(): string {
  if (mapUrl) return mapUrl;
  if (typeof document === 'undefined') return '';

  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const nx = (x / size - 0.5) * 2; // -1..1
      const ny = (y / size - 0.5) * 2;
      const dist = Math.sqrt(nx * nx + ny * ny);
      // 越靠边缘位移越强（0.55~1.0 环带），中心保持不动
      const t = Math.max(0, Math.min(1, (dist - 0.55) / 0.45));
      const disp = t * t * (3 - 2 * t); // smoothstep
      const dx = nx * disp;
      const dy = ny * disp;

      const i = (y * size + x) * 4;
      data[i] = Math.round((dx * 0.5 + 0.5) * 255); // R = X
      data[i + 1] = Math.round((dy * 0.5 + 0.5) * 255); // G = Y
      data[i + 2] = Math.round((dy * 0.5 + 0.5) * 255); // B = Y（SVG 取 R/B 通道）
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  mapUrl = canvas.toDataURL('image/png');
  return mapUrl;
}

import * as THREE from 'three';

// ═══════════════════════════════════════════════════════
//  "Line Convergence" — 300 lines drift → align to "Aeroly"
//
//  Scroll-driven. Cold palette. Shader-interpolated positions.
//  No particles, no physics, no post-processing.
// ═══════════════════════════════════════════════════════

// ─── Letter stroke data ───
// Each letter is an array of line segments [x1,y1, x2,y2]
// Coordinate space: each letter fits in a 1×1.4 box
// Letters are spaced along X, centered at origin

const LETTER_STROKES: Record<string, number[][]> = {
  A: [
    [0, 0, 0.5, 1.4],      // left leg
    [0.5, 1.4, 1, 0],      // right leg
    [0.2, 0.6, 0.8, 0.6],  // crossbar
  ],
  e: [
    [0.15, 0.45, 0.85, 0.45], // middle bar
    [0.85, 0.45, 0.85, 0.9],  // upper right
    [0.85, 0.9, 0.15, 0.9],   // top
    [0.15, 0.9, 0.15, 0],     // left
    [0.15, 0, 0.85, 0],       // bottom
  ],
  r: [
    [0.15, 0, 0.15, 0.9],     // stem
    [0.15, 0.9, 0.7, 0.9],    // top
    [0.7, 0.9, 0.85, 0.7],    // curve top
    [0.85, 0.7, 0.7, 0.55],   // curve mid
  ],
  o: [
    [0.15, 0, 0.85, 0],       // bottom
    [0.85, 0, 0.85, 0.9],     // right
    [0.85, 0.9, 0.15, 0.9],   // top
    [0.15, 0.9, 0.15, 0],     // left
  ],
  U: [
    [0, 1.4, 0, 0.3],         // left down
    [0, 0.3, 0.2, 0],         // left curve
    [0.2, 0, 0.8, 0],         // bottom
    [0.8, 0, 1, 0.3],         // right curve
    [1, 0.3, 1, 1.4],         // right up
  ],
  I: [
    [0.2, 0, 0.8, 0],         // bottom bar
    [0.5, 0, 0.5, 1.4],       // stem
    [0.2, 1.4, 0.8, 1.4],     // top bar
  ],
};

const WORD = 'Aeroly';
const LETTER_WIDTHS: Record<string, number> = {
  A: 1.0, e: 1.0, r: 1.0, o: 1.0, U: 1.0, I: 1.0,
};
const LETTER_HEIGHTS: Record<string, number> = {
  A: 1.4, e: 0.9, r: 0.9, o: 0.9, U: 1.4, I: 1.4,
};
const KERNING = 0.35;

// Build all target line segments in world space
// scale parameter allows responsive sizing
function buildTargetSegments(scale: number): { starts: number[]; ends: number[] } {
  const starts: number[] = [];
  const ends: number[] = [];

  // Calculate total width
  let totalW = 0;
  for (const ch of WORD) {
    totalW += (LETTER_WIDTHS[ch] || 1) + KERNING;
  }
  totalW -= KERNING;

  let cursorX = -totalW * scale / 2;

  for (const ch of WORD) {
    const strokes = LETTER_STROKES[ch];
    const h = LETTER_HEIGHTS[ch] || 1.4;
    const baseY = h <= 1.0 ? -0.5 * scale : -0.7 * scale;

    if (strokes) {
      for (const seg of strokes) {
        starts.push(
          cursorX + seg[0] * scale,
          baseY + seg[1] * scale,
          0,
        );
        ends.push(
          cursorX + seg[2] * scale,
          baseY + seg[3] * scale,
          0,
        );
      }
    }
    cursorX += ((LETTER_WIDTHS[ch] || 1) + KERNING) * scale;
  }

  return { starts, ends };
}

// ─── Config ───
const LINE_COUNT = 300;

// ─── Shaders ───
const lineVS = `
attribute vec3 aStartA;  // random start pos (endpoint A)
attribute vec3 aStartB;  // random start pos (endpoint B)
attribute vec3 aEndA;    // target pos (endpoint A)
attribute vec3 aEndB;    // target pos (endpoint B)
attribute float aSide;   // 0.0 = endpoint A, 1.0 = endpoint B
attribute float aDelay;  // per-line stagger delay 0..1

uniform float uProgress; // scroll progress 0..1
uniform float uTime;

varying float vAlpha;
varying float vProgress;

// Smooth ease-in-out
float ease(float t) {
  return t * t * (3.0 - 2.0 * t);
}

void main() {
  // Staggered progress: each line starts at its own delay
  float localP = clamp((uProgress - aDelay * 0.4) / 0.6, 0.0, 1.0);
  float t = ease(localP);
  vProgress = t;

  // Interpolate between random and target positions
  vec3 posA = mix(aStartA, aEndA, t);
  vec3 posB = mix(aStartB, aEndB, t);

  // Subtle drift when not converged
  float drift = (1.0 - t) * 0.3;
  posA.x += sin(uTime * 0.3 + aDelay * 6.28) * drift;
  posA.y += cos(uTime * 0.25 + aDelay * 4.0) * drift;
  posB.x += sin(uTime * 0.35 + aDelay * 5.0 + 1.0) * drift;
  posB.y += cos(uTime * 0.28 + aDelay * 3.5 + 2.0) * drift;

  vec3 pos = mix(posA, posB, aSide);

  // Alpha: faint when scattered, brighter when converged
  float baseAlpha = mix(0.12, 0.55, t);
  // Slight flicker
  float flicker = 0.92 + 0.08 * sin(uTime * 2.0 + aDelay * 20.0);
  vAlpha = baseAlpha * flicker;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`;

const lineFS = `
varying float vAlpha;
varying float vProgress;

void main() {
  // Cold blue-white, gets slightly brighter as lines converge
  vec3 scattered = vec3(0.25, 0.40, 0.65);
  vec3 converged = vec3(0.55, 0.72, 0.95);
  vec3 color = mix(scattered, converged, vProgress);
  gl_FragColor = vec4(color, vAlpha);
}`;

// ═══════════════════════════════════════════════════════
//  Types
// ═══════════════════════════════════════════════════════

export interface SceneContext {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  lines: THREE.LineSegments;
  material: THREE.ShaderMaterial;
  camZ: number;
  onBgChange?: (progress: number) => void;
}

// ═══════════════════════════════════════════════════════
//  Scene setup
// ═══════════════════════════════════════════════════════

export function createScene(canvas: HTMLCanvasElement): SceneContext {
  const dpr = Math.min(window.devicePixelRatio, 1.5);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);

  // Responsive: on narrow screens, pull camera back so all letters fit
  // At FOV 50, visible width at z distance = 2 * z * tan(25°) * aspect
  // We need ~14 units wide at scale 1.8, so solve for z
  // For mobile (aspect ~0.5): z needs to be ~16
  // For desktop (aspect ~1.8): z = 10 is fine
  const targetWorldWidth = 14; // approx total word width at scale 1.8
  const halfFovRad = (50 / 2) * Math.PI / 180;
  const minZ = (targetWorldWidth / 2) / (Math.tan(halfFovRad) * aspect) + 1;
  const camZ = Math.max(10, minZ);
  camera.position.set(0, 0, camZ);
  camera.lookAt(0, 0, 0);

  // Responsive scale: shrink text on very narrow screens
  const scale = aspect < 0.7 ? 1.2 : aspect < 1.0 ? 1.5 : 1.8;

  // Build target segments with responsive scale
  const { starts: tStarts, ends: tEnds } = buildTargetSegments(scale);
  const segCount = tStarts.length / 3;

  // Each of the 300 lines maps to a target segment (cycling if more lines than segments)
  const vertCount = LINE_COUNT * 2; // 2 endpoints per line

  const aStartA = new Float32Array(vertCount * 3);
  const aStartB = new Float32Array(vertCount * 3);
  const aEndA = new Float32Array(vertCount * 3);
  const aEndB = new Float32Array(vertCount * 3);
  const aSide = new Float32Array(vertCount);
  const aDelay = new Float32Array(vertCount);

  for (let i = 0; i < LINE_COUNT; i++) {
    const segIdx = i % segCount;
    const vi = i * 2; // vertex index for endpoint A
    const vj = i * 2 + 1; // vertex index for endpoint B

    // Random scattered positions (scale field to match text size)
    const fieldW = scale * 5;
    const fieldH = fieldW * 0.6;
    const fieldD = 4;
    const rx1 = (Math.random() - 0.5) * fieldW;
    const ry1 = (Math.random() - 0.5) * fieldH;
    const rz1 = (Math.random() - 0.5) * fieldD;
    const rx2 = rx1 + (Math.random() - 0.5) * 2.0;
    const ry2 = ry1 + (Math.random() - 0.5) * 2.0;
    const rz2 = rz1 + (Math.random() - 0.5) * 1.0;

    // Target positions from letter strokes
    const tx1 = tStarts[segIdx * 3];
    const ty1 = tStarts[segIdx * 3 + 1];
    const tz1 = tStarts[segIdx * 3 + 2];
    const tx2 = tEnds[segIdx * 3];
    const ty2 = tEnds[segIdx * 3 + 1];
    const tz2 = tEnds[segIdx * 3 + 2];

    // Stagger delay based on distance from center (center converges first)
    const cx = (tx1 + tx2) / 2;
    const cy = (ty1 + ty2) / 2;
    const distFromCenter = Math.sqrt(cx * cx + cy * cy);
    const delay = Math.min(distFromCenter / 8.0 + Math.random() * 0.3, 1.0);

    // Endpoint A
    aStartA[vi * 3] = rx1; aStartA[vi * 3 + 1] = ry1; aStartA[vi * 3 + 2] = rz1;
    aEndA[vi * 3] = tx1; aEndA[vi * 3 + 1] = ty1; aEndA[vi * 3 + 2] = tz1;
    aSide[vi] = 0.0;
    aDelay[vi] = delay;

    // Endpoint B
    aStartB[vj * 3] = rx2; aStartB[vj * 3 + 1] = ry2; aStartB[vj * 3 + 2] = rz2;
    aEndB[vj * 3] = tx2; aEndB[vj * 3 + 1] = ty2; aEndB[vj * 3 + 2] = tz2;
    aSide[vj] = 1.0;
    aDelay[vj] = delay;

    // Both endpoints of a line need both A and B data
    aStartA[vj * 3] = rx1; aStartA[vj * 3 + 1] = ry1; aStartA[vj * 3 + 2] = rz1;
    aStartB[vi * 3] = rx2; aStartB[vi * 3 + 1] = ry2; aStartB[vi * 3 + 2] = rz2;
    aEndA[vj * 3] = tx1; aEndA[vj * 3 + 1] = ty1; aEndA[vj * 3 + 2] = tz1;
    aEndB[vi * 3] = tx2; aEndB[vi * 3 + 1] = ty2; aEndB[vi * 3 + 2] = tz2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertCount * 3), 3)); // placeholder
  geo.setAttribute('aStartA', new THREE.BufferAttribute(aStartA, 3));
  geo.setAttribute('aStartB', new THREE.BufferAttribute(aStartB, 3));
  geo.setAttribute('aEndA', new THREE.BufferAttribute(aEndA, 3));
  geo.setAttribute('aEndB', new THREE.BufferAttribute(aEndB, 3));
  geo.setAttribute('aSide', new THREE.BufferAttribute(aSide, 1));
  geo.setAttribute('aDelay', new THREE.BufferAttribute(aDelay, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: lineVS,
    fragmentShader: lineFS,
    uniforms: {
      uProgress: { value: 0 },
      uTime: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const lines = new THREE.LineSegments(geo, material);
  scene.add(lines);

  return { renderer, scene, camera, lines, material, camZ };
}

// ═══════════════════════════════════════════════════════
//  Update — scroll drives convergence
// ═══════════════════════════════════════════════════════

export function updateScene(ctx: SceneContext, elapsed: number, scrollProgress: number) {
  ctx.material.uniforms.uTime.value = elapsed;
  ctx.material.uniforms.uProgress.value = scrollProgress;

  // Subtle camera drift for depth
  ctx.camera.position.x = Math.sin(elapsed * 0.1) * 0.3;
  ctx.camera.position.y = Math.cos(elapsed * 0.08) * 0.2;
  ctx.camera.position.z = ctx.camZ;
  ctx.camera.lookAt(0, 0, 0);

  ctx.onBgChange?.(scrollProgress);
}

// ═══════════════════════════════════════════════════════
//  Cleanup
// ═══════════════════════════════════════════════════════

export function destroyScene(ctx: SceneContext) {
  ctx.renderer.dispose();
  ctx.lines.geometry.dispose();
  ctx.material.dispose();
}

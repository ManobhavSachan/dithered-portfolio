'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

type DitherAlgorithm = 'floyd-steinberg' | 'bayer' | 'blue-noise';

interface DitherOptions {
  threshold: number;
  serpentine: boolean;
  errorStrength: number;
}

interface ProcessedImage {
  grayscale: Uint8Array;
  alpha: Uint8Array;
  width: number;
  height: number;
}

interface Shockwave {
  x: number;
  y: number;
  start: number;
}

interface DotSystem {
  count: number;
  baseX: Float32Array;
  baseY: Float32Array;
  dx: Float32Array;
  dy: Float32Array;
  brightness: Float32Array;
  tint: Float32Array;
  size: number;
}

interface DitheredLogoProps {
  image: string;
  algorithm?: DitherAlgorithm;
  invert?: boolean;
  scale?: number;
  dotScale?: number;
  dotColor?: string;
  backgroundColor?: string;
  errorStrength?: number;
  serpentine?: boolean;
  cornerRadius?: number;
  imageProcessing?: {
    threshold?: number;
    contrast?: number;
    gamma?: number;
    blur?: number;
    highlightsCompression?: number;
  };
  interaction?: {
    mouseRepulsion?: boolean;
    clickShockwave?: boolean;
  };
  gridResolution?: number;
  className?: string;
  style?: React.CSSProperties;
}

// prettier-ignore
const BAYER_8X8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
];

const SHOCKWAVE_SPEED = 225;
const SHOCKWAVE_WIDTH = 37;
const SHOCKWAVE_STRENGTH = 20;
const SHOCKWAVE_DURATION = 675;
const MOUSE_RADIUS = 100;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const MOUSE_FORCE_PEAK = 40;
const EASING = 0.12;
const SNAP_THRESHOLD = 0.01;

const colorCache = new Map<string, { r: number; g: number; b: number }>();

function floydSteinberg(
  grayscale: Uint8Array,
  width: number,
  height: number,
  opts: DitherOptions,
  alpha?: Uint8Array
): Float32Array {
  const errors = new Float32Array(width * height);
  for (let i = 0; i < grayscale.length; i++) {
    errors[i] = grayscale[i];
  }

  const positions: number[] = [];
  const hasAlpha = alpha && alpha.length === grayscale.length;

  for (let y = 0; y < height; y++) {
    const leftToRight = !opts.serpentine || y % 2 === 0;
    const startX = leftToRight ? 0 : width - 1;
    const endX = leftToRight ? width : -1;
    const step = leftToRight ? 1 : -1;

    for (let x = startX; x !== endX; x += step) {
      const idx = y * width + x;
      if (hasAlpha && alpha[idx] < 128) continue;

      const oldVal = errors[idx];
      const newVal = oldVal > opts.threshold ? 255 : 0;
      const err = (oldVal - newVal) * opts.errorStrength;

      if (newVal > 0) {
        positions.push(x, y);
      }

      const diffuse = (nx: number, ny: number, weight: number) => {
        if (nx < 0 || nx >= width || ny >= height) return;
        const ni = ny * width + nx;
        if (hasAlpha && alpha[ni] < 128) return;
        errors[ni] += err * weight;
      };

      diffuse(x + step, y, 7 / 16);
      diffuse(x - step, y + 1, 3 / 16);
      diffuse(x, y + 1, 5 / 16);
      diffuse(x + step, y + 1, 1 / 16);
    }
  }

  return new Float32Array(positions);
}

function bayerDither(
  grayscale: Uint8Array,
  width: number,
  height: number,
  opts: DitherOptions,
  alpha?: Uint8Array
): Float32Array {
  const positions: number[] = [];
  const bias = (opts.threshold - 128) / 255;
  const hasAlpha = alpha && alpha.length === grayscale.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (hasAlpha && alpha[idx] < 128) continue;
      const luma = grayscale[idx] / 255;
      const bayerVal = (BAYER_8X8[(y & 7) * 8 + (x & 7)] + 1) / 65;

      if (luma + bias > bayerVal) {
        positions.push(x, y);
      }
    }
  }

  return new Float32Array(positions);
}

function blueNoiseDither(
  grayscale: Uint8Array,
  width: number,
  height: number,
  noiseData: Uint8Array,
  noiseSize: number,
  opts: DitherOptions,
  alpha?: Uint8Array
): Float32Array {
  const positions: number[] = [];
  const bias = (opts.threshold - 128) / 255;
  const hasAlpha = alpha && alpha.length === grayscale.length;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      if (hasAlpha && alpha[idx] < 128) continue;

      const luma = grayscale[idx] / 255;
      const nx = x % noiseSize;
      const ny = y % noiseSize;
      const noiseVal = noiseData[ny * noiseSize + nx] / 255;

      if (luma + bias > noiseVal) {
        positions.push(x, y);
      }
    }
  }

  return new Float32Array(positions);
}

function generateBlueNoise(size: number): Uint8Array {
  const data = new Uint8Array(size * size);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }

  for (let pass = 0; pass < 3; pass++) {
    const blurred = new Float32Array(data.length);
    const radius = 2;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        let sum = 0;
        let count = 0;

        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = (x + dx + size) % size;
            const ny = (y + dy + size) % size;
            sum += data[ny * size + nx];
            count++;
          }
        }

        blurred[y * size + x] = sum / count;
      }
    }

    for (let i = 0; i < data.length; i++) {
      const diff = data[i] - blurred[i];
      data[i] = Math.max(0, Math.min(255, Math.round(data[i] + diff * 0.5)));
    }
  }

  return data;
}

function roundedSquareMask(w: number, h: number, radiusPct = 0.22): Set<number> {
  const r = Math.round(radiusPct * Math.min(w, h));
  const mask = new Set<number>();

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let inside = false;
      if (x >= r && x < w - r) {
        inside = y >= 0 && y < h;
      } else if (y >= r && y < h - r) {
        inside = x >= 0 && x < w;
      } else {
        const cx = x < r ? r : w - r - 1;
        const cy = y < r ? r : h - r - 1;
        const dx = x - cx;
        const dy = y - cy;
        inside = dx * dx + dy * dy <= r * r;
      }

      if (inside) mask.add(y * w + x);
    }
  }

  return mask;
}

function invertWithMask(
  positions: Float32Array,
  gridW: number,
  gridH: number,
  radiusPct = 0.22,
  alpha?: Uint8Array
): Float32Array {
  const mask = roundedSquareMask(gridW, gridH, radiusPct);
  const logoSet = new Set<number>();

  for (let i = 0; i < positions.length; i += 2) {
    logoSet.add(Math.round(positions[i + 1]) * gridW + Math.round(positions[i]));
  }

  const inverted: number[] = [];
  for (const idx of mask) {
    if (!logoSet.has(idx)) {
      if (alpha && alpha[idx] < 128) continue;
      inverted.push(idx % gridW, Math.floor(idx / gridW));
    }
  }

  return new Float32Array(inverted);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function processImage(
  img: HTMLImageElement,
  maxDimension: number,
  scale: number,
  contrast: number,
  gamma: number,
  blur: number,
  highlightsCompression = 0
): ProcessedImage {
  const aspect = img.naturalWidth / img.naturalHeight;
  let outW: number;
  let outH: number;

  if (aspect >= 1) {
    outW = maxDimension;
    outH = Math.round(maxDimension / aspect);
  } else {
    outH = maxDimension;
    outW = Math.round(maxDimension * aspect);
  }

  const srcW = img.naturalWidth;
  const srcH = img.naturalHeight;

  const alphaCanvas = document.createElement('canvas');
  alphaCanvas.width = outW;
  alphaCanvas.height = outH;
  const alphaCtx = alphaCanvas.getContext('2d');
  if (!alphaCtx) {
    throw new Error('Failed to create alpha context');
  }
  alphaCtx.imageSmoothingEnabled = true;
  alphaCtx.imageSmoothingQuality = 'high';
  alphaCtx.drawImage(img, 0, 0, outW, outH);
  const alphaData = alphaCtx.getImageData(0, 0, outW, outH).data;

  const pad = Math.ceil(blur * 3);
  const srcCanvas = document.createElement('canvas');
  srcCanvas.width = srcW + pad * 2;
  srcCanvas.height = srcH + pad * 2;
  const srcCtx = srcCanvas.getContext('2d');
  if (!srcCtx) {
    throw new Error('Failed to create source context');
  }

  if (blur > 0) {
    srcCtx.filter = `blur(${blur}px)`;
  }
  srcCtx.drawImage(img, pad, pad, srcW, srcH);
  srcCtx.filter = 'none';

  const canvas = document.createElement('canvas');
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to create processing context');
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(srcCanvas, pad, pad, srcW, srcH, 0, 0, outW, outH);

  const pixels = ctx.getImageData(0, 0, outW, outH).data;
  const sampledW = Math.ceil(outW / scale);
  const sampledH = Math.ceil(outH / scale);
  const grayscale = new Uint8Array(sampledW * sampledH);
  const alpha = new Uint8Array(sampledW * sampledH);
  const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let sy = 0; sy < sampledH; sy++) {
    for (let sx = 0; sx < sampledW; sx++) {
      const px = Math.min(Math.round(sx * scale), outW - 1);
      const py = Math.min(Math.round(sy * scale), outH - 1);
      const idx = (py * outW + px) * 4;

      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];
      const blurredAlpha = pixels[idx + 3] / 255;

      alpha[sy * sampledW + sx] = alphaData[idx + 3];

      let luma: number;
      if (blurredAlpha > 0.01) {
        luma = (0.299 * r + 0.587 * g + 0.114 * b) / blurredAlpha;
      } else {
        luma = 0;
      }

      if (contrast !== 0) {
        luma = contrastFactor * (luma - 128) + 128;
      }
      if (gamma !== 1.0) {
        luma = 255 * Math.pow(Math.max(0, luma / 255), 1 / gamma);
      }
      if (highlightsCompression > 0) {
        const norm = luma / 255;
        const compressed = norm < 0.5 ? norm : 0.5 + (norm - 0.5) * (1 - highlightsCompression);
        luma = compressed * 255;
      }

      grayscale[sy * sampledW + sx] = Math.max(0, Math.min(255, Math.round(luma)));
    }
  }

  return { grayscale, alpha, width: sampledW, height: sampledH };
}

function createDotSystem(
  points: Float32Array,
  scaleFactor: number,
  dotScale: number,
  offsetX: number,
  offsetY: number
): DotSystem {
  const count = points.length / 2;
  const baseX = new Float32Array(count);
  const baseY = new Float32Array(count);
  const dx = new Float32Array(count);
  const dy = new Float32Array(count);
  const brightness = new Float32Array(count);
  const tint = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    baseX[i] = offsetX + points[i * 2] * scaleFactor;
    baseY[i] = offsetY + points[i * 2 + 1] * scaleFactor;
    brightness[i] = 1;
    tint[i] = 1;
  }

  return { count, baseX, baseY, dx, dy, brightness, tint, size: scaleFactor * dotScale };
}

function updateDots(
  sys: DotSystem,
  mouseX: number,
  mouseY: number,
  mouseActive: boolean,
  shockwaves: Shockwave[],
  now: number
): boolean {
  const { count, baseX, baseY, dx, dy } = sys;

  let numActive = shockwaves.length;
  for (let k = shockwaves.length - 1; k >= 0; k--) {
    if (now - shockwaves[k].start >= SHOCKWAVE_DURATION) {
      shockwaves.splice(k, 1);
      numActive--;
    }
  }

  const shockMultiplier = numActive > 0 ? 1 + 0.5 * (numActive - 1) : 0;
  let hasMotion = false;

  for (let i = 0; i < count; i++) {
    let targetFx = 0;
    let targetFy = 0;

    if (mouseActive) {
      const vx = baseX[i] + dx[i] - mouseX;
      const vy = baseY[i] + dy[i] - mouseY;
      const dist2 = vx * vx + vy * vy;

      if (dist2 > 0.1 && dist2 < MOUSE_RADIUS_SQ) {
        const dist = Math.sqrt(dist2);
        const falloff = 1 - dist / MOUSE_RADIUS;
        const force = falloff * falloff * falloff * MOUSE_FORCE_PEAK;
        targetFx += (vx / dist) * force;
        targetFy += (vy / dist) * force;
      }
    }

    for (let k = 0; k < shockwaves.length; k++) {
      const sw = shockwaves[k];
      const elapsed = now - sw.start;
      const radius = (elapsed / 1000) * SHOCKWAVE_SPEED;
      const life = 1 - elapsed / SHOCKWAVE_DURATION;

      const sx = baseX[i] - sw.x;
      const sy = baseY[i] - sw.y;
      const dist = Math.sqrt(sx * sx + sy * sy);

      if (dist >= 0.1) {
        const band = Math.abs(dist - radius);
        if (band < SHOCKWAVE_WIDTH) {
          const waveForce =
            (1 - band / SHOCKWAVE_WIDTH) *
            life *
            SHOCKWAVE_STRENGTH *
            shockMultiplier;
          targetFx += (sx / dist) * waveForce;
          targetFy += (sy / dist) * waveForce;
        }
      }
    }

    dx[i] += (targetFx - dx[i]) * EASING;
    dy[i] += (targetFy - dy[i]) * EASING;

    if (Math.abs(dx[i]) < SNAP_THRESHOLD) dx[i] = 0;
    if (Math.abs(dy[i]) < SNAP_THRESHOLD) dy[i] = 0;

    if (dx[i] !== 0 || dy[i] !== 0) {
      hasMotion = true;
    }
  }

  return hasMotion || shockwaves.length > 0 || mouseActive;
}

function renderDots(
  ctx: CanvasRenderingContext2D,
  sys: DotSystem,
  color: { r: number; g: number; b: number },
  canvasW: number,
  canvasH: number,
  dpr: number
): void {
  ctx.clearRect(0, 0, canvasW * dpr, canvasH * dpr);

  const buckets: number[][] = new Array(126);
  for (let z = 0; z < 126; z++) buckets[z] = [];

  for (let i = 0; i < sys.count; i++) {
    const bucket = 6 * Math.round(20 * sys.brightness[i]) + Math.round(5 * sys.tint[i]);
    const clamped = Math.max(0, Math.min(125, bucket));
    buckets[clamped].push(i);
  }

  const size = sys.size * dpr;
  const pad = 0.25 * dpr;
  const padSize = 0.5 * dpr;

  for (let z = 0; z < 126; z++) {
    const ids = buckets[z];
    if (ids.length === 0) continue;

    const alpha = Math.floor(z / 6) / 20;
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`;

    for (let j = 0; j < ids.length; j++) {
      const i = ids[j];
      const rx = (sys.baseX[i] + sys.dx[i]) * dpr;
      const ry = (sys.baseY[i] + sys.dy[i]) * dpr;
      ctx.fillRect(rx - pad, ry - pad, size + padSize, size + padSize);
    }
  }
}

function parseColor(css: string): { r: number; g: number; b: number } {
  const hit = colorCache.get(css);
  if (hit) return hit;

  let m = css.match(/^#([0-9a-f]{3,8})$/i);
  if (m) {
    let h = m[1];
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    const out = {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
    colorCache.set(css, out);
    return out;
  }

  m = css.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (m) {
    const out = {
      r: parseInt(m[1], 10),
      g: parseInt(m[2], 10),
      b: parseInt(m[3], 10),
    };
    colorCache.set(css, out);
    return out;
  }

  if (typeof document !== 'undefined') {
    const ctx = document.createElement('canvas').getContext('2d');
    if (ctx) {
      ctx.fillStyle = css;
      const resolved = ctx.fillStyle;
      if (resolved.startsWith('#')) {
        const out = parseColor(resolved);
        colorCache.set(css, out);
        return out;
      }
    }
  }

  const fallback = { r: 0, g: 0, b: 0 };
  colorCache.set(css, fallback);
  return fallback;
}

export default function DitheredLogo({
  image,
  algorithm = 'floyd-steinberg',
  invert = true,
  scale = 0.35,
  dotScale = 1,
  dotColor = 'rgba(0,0,0,1)',
  backgroundColor = '#ffffff',
  errorStrength = 1,
  serpentine = true,
  cornerRadius = 0.28,
  imageProcessing,
  interaction,
  gridResolution = 205,
  className,
  style,
}: DitheredLogoProps) {
  const mergedImageProcessing = useMemo(
    () => ({
      threshold: 181,
      contrast: 0,
      gamma: 1.03,
      blur: 3.75,
      highlightsCompression: 0,
      ...imageProcessing,
    }),
    [imageProcessing]
  );
  const mergedInteraction = useMemo(
    () => ({
      mouseRepulsion: true,
      clickShockwave: true,
      ...interaction,
    }),
    [interaction]
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const systemRef = useRef<DotSystem | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number>(0);
  const runningRef = useRef(false);
  const blueNoiseRef = useRef<Uint8Array | null>(null);
  const prevConfigRef = useRef('');
  const dotColorRef = useRef(parseColor(dotColor));
  const interactionRef = useRef(mergedInteraction);

  useEffect(() => {
    dotColorRef.current = parseColor(dotColor);
  }, [dotColor]);

  useEffect(() => {
    interactionRef.current = mergedInteraction;
  }, [mergedInteraction]);

  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    const tick = () => {
      const sys = systemRef.current;
      if (!sys) {
        runningRef.current = false;
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const needsMore = updateDots(
        sys,
        mouseRef.current.x,
        mouseRef.current.y,
        mouseRef.current.active,
        shockwavesRef.current,
        performance.now()
      );

      renderDots(ctx, sys, dotColorRef.current, rect.width, rect.height, dpr);

      if (needsMore) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        runningRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  const rebuildParticles = useCallback(async (src: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const img = await loadImage(src);
    const processed = processImage(
      img,
      gridResolution,
      1,
      mergedImageProcessing.contrast,
      mergedImageProcessing.gamma,
      mergedImageProcessing.blur,
      mergedImageProcessing.highlightsCompression
    );

    const opts: DitherOptions = {
      threshold: mergedImageProcessing.threshold,
      serpentine,
      errorStrength,
    };

    let positions: Float32Array;
    switch (algorithm) {
      case 'floyd-steinberg':
        positions = floydSteinberg(
          processed.grayscale,
          processed.width,
          processed.height,
          opts,
          processed.alpha
        );
        break;
      case 'bayer':
        positions = bayerDither(
          processed.grayscale,
          processed.width,
          processed.height,
          opts,
          processed.alpha
        );
        break;
      case 'blue-noise':
      default:
        if (!blueNoiseRef.current) {
          blueNoiseRef.current = generateBlueNoise(256);
        }
        positions = blueNoiseDither(
          processed.grayscale,
          processed.width,
          processed.height,
          blueNoiseRef.current,
          256,
          opts,
          processed.alpha
        );
    }

    if (invert) {
      positions = invertWithMask(
        positions,
        processed.width,
        processed.height,
        cornerRadius,
        processed.alpha
      );
    }

    const s = Math.max(
      0.5,
      (Math.min(rect.width, rect.height) * scale) / Math.max(processed.width, processed.height)
    );
    const ox = Math.round((rect.width - processed.width * s) / 2);
    const oy = Math.round((rect.height - processed.height * s) / 2);

    systemRef.current = createDotSystem(positions, s, dotScale, ox, oy);
    startLoop();
  }, [
    algorithm,
    scale,
    dotScale,
    mergedImageProcessing.contrast,
    mergedImageProcessing.gamma,
    mergedImageProcessing.blur,
    mergedImageProcessing.threshold,
    mergedImageProcessing.highlightsCompression,
    errorStrength,
    serpentine,
    cornerRadius,
    invert,
    gridResolution,
    startLoop,
  ]);

  useEffect(() => {
    if (!image) return;

    const configKey = JSON.stringify([
      image,
      algorithm,
      scale,
      dotScale,
      mergedImageProcessing,
      errorStrength,
      serpentine,
      cornerRadius,
      invert,
      gridResolution,
    ]);

    if (configKey === prevConfigRef.current) return;
    prevConfigRef.current = configKey;
    rebuildParticles(image).catch((err) => {
      console.error('Failed to build dithered logo:', err);
    });
  }, [
    image,
    algorithm,
    scale,
    dotScale,
    mergedImageProcessing,
    errorStrength,
    serpentine,
    cornerRadius,
    invert,
    gridResolution,
    rebuildParticles,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sys = systemRef.current;
    if (!canvas || !sys) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    renderDots(ctx, sys, parseColor(dotColor), rect.width, rect.height, dpr);
  }, [dotColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    let resizeTimer: number | null = null;
    let lastW = 0;
    let lastH = 0;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const sys = systemRef.current;
      if (sys) {
        renderDots(ctx, sys, dotColorRef.current, rect.width, rect.height, dpr);
      }

      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (lastW !== 0 && (w !== lastW || h !== lastH)) {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
          if (image) {
            rebuildParticles(image).catch((err) => {
              console.error('Failed to rebuild dithered logo:', err);
            });
          }
        }, 200);
      }

      lastW = w;
      lastH = h;
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    const onPointerMove = (e: PointerEvent) => {
      if (!interactionRef.current.mouseRepulsion) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
      startLoop();
    };

    const onPointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      mouseRef.current.active = false;
      startLoop();
    };

    const onPointerCancel = () => {
      mouseRef.current.active = false;
      startLoop();
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!interactionRef.current.clickShockwave) return;
      const rect = canvas.getBoundingClientRect();
      shockwavesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        start: performance.now(),
      });
      if (e.pointerType !== 'mouse') {
        mouseRef.current.active = false;
      }
      startLoop();
    };

    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    canvas.addEventListener('pointercancel', onPointerCancel);
    canvas.addEventListener('pointerup', onPointerUp);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      runningRef.current = false;
      if (resizeTimer) clearTimeout(resizeTimer);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
      canvas.removeEventListener('pointercancel', onPointerCancel);
      canvas.removeEventListener('pointerup', onPointerUp);
    };
  }, [image, startLoop, rebuildParticles]);

  return (
    <div className={className} style={{ ...style, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          touchAction: 'none',
          cursor: 'default',
          background: backgroundColor,
        }}
      />
    </div>
  );
}

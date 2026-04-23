'use client';

import { useEffect, useRef } from 'react';

type FlickeringGridProps = {
  className?: string;
  squareSize?: number;
  gridGap?: number;
  maxOpacity?: number;
  flickerChance?: number;
};

export default function FlickeringGrid({
  className,
  squareSize = 2,
  gridGap = 2,
  maxOpacity = 0.35,
  flickerChance = 0.22,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let squares = new Float32Array(0);

    const setup = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      cols = Math.max(1, Math.floor(width / (squareSize + gridGap)));
      rows = Math.max(1, Math.floor(height / (squareSize + gridGap)));
      squares = new Float32Array(cols * rows);

      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
    };

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const color = isDark ? '230,235,255' : '18,24,37';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          if (Math.random() < flickerChance) {
            squares[idx] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = `rgba(${color},${squares[idx]})`;
          ctx.fillRect(
            (x * (squareSize + gridGap)) * dpr,
            (y * (squareSize + gridGap)) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }

      frame = requestAnimationFrame(draw);
    };

    setup();
    draw();

    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [flickerChance, gridGap, maxOpacity, squareSize]);

  return (
    <div ref={containerRef} className={className}>
      <canvas ref={canvasRef} className="pointer-events-none block h-full w-full" />
    </div>
  );
}

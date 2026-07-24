import { memo, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  v: number;
}

interface TerminalCanvasProps {
  gridRgb: string;
  starRgb: string;
  starfield: boolean;
  dprCap?: number;
  targetFps?: number;
  particleCount?: number;
  gridGap?: number;
}

export default memo(function TerminalCanvas({
  gridRgb,
  starRgb,
  starfield,
  dprCap = 2,
  targetFps = 60,
  particleCount = 80,
  gridGap = 52,
}: TerminalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const colorsRef = useRef({ gridRgb, starRgb });

  useEffect(() => {
    colorsRef.current = { gridRgb, starRgb };
  }, [gridRgb, starRgb]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const parts: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),
      v: 0.12 + Math.random() * 0.55,
    }));

    let t = 0;
    let raf = 0;
    let alive = true;
    let visible = !document.hidden;
    const frameInterval = 1000 / Math.max(1, targetFps);
    let lastFrameTs = 0;

    const draw = (ts = 0) => {
      raf = 0;
      if (!alive || !visible) {
        return;
      }

      if (lastFrameTs !== 0 && ts - lastFrameTs < frameInterval) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrameTs = ts;

      t += 0.004;
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = `rgba(${colorsRef.current.gridRgb},0.05)`;
      ctx.lineWidth = 1;
      const gap = gridGap;
      const off = (t * 26) % gap;
      for (let x = -off; x < w; x += gap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -off; y < h; y += gap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (starfield) {
        for (const p of parts) {
          p.y += p.v;
          if (p.y > h) {
            p.y = -2;
            p.x = Math.random() * w;
          }
          const a = 0.12 + p.z * 0.5;
          const r = p.z * 1.6 + 0.3;
          ctx.fillStyle = `rgba(${colorsRef.current.starRgb},${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, 7);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      visible = !document.hidden;
      if (visible && alive && raf === 0) {
        raf = requestAnimationFrame(draw);
      }
      if (!visible && raf !== 0) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    if (visible) {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      alive = false;
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starfield, dprCap, targetFps, particleCount, gridGap]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
});

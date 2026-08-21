import { memo, useEffect, useRef, useState } from "react";
import * as sound from "@/lib/sound";
import { startSession } from "@/lib/leaderboard";
import Leaderboard from "./Leaderboard";
import { SectionShell } from "./Sections";

const GRID_X = 22;
const GRID_Y = 13;
const CELL = 24;
const SIZE_X = GRID_X * CELL;
const SIZE_Y = GRID_Y * CELL;
const TICK_MS = 130;

interface Point {
  x: number;
  y: number;
}

type Status = "idle" | "playing" | "over";

function randomFood(snake: Point[]): Point {
  const maxCells = GRID_X * GRID_Y;
  const attemptsLimit = maxCells * 2;
  let attempts = 0;
  let p: Point;
  do {
    p = {
      x: Math.floor(Math.random() * GRID_X),
      y: Math.floor(Math.random() * GRID_Y),
    };
    attempts += 1;
    if (attempts > attemptsLimit) {
      break;
    }
  } while (snake.some((s) => s.x === p.x && s.y === p.y));

  if (snake.some((s) => s.x === p.x && s.y === p.y)) {
    for (let y = 0; y < GRID_Y; y++) {
      for (let x = 0; x < GRID_X; x++) {
        if (!snake.some((s) => s.x === x && s.y === y)) {
          return { x, y };
        }
      }
    }
  }
  return p;
}

function freshGame() {
  const snake: Point[] = [
    { x: 7, y: 8 },
    { x: 6, y: 8 },
    { x: 5, y: 8 },
  ];
  return {
    snake,
    dir: { x: 1, y: 0 } as Point,
    nextDir: { x: 1, y: 0 } as Point,
    food: randomFood(snake),
  };
}

const DIRECTIONS: Record<string, Point> = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const SWIPE_THRESHOLD = 24;

export default memo(function GameSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const paletteRef = useRef({
    glow: "#93f0cf",
    line: "rgba(145,132,217,.2)",
    accent: "#7ee0a8",
  });
  const gameRef = useRef(freshGame());
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState(true);

  const syncPalette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const styles = getComputedStyle(canvas);
    paletteRef.current = {
      glow: styles.getPropertyValue("--glow-bright").trim() || "#93f0cf",
      line: styles.getPropertyValue("--line").trim() || "rgba(145,132,217,.2)",
      accent: styles.getPropertyValue("--accent").trim() || "#7ee0a8",
    };
  };

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current ?? canvas?.getContext("2d") ?? null;
    if (!canvas || !ctx) return;
    if (!ctxRef.current) ctxRef.current = ctx;

    const { glow, line, accent } = paletteRef.current;
    const { snake, food } = gameRef.current;

    ctx.clearRect(0, 0, SIZE_X, SIZE_Y);

    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    for (let i = 1; i < GRID_X; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, SIZE_Y);
      ctx.stroke();
    }
    for (let i = 1; i < GRID_Y; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * CELL);
      ctx.lineTo(SIZE_X, i * CELL);
      ctx.stroke();
    }

    if (status !== "idle") {
      ctx.fillStyle = accent;
      ctx.fillRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6);
    }

    ctx.fillStyle = glow;
    snake.forEach((seg, i) => {
      ctx.globalAlpha = i === 0 ? 1 : 0.65;
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
    });
    ctx.globalAlpha = 1;
  };

  useEffect(() => {
    ctxRef.current = canvasRef.current?.getContext("2d") ?? null;
    syncPalette();
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onThemeChange = () => {
      syncPalette();
      draw();
    };
    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let sectionVisible = true;
    let pageVisible = !document.hidden;
    const update = () => setActive(sectionVisible && pageVisible);

    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      update();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (status !== "playing" || !active) return;
    const id = window.setInterval(() => {
      const g = gameRef.current;
      g.dir = g.nextDir;
      const head = g.snake[0];
      const newHead = {
        x: (head.x + g.dir.x + GRID_X) % GRID_X,
        y: (head.y + g.dir.y + GRID_Y) % GRID_Y,
      };

      const hitSelf = g.snake.some(
        (s) => s.x === newHead.x && s.y === newHead.y,
      );

      if (hitSelf) {
        setStatus("over");
        sound.gameOver();
        return;
      }

      g.snake = [newHead, ...g.snake];
      if (newHead.x === g.food.x && newHead.y === g.food.y) {
        if (g.snake.length >= GRID_X * GRID_Y) {
          setScore((s) => s + 1);
          setStatus("over");
          sound.success();
          draw();
          return;
        }
        g.food = randomFood(g.snake);
        setScore((s) => s + 1);
        sound.eat();
      } else {
        g.snake.pop();
        sound.tick();
      }
      draw();
    }, TICK_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, active]);

  const startGame = () => {
    gameRef.current = freshGame();
    setScore(0);
    setStatus("playing");
    setSessionId(null);
    startSession()
      .then(setSessionId)
      .catch(() => setSessionId(null));
    requestAnimationFrame(draw);
  };

  return (
    <SectionShell id="game" cmd="surprise">
      <div
        ref={wrapperRef}
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          wrapperRef.current?.focus();
          if (status !== "playing") startGame();
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
            if (status !== "playing") startGame();
            return;
          }
          const next = DIRECTIONS[e.key];
          if (!next) return;
          e.preventDefault();
          if (status !== "playing") {
            startGame();
            return;
          }
          const g = gameRef.current;
          if (next.x === -g.dir.x && next.y === -g.dir.y) return;
          g.nextDir = next;
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
          const t = e.touches[0];
          touchStartRef.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
          wrapperRef.current?.focus();
          const start = touchStartRef.current;
          touchStartRef.current = null;
          if (status !== "playing") {
            startGame();
            return;
          }
          if (!start) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - start.x;
          const dy = t.clientY - start.y;
          const absDx = Math.abs(dx);
          const absDy = Math.abs(dy);
          if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return;

          const next: Point =
            absDx > absDy
              ? { x: dx > 0 ? 1 : -1, y: 0 }
              : { x: 0, y: dy > 0 ? 1 : -1 };
          const g = gameRef.current;
          if (next.x === -g.dir.x && next.y === -g.dir.y) return;
          g.nextDir = next;
        }}
        className="block w-140 max-w-full touch-none rounded-[10px] border border-(--line) bg-[linear-gradient(180deg,rgba(var(--glow-rgb),.05),rgba(var(--glow-rgb),.01))] p-4 outline-none"
      >
        <div className="mb-2.5 flex flex-wrap justify-between gap-2.5 text-[12px] text-(--dim)">
          <span>
            score: <span className="text-(--glow-bright)">{score}</span>
          </span>
          <span>
            arrow keys or swipe to move
            {status === "idle" && " · space to start"}
            {status === "over" && " · space to restart"}
          </span>
        </div>
        <canvas
          ref={canvasRef}
          width={SIZE_X}
          height={SIZE_Y}
          className="block h-auto max-w-full rounded-md"
        />
        <div className="mt-2.5 text-[12px] text-(--dim)">
          {status === "over"
            ? `game over — final score ${score}. click or tap here (or press space) to play again.`
            : status === "idle"
              ? "click or tap here, then press space, an arrow key, or swipe to start."
              : " "}
        </div>
        <Leaderboard score={score} gameOver={status === "over"} sessionId={sessionId} />
      </div>
    </SectionShell>
  );
});

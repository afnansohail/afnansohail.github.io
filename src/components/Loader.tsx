import { useLayoutEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, EASE_INOUT, prefersReducedMotion } from "@/lib/gsap";
import { content } from "@/content";

const SESSION_KEY = "portfolio-intro-seen";

export default function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);

  const [active] = useState(() => {
    if (typeof window === "undefined") return false;
    if (prefersReducedMotion()) return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });

  // Runs before paint so a skipped intro never flashes hidden content.
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!active) {
      document.body.classList.add("intro-skip");
      return;
    }
    window.sessionStorage.setItem(SESSION_KEY, "1");
    html.classList.add("lock-scroll");
    return () => html.classList.remove("lock-scroll");
  }, [active]);

  useGSAP(
    () => {
      if (!active || !rootRef.current) return;

      const logs = content.loader.logs;
      const counter = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () =>
          document.documentElement.classList.remove("lock-scroll"),
      });

      tl.set(wipeRef.current, { yPercent: 100 });

      tl.to(counter, {
        value: 100,
        duration: 3.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const n = Math.round(counter.value);
          if (countRef.current)
            countRef.current.textContent = String(n).padStart(3, "0");
          if (barRef.current) barRef.current.style.width = `${n}%`;
          if (logRef.current) {
            const idx = Math.min(
              logs.length - 1,
              Math.floor(n / (100 / logs.length)),
            );
            logRef.current.textContent = logs[idx];
          }
        },
      });

      tl.to(
        wipeRef.current,
        { yPercent: 0, duration: 0.6, ease: EASE_INOUT },
        "+=0.15",
      );
      tl.set(rootRef.current, { pointerEvents: "none" });
      tl.to(
        rootRef.current,
        { yPercent: -100, duration: 0.8, ease: EASE_INOUT },
        "+=0.05",
      );
      // fromTo (not from): these targets are CSS-forced to opacity:0 so they
      // never flash before this timeline runs, but that also means a plain
      // .from() would capture "opacity:0" as its own implicit end value and
      // no-op silently. Explicit end values sidestep that.
      tl.fromTo(
        "[data-reveal-init]",
        { y: 46, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.09, ease: "power3.out" },
        "-=0.45",
      );
    },
    { dependencies: [active] },
  );

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-bg"
      style={{ gap: 28 }}
    >
      <div
        className="font-mono uppercase text-secondary"
        style={{ fontSize: 13, letterSpacing: "0.28em" }}
      >
        {content.loader.label}
      </div>
      <div
        ref={countRef}
        className="font-display text-ink"
        style={{
          fontWeight: 800,
          fontSize: "clamp(80px,20vw,240px)",
          lineHeight: 0.9,
          letterSpacing: "-0.04em",
        }}
      >
        000
      </div>
      <div
        className="overflow-hidden bg-white/10"
        style={{ width: "min(78vw,520px)", height: 2 }}
      >
        <div
          ref={barRef}
          className="h-full bg-secondary"
          style={{ width: 0 }}
        />
      </div>
      <div
        ref={logRef}
        className="font-mono"
        style={{
          fontSize: 12,
          color: "oklch(0.6 0.01 250)",
          letterSpacing: "0.03em",
          height: 18,
        }}
      >
        &gt; booting…
      </div>
      <div
        ref={wipeRef}
        aria-hidden="true"
        className="absolute inset-0 bg-primary"
      />
    </div>
  );
}

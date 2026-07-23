import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, prefersFinePointer } from "@/lib/gsap";

const INTERACTIVE_SELECTOR =
  'a, button, [data-magnetic], [role="button"], input, textarea, select';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () => prefersFinePointer() && !prefersReducedMotion(),
  );

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.dataset.cursor = "custom";
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const rxTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ryTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    const handleMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };
    const grow = () =>
      gsap.to(ring, { scale: 1.9, duration: 0.3, ease: "power3.out" });
    const shrink = () =>
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power3.out" });

    window.addEventListener("pointermove", handleMove);

    const interactive = Array.from(
      document.querySelectorAll(INTERACTIVE_SELECTOR),
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      delete document.documentElement.dataset.cursor;
      window.removeEventListener("pointermove", handleMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-100">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full bg-primary mix-blend-difference will-change-transform"
        style={{ height: 12, width: 12 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-white/30 mix-blend-difference will-change-transform"
        style={{ height: 44, width: 44 }}
      />
    </div>
  );
}

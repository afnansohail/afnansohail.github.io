import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => !prefersReducedMotion());

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!enabled || !bar) return;

      gsap.set(bar, { scaleX: 0 });
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: "80px", end: "max", scrub: 0.3 },
      });
    },
    { dependencies: [enabled] },
  );

  return null;

  return (
    <div
      className="fixed inset-x-0 top-0 z-90"
      style={{ height: 2, background: "rgba(255,255,255,0.06)" }}
    >
      <div ref={barRef} className="h-full origin-left bg-primary" />
    </div>
  );
}

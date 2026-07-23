import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { content, options } from "@/content";
import DotField from "./DotField";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const section = sectionRef.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    const xTo = gsap.quickTo(spot, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(spot, "y", { duration: 0.6, ease: "power3" });

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex w-full flex-1 flex-col overflow-hidden"
    >
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full"
        style={{
          width: 640,
          height: 640,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-secondary) 32%, transparent), transparent 62%)",
          left: 0,
          top: 0,
          transform: "translate(-50%,-50%)",
          willChange: "transform",
          display: "none",
        }}
      />

      {options.showDotField && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block"
        >
          <DotField
            dotRadius={2.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            gradientFrom="rgba(7, 156, 242, 0.15)"
            gradientTo="rgba(7, 156, 242, 0.35)"
          />
        </div>
      )}

      <div
        className="relative mx-auto flex w-full flex-1 flex-col justify-center"
        style={{
          padding:
            "clamp(96px,12vw,140px) clamp(20px,5vw,64px) clamp(48px,6vw,72px)",
          maxWidth: 1400,
        }}
      >
        <div
          className="relative flex flex-col"
          style={{ gap: "clamp(20px,3vw,34px)", maxWidth: 900 }}
        >
          <div
            data-reveal-init
            className="font-mono uppercase text-secondary"
            style={{
              fontSize: "clamp(12px,1.4vw,14px)",
              letterSpacing: "0.22em",
            }}
          >
            {content.eyebrow}
          </div>

          <h1
            className="font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(52px,11vw,168px)",
              lineHeight: 0.88,
              letterSpacing: "-0.03em",
            }}
          >
            <span data-reveal-init className="inline">
              {content.name}
            </span>
          </h1>

          <p
            data-reveal-init
            style={{
              fontSize: "clamp(18px,2.2vw,26px)",
              lineHeight: 1.4,
              maxWidth: 640,
              color: "oklch(0.82 0.008 250)",
              textWrap: "pretty",
            }}
          >
            {content.intro.lead}
            <span className="text-primary" style={{ fontWeight: 600 }}>
              {content.intro.highlight}
            </span>
            {content.intro.tail}
          </p>

          <div
            data-reveal-init
            className="flex flex-col sm:flex-row sm:flex-wrap"
            style={{ gap: 14, marginTop: 8 }}
          >
            <a
              href="#work"
              data-magnetic
              className="flex w-full items-center justify-center rounded-full bg-secondary font-mono text-black transition-transform hover:scale-[1.03] sm:inline-flex sm:w-auto"
              style={{ fontSize: 15, fontWeight: 500, padding: "15px 28px" }}
            >
              Check out my work →
            </a>
            <a
              href="#contact"
              data-magnetic
              className="flex w-full items-center justify-center rounded-full border border-white font-mono text-ink transition-colors hover:border-primary hover:text-primary sm:inline-flex sm:w-auto"
              style={{ fontSize: 15, padding: "15px 28px" }}
            >
              Let's chat
            </a>
          </div>
        </div>

        <div
          data-reveal-init
          className="absolute hidden items-center gap-2.5 font-mono sm:flex"
          style={{
            bottom: "clamp(20px,4vw,40px)",
            right: "clamp(20px,5vw,64px)",
            fontSize: 12,
            letterSpacing: "0.1em",
            color: "oklch(0.55 0.01 250)",
          }}
        >
          <span>scroll</span>
          <span
            style={{
              display: "inline-block",
              width: 36,
              height: 1,
              background: "oklch(0.55 0.01 250)",
            }}
          />
        </div>
      </div>
    </section>
  );
}

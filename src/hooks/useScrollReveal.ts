import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Fades/slides in every `[data-reveal]` descendant as it scrolls into view.
 * Shared across sections so each one just marks its own elements, rather
 * than re-wiring the same ScrollTrigger logic per component.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const scopeRef = useRef<T>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      els.forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
    },
    { scope: scopeRef },
  );

  return scopeRef;
}

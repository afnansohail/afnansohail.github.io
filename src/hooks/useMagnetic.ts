import { useEffect } from "react";
import { gsap, prefersReducedMotion, prefersFinePointer } from "@/lib/gsap";

const STRENGTH = 0.4;

/**
 * Wires every `[data-magnetic]` element on the page, once. A single global
 * scan (rather than a hook-per-element) mirrors how the source design
 * choreographs this: any element can opt in just by carrying the attribute.
 */
export function useMagneticFields() {
  useEffect(() => {
    if (prefersReducedMotion() || !prefersFinePointer()) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]"),
    );

    const cleanups = els.map((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

      const move = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - (rect.left + rect.width / 2)) * STRENGTH);
        yTo((e.clientY - (rect.top + rect.height / 2)) * STRENGTH);
      };
      const reset = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}

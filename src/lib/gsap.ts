import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const EASE = "power3.out";
export const EASE_INOUT = "power3.inOut";
export const DURATION = 0.8;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const prefersFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

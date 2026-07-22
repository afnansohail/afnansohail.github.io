import type { Variants } from "motion/react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const DURATION = 0.8;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const viewport = { once: true, margin: "-80px 0px" };

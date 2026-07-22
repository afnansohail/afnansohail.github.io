import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer } from "../lib/motion";

export default function Hero() {
  return (
    <section
      className="relative mx-auto flex w-full flex-1 flex-col justify-center"
      style={{
        padding: "clamp(28px,5vw,56px) clamp(20px,5vw,64px)",
        maxWidth: 1280,
      }}
    >
      {/* code motif: dot-grid + oversized glyph (decorative) */}
      {options.showCodeMotif && (
        <div
          aria-hidden="true"
          className="dot-grid pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="select-none font-mono text-primary/8"
            style={{
              position: "absolute",
              right: "clamp(-40px,-2vw,-20px)",
              top: "50%",
              transform: "translateY(-50%)",
              fontWeight: 500,
              fontSize: "clamp(180px,30vw,420px)",
              lineHeight: 0.8,
            }}
          >
            &lt;/&gt;
          </div>
        </div>
      )}

      <motion.div
        className="relative flex flex-col"
        style={{ gap: "clamp(20px,3vw,34px)", maxWidth: 900 }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="font-mono uppercase text-secondary"
          style={{
            fontSize: "clamp(12px,1.4vw,14px)",
            letterSpacing: "0.22em",
          }}
        >
          {content.eyebrow}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(52px,11vw,132px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            textWrap: "balance",
          }}
        >
          {content.name}
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(18px,2.4vw,28px)",
            lineHeight: 1.4,
            maxWidth: 660,
            color: "oklch(0.82 0.008 250)",
            textWrap: "pretty",
          }}
        >
          {content.intro.lead}
          <span className="text-primary" style={{ fontWeight: 600 }}>
            {content.intro.highlight}
          </span>
          {content.intro.tail}
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap"
          style={{ gap: 14, marginTop: 8 }}
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-primary font-mono text-black transition-colors hover:text-black"
            style={{ fontSize: 15, fontWeight: 500, padding: "15px 28px" }}
          >
            Check out my work →
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-white/18 font-mono text-ink transition-colors hover:border-secondary hover:text-secondary"
            style={{ fontSize: 15, padding: "15px 28px" }}
          >
            Let's chat
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

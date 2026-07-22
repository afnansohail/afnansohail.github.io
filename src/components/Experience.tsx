import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, staggerContainer, viewport } from "../lib/motion";

export default function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto"
      style={{
        maxWidth: 1280,
        padding: "clamp(64px,9vw,128px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        className="flex items-baseline"
        style={{ gap: 20, marginBottom: "clamp(36px,5vw,64px)" }}
      >
        {options.sectionNumbers && (
          <span
            className="font-display text-secondary"
            style={{
              fontWeight: 800,
              fontSize: "clamp(40px,6vw,76px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            02
          </span>
        )}
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(30px,5vw,60px)",
            letterSpacing: "-0.02em",
          }}
        >
          The journey so far
        </h2>
      </div>

      <motion.div
        className="flex flex-col"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {content.roles.map((role, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="border-t border-white/9 transition-colors hover:bg-white/1.5"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(120px,180px) 1fr",
              gap: "clamp(16px,4vw,56px)",
              padding: "clamp(24px,3vw,36px) 0",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: 14,
                color: "oklch(0.62 0.01 250)",
                paddingTop: 6,
              }}
            >
              {role.years}
            </div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              <div
                className="flex flex-wrap items-baseline"
                style={{ gap: "8px 14px" }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "clamp(22px,2.8vw,32px)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {role.title}
                </h3>
                <span
                  className="text-primary"
                  style={{ fontSize: 17, fontWeight: 500 }}
                >
                  {role.company}
                </span>
              </div>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "oklch(0.78 0.008 250)",
                  maxWidth: 640,
                  textWrap: "pretty",
                }}
              >
                {role.impact}
              </p>
            </div>
          </motion.div>
        ))}
        <div className="border-t border-white/9" />
      </motion.div>
    </section>
  );
}

import { motion } from "motion/react";
import { content, options } from "../content";
import { fadeUp, viewport } from "../lib/motion";

export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/8 bg-panel-deep"
    >
      <div
        className="relative mx-auto flex flex-col"
        style={{
          maxWidth: 1280,
          padding: "clamp(64px,9vw,120px) clamp(20px,5vw,64px)",
          gap: "clamp(28px,4vw,44px)",
        }}
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex items-baseline"
          style={{ gap: 20 }}
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
              04
            </span>
          )}
          <h2
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "clamp(22px,4.2vw,56px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Let's build something awesome
          </h2>
        </motion.div>

        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          href={`mailto:${content.email}`}
          className="group relative w-fit font-display text-primary"
          style={{
            fontWeight: 700,
            fontSize: "clamp(22px,4vw,44px)",
            letterSpacing: "-0.02em",
          }}
        >
          {content.email}
          <span
            className="absolute right-0 left-0 origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
            style={{ bottom: -4, height: 2 }}
          />
        </motion.a>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex flex-wrap font-mono"
          style={{
            gap: "16px 28px",
            fontSize: 14,
            color: "oklch(0.70 0.01 250)",
            paddingTop: 8,
          }}
        >
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              className="group relative transition-colors hover:text-primary"
            >
              {s.label}
              <span
                className="absolute right-0 left-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ bottom: -3 }}
              />
            </a>
          ))}
        </motion.div>

        <div
          className="flex flex-wrap items-center justify-between border-t border-white/[0.07] font-mono"
          style={{
            gap: 12,
            marginTop: "clamp(24px,4vw,48px)",
            paddingTop: 24,
            fontSize: 12,
            color: "oklch(0.52 0.01 250)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {content.name}
          </span>
          <span>{content.footerTagline}</span>
        </div>
      </div>
    </footer>
  );
}

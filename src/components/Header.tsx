import { useState } from "react";
import { motion } from "motion/react";
import { content } from "../content";

const NAV_LINKS = [
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#contact", label: "say hi" },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/6 bg-bg/72 backdrop-blur-[10px]"
      style={{
        padding: "18px clamp(20px,5vw,64px)",
      }}
    >
      <div
        className="font-mono text-ink"
        style={{ fontSize: 14, letterSpacing: "0.04em" }}
      >
        <span className="text-primary">&lt;</span>
        {content.initials}
        <span className="text-primary">/&gt;</span>
      </div>

      <nav
        className="flex font-mono"
        style={{
          gap: "clamp(14px,2.5vw,32px)",
          fontSize: 13,
          letterSpacing: "0.02em",
          color: "oklch(0.66 0.01 250)",
        }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className="relative transition-colors hover:text-ink"
            onMouseEnter={() => setHoveredIndex(i)}
          >
            {link.label}
            {hoveredIndex === i && (
              <motion.span
                layoutId="nav-underline"
                className="absolute right-0 left-0 h-px bg-primary"
                style={{ bottom: -4 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </a>
        ))}
      </nav>

      <motion.a
        href="/docs/Afnan%20Sohail%20-%20Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full border border-primary font-mono text-primary transition-colors hover:bg-primary hover:text-black"
        style={{ fontSize: 13, padding: "8px 16px" }}
      >
        grab my résumé ↓
      </motion.a>
    </motion.header>
  );
}

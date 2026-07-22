import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { content } from "../content";
import { EASE } from "../lib/motion";

const NAV_LINKS = [
  { href: "#experience", label: "experience" },
  { href: "#work", label: "work" },
  { href: "#contact", label: "say hi" },
];

const RESUME_HREF = "/docs/Afnan%20Sohail%20-%20Resume.pdf";

export const HEADER_HEIGHT = 72;

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="sticky top-0 z-50 border-b border-white/6 bg-bg/72 backdrop-blur-[10px]"
    >
      <div
        className="flex items-center justify-between"
        style={{
          height: HEADER_HEIGHT,
          padding: "0 clamp(20px,5vw,64px)",
        }}
      >
        <a
          href="/"
          className="font-mono text-ink transition-colors hover:text-secondary"
          style={{ fontSize: 14, letterSpacing: "0.04em" }}
        >
          <span className="text-primary">&lt;</span>
          {content.initials}
          <span className="text-primary">/&gt;</span>
        </a>

        <nav
          className="hidden font-mono sm:flex"
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
                  transition={{ duration: 0.25, ease: EASE }}
                />
              )}
            </a>
          ))}
        </nav>

        <motion.a
          href={RESUME_HREF}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="hidden rounded-full border border-primary font-mono text-primary transition-colors hover:bg-primary hover:text-black sm:inline-flex"
          style={{ fontSize: 13, padding: "8px 16px" }}
        >
          grab my résumé
        </motion.a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="font-mono text-ink transition-colors hover:text-primary sm:hidden"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          {menuOpen ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute inset-x-0 top-full border-b border-white/6 bg-bg sm:hidden"
          >
            <nav
              className="flex flex-col font-mono"
              style={{
                padding: "20px clamp(20px,5vw,64px)",
                gap: 18,
                fontSize: 14,
                color: "oklch(0.66 0.01 250)",
              }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={RESUME_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="mt-1 inline-flex w-fit items-center rounded-full border border-primary font-mono text-primary transition-colors hover:bg-primary hover:text-black"
                style={{ fontSize: 13, padding: "8px 16px" }}
              >
                grab my résumé
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

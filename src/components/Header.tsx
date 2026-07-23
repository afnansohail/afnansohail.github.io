import { useState } from "react";
import { content } from "@/content";

const NAV_LINKS = [
  { href: "#experience", label: "experience" },
  { href: "#work", label: "work" },
  { href: "#contact", label: "say hi" },
];

const RESUME_HREF = "/docs/Afnan%20Sohail%20-%20Resume.pdf";

export const HEADER_HEIGHT = 72;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      data-reveal-init
      className="fixed inset-x-0 top-0 z-50"
      style={{ height: HEADER_HEIGHT }}
    >
      <div
        className="mix-blend-difference flex h-full items-center justify-between"
        style={{ padding: "0 clamp(20px,5vw,64px)" }}
      >
        <a
          href="/"
          data-magnetic
          className="font-mono text-white"
          style={{ fontSize: 14, letterSpacing: "0.04em" }}
        >
          <span className="text-primary">◆</span> {content.initials}
        </a>

        <nav
          className="hidden font-mono sm:flex"
          style={{
            gap: "clamp(14px,2.5vw,32px)",
            fontSize: 13,
            letterSpacing: "0.02em",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-magnetic
              className="inline-block text-white transition-opacity hover:opacity-70"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={RESUME_HREF}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="hidden rounded-full border border-white font-mono text-white sm:inline-flex"
          style={{ fontSize: 13, padding: "8px 16px" }}
        >
          grab my résumé
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="font-mono text-white sm:hidden"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          {menuOpen ? "[ close ]" : "[ menu ]"}
        </button>
      </div>

      <div
        className="absolute inset-x-0 top-full origin-top border-b border-white/6 bg-bg transition-transform duration-200 ease-out sm:hidden"
        style={{ transform: menuOpen ? "scaleY(1)" : "scaleY(0)" }}
      >
        <nav
          className="flex flex-col font-mono"
          style={{
            padding: "20px clamp(20px,5vw,64px)",
            gap: 18,
            fontSize: 14,
            color: "oklch(0.78 0.008 250)",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-1 inline-flex w-fit items-center rounded-full border border-primary font-mono text-primary"
            style={{ fontSize: 13, padding: "8px 16px" }}
          >
            grab my résumé
          </a>
        </nav>
      </div>
    </header>
  );
}

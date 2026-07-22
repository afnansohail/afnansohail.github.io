import { content } from "../content";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between border-b border-white/6 backdrop-blur-[10px]"
      style={{
        padding: "18px clamp(20px,5vw,64px)",
        background: "rgba(17,15,24,0.72)",
      }}
    >
      <div
        className="font-mono text-ink"
        style={{ fontSize: 14, letterSpacing: "0.04em" }}
      >
        <span className="text-primary">/</span> {content.initials}
      </div>

      <nav
        className="flex font-mono"
        style={{
          gap: "clamp(14px,2.5vw,32px)",
          fontSize: 13,
          letterSpacing: "0.02em",
          color: "oklch(0.66 0.01 250)",
        }}
      >
        <a href="#work" className="transition-colors hover:text-ink">
          work
        </a>
        <a href="#experience" className="transition-colors hover:text-ink">
          experience
        </a>
        <a href="#contact" className="transition-colors hover:text-ink">
          contact
        </a>
      </nav>

      <a
        href="#"
        className="rounded-full border border-primary font-mono text-primary transition-all hover:bg-primary hover:text-white"
        style={{ fontSize: 13, padding: "8px 16px" }}
      >
        résumé ↓
      </a>
    </header>
  );
}

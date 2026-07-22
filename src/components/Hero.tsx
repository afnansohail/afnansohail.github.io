import { content, options } from "../content";

export default function Hero() {
  return (
    <section
      className="relative mx-auto"
      style={{
        padding:
          "clamp(56px,10vw,120px) clamp(20px,5vw,64px) clamp(64px,9vw,120px)",
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
            className="select-none font-mono"
            style={{
              position: "absolute",
              right: "clamp(-40px,-2vw,-20px)",
              top: "50%",
              transform: "translateY(-50%)",
              fontWeight: 500,
              fontSize: "clamp(180px,30vw,420px)",
              lineHeight: 0.8,
              color: "rgba(165,64,255,0.08)",
            }}
          >
            &lt;/&gt;
          </div>
        </div>
      )}

      <div
        className="relative flex flex-col"
        style={{ gap: "clamp(20px,3vw,34px)", maxWidth: 900 }}
      >
        <div
          className="font-mono uppercase text-secondary"
          style={{
            fontSize: "clamp(12px,1.4vw,14px)",
            letterSpacing: "0.22em",
          }}
        >
          {content.eyebrow}
        </div>

        <h1
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
        </h1>

        <p
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
        </p>

        <div className="flex flex-wrap" style={{ gap: 14, marginTop: 8 }}>
          <a
            href="#work"
            className="rounded-full bg-primary font-mono text-black transition-transform hover:-translate-y-0.5 hover:text-black"
            style={{ fontSize: 15, fontWeight: 500, padding: "15px 28px" }}
          >
            View the work →
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/18 font-mono text-ink transition-all hover:border-secondary hover:text-secondary"
            style={{ fontSize: 15, padding: "15px 28px" }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

import { content, options } from "@/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SplitText from "./react-bits/SplitText";

export default function Contact() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/8 bg-panel-deep"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "120%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--color-secondary) 26%, transparent), transparent 60%)",
        }}
      />

      <div
        className="relative mx-auto flex flex-col"
        style={{
          maxWidth: 1400,
          padding: "clamp(72px,10vw,140px) clamp(20px,5vw,64px)",
          gap: "clamp(28px,4vw,48px)",
        }}
      >
        <div data-reveal className="relative">
          {options.sectionNumbers && (
            <span
              className="font-mono text-primary absolute -top-10 left-0"
              style={{ fontSize: "clamp(13px,1.4vw,15px)" }}
            >
              ({content.sections.contact.number})
            </span>
          )}
        </div>

        <h2
          data-reveal
          className="font-display"
          style={{
            fontWeight: 800,
            fontSize: "clamp(44px,10vw,150px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            textWrap: "balance",
          }}
        >
          <SplitText
            text="Let's build something."
            tag="span"
            className="inline-block"
            splitType="words"
            textAlign="left"
          />
        </h2>

        <a
          data-reveal
          data-magnetic
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
        </a>

        <div
          data-reveal
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
              rel="noopener noreferrer"
              data-magnetic
              className="group relative inline-block transition-colors hover:text-secondary"
            >
              {s.label}
              <span
                className="absolute right-0 left-0 h-px origin-left scale-x-0 bg-secondary transition-transform duration-300 ease-out group-hover:scale-x-100"
                style={{ bottom: -3 }}
              />
            </a>
          ))}
        </div>

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

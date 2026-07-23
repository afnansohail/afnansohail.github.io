import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { content, options } from "@/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SplitText from "./react-bits/SplitText";

export default function Experience() {
  const sectionRef = useScrollReveal<HTMLElement>();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const bars = gsap.utils.toArray<HTMLElement>("[data-rowbar]");
      bars.forEach((bar) => {
        gsap.to(bar, {
          width: "100%",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 92%" },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="mx-auto"
      style={{
        maxWidth: 1400,
        padding: "clamp(72px,10vw,140px) clamp(20px,5vw,64px)",
      }}
    >
      <div
        data-reveal
        className="relative"
        style={{ marginBottom: "clamp(40px,5vw,72px)" }}
      >
        {options.sectionNumbers && (
          <span
            className="font-mono text-primary absolute -top-6 left-0"
            style={{ fontSize: "clamp(13px,1.4vw,15px)" }}
          >
            ({content.sections.experience.number})
          </span>
        )}
        <h2
          className="font-display"
          style={{
            fontWeight: 700,
            fontSize: "clamp(32px,5.5vw,68px)",
            letterSpacing: "-0.02em",
          }}
        >
          <SplitText
            text={content.sections.experience.heading}
            tag="span"
            className="inline-block"
            splitType="words"
            textAlign="left"
          />
        </h2>
      </div>

      <div className="flex flex-col">
        {content.roles.map((role, i) => (
          <div
            key={i}
            data-reveal
            data-row
            className="relative grid grid-cols-1 border-t border-white/9 transition-[padding-left] duration-300 ease-out hover:pl-4 sm:grid-cols-[minmax(110px,170px)_1fr]"
            style={{
              gap: "clamp(16px,4vw,56px)",
              padding: "clamp(24px,3vw,40px) 0",
            }}
          >
            <div
              data-rowbar
              aria-hidden="true"
              className="absolute -top-px left-0 bg-secondary"
              style={{ height: 1, width: 0 }}
            />
            <div
              className="font-mono sm:pt-1.5"
              style={{ fontSize: 14, color: "oklch(0.62 0.01 250)" }}
            >
              {role.years}
            </div>
            <div className="flex flex-col" style={{ gap: 12 }}>
              <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3.5 sm:gap-y-2">
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
          </div>
        ))}
        <div className="border-t border-white/9" />
      </div>
    </section>
  );
}

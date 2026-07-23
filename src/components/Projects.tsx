import { content, options } from "@/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SplitText from "./react-bits/SplitText";
import SpotlightCard from "./react-bits/SpotlightCard";

export default function Projects() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section
      id="work"
      ref={sectionRef}
      className="mx-auto"
      style={{
        maxWidth: 1400,
        padding: "0 clamp(20px,5vw,64px) clamp(72px,10vw,140px)",
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
            ({content.sections.projects.number})
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
            text={content.sections.projects.heading}
            tag="span"
            className="inline-block"
            splitType="words"
            textAlign="left"
          />
        </h2>
      </div>

      <div className="flex flex-col">
        {content.projects.map((p) => {
          const Wrapper = p.link ? "a" : "div";
          return (
            <Wrapper
              key={p.no}
              data-reveal
              className="group block border-t border-white/9"
              {...(p.link
                ? { href: p.link, target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <SpotlightCard className="rounded-none! border-0! bg-transparent! p-0!\">
                <div
                  className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] sm:items-center"
                  style={{
                    gap: "clamp(20px,5vw,64px)",
                    padding: "clamp(32px,5vw,64px) 0",
                  }}
                >
                  <div
                    className="stroke-number font-display hidden sm:block"
                    style={{
                      fontWeight: 800,
                      fontSize: "clamp(56px,10vw,150px)",
                      lineHeight: 0.8,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {p.no}
                  </div>

                  <div
                    className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between w-full"
                    style={{ gap: "clamp(16px,3vw,40px)" }}
                  >
                    <div className="w-full sm:hidden overflow-hidden rounded-[14px] border border-white/12 opacity-55 transition-all duration-300 ease-out group-hover:opacity-100">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                          style={{ transformOrigin: "center" }}
                        />
                      ) : (
                        <div className="stripes relative flex h-full items-end p-3">
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              color: "oklch(0.55 0.01 250)",
                            }}
                          >
                            [ {p.name} shot ]
                          </span>
                        </div>
                      )}
                    </div>

                    <div
                      className="flex flex-col w-full"
                      style={{ gap: 14, maxWidth: 640 }}
                    >
                      <div
                        className="flex flex-wrap items-baseline"
                        style={{ gap: 14 }}
                      >
                        <h3
                          className="font-display"
                          style={{
                            fontWeight: 700,
                            fontSize: "clamp(26px,3.6vw,48px)",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {p.name}
                        </h3>
                      </div>
                      <p
                        style={{
                          fontSize: 16,
                          lineHeight: 1.55,
                          color: "oklch(0.78 0.008 250)",
                          textWrap: "pretty",
                        }}
                      >
                        {p.desc}
                      </p>
                      <div
                        className="flex flex-wrap"
                        style={{ gap: 8, marginTop: 2 }}
                      >
                        {p.stack.map((t, i) => (
                          <span
                            key={i}
                            className="font-mono"
                            style={{
                              fontSize: 12,
                              color: "oklch(0.82 0.008 250)",
                              padding: "5px 12px",
                              borderRadius: 999,
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {p.link && (
                        <div
                          className="font-mono text-secondary"
                          style={{ fontSize: 13, marginTop: 4 }}
                        >
                          ↗ live demo
                        </div>
                      )}
                    </div>

                    <div
                      className="shrink-0 overflow-hidden rounded-[14px] border border-white/12 opacity-55 transition-all duration-300 ease-out group-hover:opacity-100 hidden sm:block"
                      style={{
                        width: "clamp(180px,22vw,300px)",
                        aspectRatio: "4 / 3",
                      }}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                          style={{ transformOrigin: "center" }}
                        />
                      ) : (
                        <div className="stripes relative flex h-full items-end p-3">
                          <span
                            className="font-mono"
                            style={{
                              fontSize: 11,
                              letterSpacing: "0.1em",
                              color: "oklch(0.55 0.01 250)",
                            }}
                          >
                            [ {p.name} shot ]
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </Wrapper>
          );
        })}
        <div className="border-t border-white/9" />
      </div>

      <p
        className="font-mono"
        style={{
          marginTop: "clamp(20px,3vw,32px)",
          fontSize: 13,
          color: "oklch(0.55 0.01 250)",
        }}
      >
        {content.projectsPrivacyNote}
      </p>
    </section>
  );
}

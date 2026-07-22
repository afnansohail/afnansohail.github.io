import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { content } from "../content";

interface Tooltip {
  label: string;
  left: number;
  top: number;
}

export default function Skills() {
  const [paused, setPaused] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);
  const [loopDistance, setLoopDistance] = useState<number | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLDivElement>(null);
  const loopIconRef = useRef<HTMLDivElement>(null);

  const track = [...content.skills, ...content.skills];
  const loopIndex = content.skills.length;

  // Flex `gap` on a viewport-relative clamp() can round to fractional pixels
  // slightly differently across the duplicated half; a bare -50% then lands a
  // hair off from the real duplicate, reading as a jerk each time the loop
  // resets. Measuring the actual on-screen distance keeps the reset seamless.
  useLayoutEffect(() => {
    const measure = () => {
      const start = firstIconRef.current;
      const loop = loopIconRef.current;
      if (!start || !loop) return;
      setLoopDistance(
        loop.getBoundingClientRect().left - start.getBoundingClientRect().left,
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const handleEnter = (e: MouseEvent<HTMLDivElement>, label: string) => {
    const rowRect = rowRef.current?.getBoundingClientRect();
    const iconRect = e.currentTarget.getBoundingClientRect();
    if (!rowRect) return;
    setPaused(true);
    setTooltip({
      label,
      left: iconRect.left - rowRect.left + iconRect.width / 2,
      top: iconRect.bottom - rowRect.top + 10,
    });
  };

  const handleLeave = () => {
    setPaused(false);
    setTooltip(null);
  };

  return (
    <section
      className="bg-panel"
      style={{ borderBlock: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div
        ref={rowRef}
        className="relative mx-auto flex flex-wrap items-center"
        style={{
          maxWidth: 1280,
          padding: "24px clamp(20px,5vw,64px)",
          gap: "clamp(16px,3vw,44px)",
        }}
      >
        <span
          className="whitespace-nowrap font-mono uppercase"
          style={{
            fontSize: 12,
            letterSpacing: "0.18em",
            color: "oklch(0.60 0.01 250)",
          }}
        >
          My toolbox ·
        </span>

        <div
          className="relative flex-1 overflow-hidden"
          style={{
            minWidth: 0,
            padding: "4px 0",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          }}
        >
          <div
            className="flex w-max items-center"
            style={
              {
                gap: "clamp(28px,4vw,56px)",
                animation: "marquee 30s linear infinite",
                animationPlayState: paused ? "paused" : "running",
                willChange: "transform",
                "--marquee-distance":
                  loopDistance != null ? `-${loopDistance}px` : undefined,
              } as CSSProperties
            }
          >
            {track.map((skill, i) => (
              <div
                key={`${skill.slug}-${i}`}
                ref={
                  i === 0
                    ? firstIconRef
                    : i === loopIndex
                      ? loopIconRef
                      : undefined
                }
                className="flex items-center justify-center"
                onMouseEnter={(e) => handleEnter(e, skill.label)}
                onMouseLeave={handleLeave}
              >
                <span
                  role="img"
                  aria-label={skill.label}
                  className="inline-block bg-current text-primary opacity-90 transition-transform duration-150 hover:scale-110 hover:opacity-100"
                  style={{
                    height: 30,
                    width: 30,
                    WebkitMaskImage: `url(https://cdn.simpleicons.org/${skill.slug})`,
                    maskImage: `url(https://cdn.simpleicons.org/${skill.slug})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {tooltip && (
          <span
            className="pointer-events-none absolute whitespace-nowrap font-mono uppercase"
            style={{
              left: tooltip.left,
              top: tooltip.top,
              transform: "translateX(-50%)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "white",
              background: "var(--color-panel-deep)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "3px 8px",
              borderRadius: 5,
            }}
          >
            {tooltip.label}
          </span>
        )}
      </div>
    </section>
  );
}

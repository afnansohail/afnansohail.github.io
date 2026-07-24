import { content } from "@/content";

interface BootScreenProps {
  lineIdx: number;
  progress: number;
}

export default function BootScreen({ lineIdx, progress }: BootScreenProps) {
  return (
    <div
      className="p-4 sm:p-6"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div
          className="text-[9.5px] sm:text-xs tracking-[.14em] sm:tracking-[.35em]"
          style={{
            color: "var(--dim)",
            marginBottom: 18,
          }}
        >
          AFNAN&nbsp;SOHAIL &nbsp;//&nbsp; PERSONAL OS &nbsp; v6.7.0
        </div>
        <div
          className="text-[10.5px] sm:text-[13.5px] leading-[1.6] sm:leading-[1.9]"
          style={{ minHeight: 210 }}
        >
          {content.bootLines.slice(0, lineIdx).map((line, i) => (
            <div key={i} style={{ whiteSpace: "pre-wrap", color: "#c9cce0" }}>
              {line}
            </div>
          ))}
          <span
            style={{
              display: "inline-block",
              width: 9,
              height: 16,
              background: "var(--glow)",
              boxShadow: "0 0 10px var(--glow)",
              animation: "tpBlink 1s step-end infinite",
              verticalAlign: "-2px",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              flex: 1,
              height: 6,
              border: "1px solid var(--line)",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg,var(--glow-dim),var(--glow-bright))",
                boxShadow: "0 0 12px var(--glow)",
                transition: "width .18s ease",
              }}
            />
          </div>
          <div
            style={{
              width: 54,
              textAlign: "right",
              color: "var(--glow-bright)",
              fontWeight: 500,
            }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

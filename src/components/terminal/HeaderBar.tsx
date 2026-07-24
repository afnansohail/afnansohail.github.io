import { memo } from "react";
import { content } from "@/content";
import * as sound from "@/lib/sound";
import { THEMES, type ThemeKey } from "./themes";
import ResumeLink from "./ResumeLink";

interface HeaderBarProps {
  theme: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
  muted: boolean;
  onToggleMuted: () => void;
}

export default memo(function HeaderBar({
  theme,
  onThemeChange,
  muted,
  onToggleMuted,
}: HeaderBarProps) {
  return (
    <div
      className="flex-wrap"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 4px 12px",
      }}
    >
      <div className="hidden md:flex" style={{ gap: 7 }}>
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#4a4d5e",
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "#4a4d5e",
          }}
        />
        <span
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "var(--glow)",
            boxShadow: "0 0 8px var(--glow)",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: "var(--dim)",
          letterSpacing: ".04em",
        }}
      >
        {content.sessionLabel}
      </div>
      <div
        className="flex flex-wrap items-center w-full md:w-auto md:ml-auto"
        style={{ gap: 14, justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              fontSize: 10,
              letterSpacing: ".2em",
              color: "var(--dim)",
            }}
          >
            THEME
          </span>
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
            <button
              key={key}
              type="button"
              title={key}
              onClick={(e) => {
                e.stopPropagation();
                onThemeChange(key);
                sound.blip();
              }}
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                padding: 0,
                background: THEMES[key].glow,
                border: `2px solid ${theme === key ? "#fff" : "transparent"}`,
                boxShadow: `0 0 8px ${THEMES[key].glow}`,
                transition: "all .16s",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            title={muted ? "unmute sound" : "mute sound"}
            onClick={(e) => {
              e.stopPropagation();
              onToggleMuted();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 22,
              height: 22,
              padding: 0,
              background: "transparent",
              border: "none",
              color: muted ? "var(--dim)" : "var(--glow-bright)",
              fontSize: 13,
            }}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <ResumeLink
            label="grab my résumé ↗"
            stopPropagation
            style={{
              fontSize: 12,
              background: "transparent",
              borderRadius: 20,
              padding: "6px 14px",
            }}
          />
        </div>
        <span
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: 7,
            fontSize: 11.5,
            letterSpacing: ".14em",
            color: "var(--glow-bright)",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "tpBar 2s ease-in-out infinite",
            }}
          />
          ONLINE
        </span>
      </div>
    </div>
  );
});

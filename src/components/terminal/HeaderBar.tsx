import { memo } from "react";
import { content } from "@/content";
import { type ThemeKey } from "./themes";
import ResumeLink from "./ResumeLink";
import SettingsMenu from "./SettingsMenu";

interface HeaderBarProps {
  theme: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
  muted: boolean;
  onToggleMuted: () => void;
  lowPower: boolean;
  lowPowerForced: boolean;
  onToggleLowPower: () => void;
}

export default memo(function HeaderBar({
  theme,
  onThemeChange,
  muted,
  onToggleMuted,
  lowPower,
  lowPowerForced,
  onToggleLowPower,
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
        className="w-full text-center md:w-auto md:text-left"
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
        <div
          className="order-2 md:order-1"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
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
          <SettingsMenu
            theme={theme}
            onThemeChange={onThemeChange}
            muted={muted}
            onToggleMuted={onToggleMuted}
            lowPower={lowPower}
            lowPowerForced={lowPowerForced}
            onToggleLowPower={onToggleLowPower}
          />
        </div>
        <span
          className="flex order-1 md:order-2"
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

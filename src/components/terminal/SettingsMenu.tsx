import { memo, useEffect, useRef, useState, type CSSProperties } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import * as sound from "@/lib/sound";
import { THEMES, type ThemeKey } from "./themes";

interface SettingsMenuProps {
  theme: ThemeKey;
  onThemeChange: (key: ThemeKey) => void;
  muted: boolean;
  onToggleMuted: () => void;
  lowPower: boolean;
  lowPowerForced: boolean;
  onToggleLowPower: () => void;
}

function GearIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function SoundIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </>
      )}
    </svg>
  );
}

function Switch({
  on,
  disabled,
  onClick,
}: {
  on: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        position: "relative",
        width: 30,
        height: 16,
        padding: 0,
        border: "1px solid var(--line)",
        borderRadius: 999,
        background: on ? "rgba(var(--glow-rgb),.28)" : "rgba(255,255,255,.04)",
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "default" : "pointer",
        transition: "background .16s",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 1,
          left: on ? 15 : 1,
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: on ? "var(--glow-bright)" : "#4a4d5e",
          boxShadow: on ? "0 0 6px var(--glow)" : "none",
          transition: "left .16s",
        }}
      />
    </button>
  );
}

export default memo(function SettingsMenu({
  theme,
  onThemeChange,
  muted,
  onToggleMuted,
  lowPower,
  lowPowerForced,
  onToggleLowPower,
}: SettingsMenuProps) {
  const [open, setOpen] = useState(false);
  const [spinTick, setSpinTick] = useState(0);
  const [mobileMenuPos, setMobileMenuPos] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open || isDesktop) return;

    const reposition = () => {
      if (!rootRef.current) return;
      const anchor = rootRef.current.getBoundingClientRect();
      const width = Math.min(240, window.innerWidth - 16);
      const left = Math.min(
        Math.max(anchor.right - width, 8),
        window.innerWidth - width - 8,
      );

      setMobileMenuPos({
        left,
        top: anchor.bottom + 8,
        width,
      });
    };

    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, isDesktop]);

  const rowLabelStyle: CSSProperties = {
    fontSize: 10,
    letterSpacing: ".16em",
    color: "var(--dim)",
  };

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        type="button"
        title="settings"
        onClick={(e) => {
          e.stopPropagation();
          setSpinTick((v) => v + 1);
          setOpen((v) => !v);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          padding: 0,
          background: open ? "rgba(var(--glow-rgb),.12)" : "transparent",
          border: "none",
          borderRadius: 6,
          color: "var(--glow-bright)",
        }}
      >
        <span
          key={spinTick}
          style={{
            display: "flex",
            animation: "tpGearSpin .28s cubic-bezier(.22,.9,.24,1)",
          }}
        >
          <GearIcon />
        </span>
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: isDesktop ? "absolute" : "fixed",
            top: isDesktop ? "calc(100% + 8px)" : (mobileMenuPos?.top ?? 44),
            right: isDesktop ? 0 : "auto",
            left: isDesktop ? "auto" : (mobileMenuPos?.left ?? 8),
            zIndex: 60,
            width: isDesktop ? 210 : (mobileMenuPos?.width ?? 210),
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "12px 14px",
            border: "1px solid var(--line)",
            borderRadius: 9,
            background: "rgba(16,17,27,.94)",
            backdropFilter: lowPower ? "none" : "blur(8px)",
            boxShadow: "0 12px 30px rgba(0,0,0,.45)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={rowLabelStyle}>THEME</span>
            <div style={{ display: "flex", gap: 8 }}>
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
                    width: 16,
                    height: 16,
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
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12,
                color: "#dcdcec",
              }}
            >
              <span
                style={{
                  color: muted ? "var(--dim)" : "var(--glow-bright)",
                  display: "flex",
                }}
              >
                <SoundIcon muted={muted} />
              </span>
              sound
            </span>
            <Switch on={!muted} onClick={onToggleMuted} />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 12, color: "#dcdcec" }}>
              low power mode
            </span>
            <Switch
              on={lowPower || lowPowerForced}
              disabled={lowPowerForced}
              onClick={onToggleLowPower}
            />
          </div>
        </div>
      )}
    </div>
  );
});

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
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
      className={`relative flex h-4 w-7.5 shrink-0 rounded-full border border-(--line) p-0 transition-colors ${
        on ? "bg-[rgba(var(--glow-rgb),.28)]" : "bg-[rgba(255,255,255,.04)]"
      } ${disabled ? "cursor-default opacity-50" : "cursor-pointer"}`}
    >
      <span
        className={`absolute left-px top-px size-3 rounded-full transition-[transform,background-color,box-shadow] duration-150 ${
          on
            ? "translate-x-3.5 bg-(--glow-bright) shadow-[0_0_6px_var(--glow)]"
            : "translate-x-0 bg-[#4a4d5e]"
        }`}
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

  const getMobileMenuPos = () => {
    if (!rootRef.current) return null;
    const anchor = rootRef.current.getBoundingClientRect();
    const width = Math.min(240, window.innerWidth - 16);
    const left = Math.min(
      Math.max(anchor.right - width, 8),
      window.innerWidth - width - 8,
    );
    return {
      left,
      top: anchor.bottom + 8,
      width,
    };
  };

  useEffect(() => {
    if (!open) return;
    const onDocPointerDown = (e: Event) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    const supportsPointerEvents = "PointerEvent" in window;
    if (supportsPointerEvents) {
      document.addEventListener("pointerdown", onDocPointerDown);
    } else {
      document.addEventListener("mousedown", onDocPointerDown);
      document.addEventListener("touchstart", onDocPointerDown);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      if (supportsPointerEvents) {
        document.removeEventListener("pointerdown", onDocPointerDown);
      } else {
        document.removeEventListener("mousedown", onDocPointerDown);
        document.removeEventListener("touchstart", onDocPointerDown);
      }
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open || isDesktop) return;

    const reposition = () => {
      const nextPos = getMobileMenuPos();
      if (nextPos) setMobileMenuPos(nextPos);
    };

    reposition();
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open, isDesktop]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        title="settings"
        onClick={(e) => {
          e.stopPropagation();
          setSpinTick((v) => v + 1);
          setOpen((v) => {
            const nextOpen = !v;
            if (nextOpen && !isDesktop) {
              const nextPos = getMobileMenuPos();
              if (nextPos) setMobileMenuPos(nextPos);
            }
            return nextOpen;
          });
        }}
        className={`flex size-5.5 items-center justify-center rounded-md border-0 p-0 text-(--glow-bright) ${
          open ? "bg-[rgba(var(--glow-rgb),.12)]" : "bg-transparent"
        }`}
      >
        <span
          key={spinTick}
          className="flex animate-[tpGearSpin_.28s_cubic-bezier(.22,.9,.24,1)]"
        >
          <GearIcon />
        </span>
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`z-60 flex flex-col gap-3 rounded-[9px] border border-(--line) bg-[rgba(16,17,27,.94)] px-3.5 py-3 shadow-[0_12px_30px_rgba(0,0,0,.45)] ${
            lowPower ? "backdrop-blur-0" : "backdrop-blur-sm"
          } ${isDesktop ? "absolute right-0 top-[calc(100%+8px)] w-52.5" : "fixed"}`}
          style={{
            backdropFilter: lowPower ? "none" : "blur(4px)",
            WebkitBackdropFilter: lowPower ? "none" : "blur(4px)",
            ...(isDesktop
              ? undefined
              : {
                  top: mobileMenuPos?.top ?? 44,
                  left: mobileMenuPos?.left ?? 8,
                  width: mobileMenuPos?.width ?? 210,
                }),
          }}
        >
          <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[.16em] text-(--dim)">
              THEME
            </span>
            <div className="flex gap-2">
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
                  className="size-4 rounded-full border-2 p-0 transition-all"
                  style={{
                    background: THEMES[key].glow,
                    borderColor: theme === key ? "#fff" : "transparent",
                    boxShadow: `0 0 8px ${THEMES[key].glow}`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="flex items-center gap-1.75 text-[12px] text-[#dcdcec]">
              <span
                className={`flex ${muted ? "text-(--dim)" : "text-(--glow-bright)"}`}
              >
                <SoundIcon muted={muted} />
              </span>
              sound
            </span>
            <Switch on={!muted} onClick={onToggleMuted} />
          </div>

          <div className="flex items-center justify-between gap-2.5">
            <span className="text-[12px] text-[#dcdcec]">low power mode</span>
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

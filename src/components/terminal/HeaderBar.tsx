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
    <div className="flex flex-wrap items-center gap-3 px-1 pt-3.5 pb-3">
      <div className="hidden gap-1.75 md:flex">
        <span className="size-2.75 rounded-full bg-[#4a4d5e]" />
        <span className="size-2.75 rounded-full bg-[#4a4d5e]" />
        <span className="size-2.75 rounded-full bg-(--glow) shadow-[0_0_8px_var(--glow)]" />
      </div>
      <div className="w-full text-center text-[12.5px] tracking-[.04em] text-(--dim) md:w-auto md:text-left">
        {content.sessionLabel}
      </div>
      <div className="flex w-full flex-wrap items-center justify-between gap-3.5 md:w-auto md:ml-auto">
        <div className="order-2 flex items-center gap-2.5 md:order-1">
          <ResumeLink
            label="grab my résumé ↗"
            stopPropagation
            className="rounded-2xl bg-transparent px-3.5 py-1.5 text-[12px]"
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
        <span className="order-1 flex items-center gap-1.75 text-[11.5px] tracking-[.14em] text-(--glow-bright) md:order-2">
          <span className="size-1.75 rounded-full bg-(--accent) shadow-[0_0_8px_var(--accent)] animate-[tpBar_2s_ease-in-out_infinite]" />
          ONLINE
        </span>
      </div>
    </div>
  );
});

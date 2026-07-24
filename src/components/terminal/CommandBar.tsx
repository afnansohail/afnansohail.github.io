import { memo } from "react";
import { content } from "@/content";
import * as sound from "@/lib/sound";

interface CommandBarProps {
  onRunCommand: (cmd: string) => void;
  lowPower?: boolean;
}

export default memo(function CommandBar({
  onRunCommand,
  lowPower = false,
}: CommandBarProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center md:justify-start gap-2.25 border border-(--line) rounded-[9px] px-3 py-2.75 bg-[linear-gradient(180deg,rgba(7,8,12,.54)_0%,rgba(6,7,10,.62)_100%),linear-gradient(180deg,rgba(var(--glow-rgb),.13)_0%,rgba(var(--glow-rgb),.08)_100%)] ${
        lowPower ? "backdrop-blur-0" : "backdrop-blur-[6px]"
      }`}
    >
      <span className="hidden md:inline mr-0.5 text-[11px] tracking-[.2em] text-(--dim)">
        CMD ›
      </span>
      {content.menuCommands.map((cmd) => (
        <button
          key={cmd}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            sound.blip();
            onRunCommand(cmd);
          }}
          className="tp-cmd rounded-md border border-(--line) bg-[rgba(var(--glow-rgb),.06)] px-1.5 py-1.25 md:px-2.75 md:py-1.5 font-(--mono) text-[9.5px] text-[#dcdcec] md:text-[12.5px]"
        >
          <span className="text-(--glow-bright)">{cmd}</span>
        </button>
      ))}
    </div>
  );
});

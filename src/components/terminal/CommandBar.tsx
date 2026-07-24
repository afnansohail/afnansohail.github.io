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
      className="flex flex-wrap justify-center md:justify-start"
      style={{
        alignItems: "center",
        gap: 9,
        padding: "11px 12px",
        border: "1px solid var(--line)",
        borderRadius: 9,
        background:
          "linear-gradient(180deg, rgba(7,8,12,.54) 0%, rgba(6,7,10,.62) 100%), linear-gradient(180deg, rgba(var(--glow-rgb),.13) 0%, rgba(var(--glow-rgb),.08) 100%)",
        backdropFilter: lowPower ? "none" : "blur(6px)",
      }}
    >
      <span
        className="hidden md:inline"
        style={{
          fontSize: 11,
          letterSpacing: ".2em",
          color: "var(--dim)",
          marginRight: 2,
        }}
      >
        CMD ›
      </span>
      {content.menuCommands.map((cmd) => (
        <button
          key={cmd}
          type="button"
          className="tp-cmd text-[9.5px] md:text-[12.5px]"
          onClick={(e) => {
            e.stopPropagation();
            sound.blip();
            onRunCommand(cmd);
          }}
          style={{
            fontFamily: "var(--mono)",
            background: "rgba(var(--glow-rgb),.06)",
            color: "#dcdcec",
            border: "1px solid var(--line)",
            borderRadius: 6,
            padding: "6px 11px",
          }}
        >
          <span style={{ color: "var(--glow-bright)" }}>{cmd}</span>
        </button>
      ))}
    </div>
  );
});

import { memo } from "react";
import { content } from "@/content";
import * as sound from "@/lib/sound";

interface CommandBarProps {
  onRunCommand: (cmd: string) => void;
}

export default memo(function CommandBar({ onRunCommand }: CommandBarProps) {
  return (
    <div
      className="flex flex-wrap justify-center md:justify-start"
      style={{
        alignItems: "center",
        gap: 9,
        padding: "11px 12px",
        border: "1px solid var(--line)",
        borderRadius: 9,
        background: "rgba(20,22,34,.72)",
        backdropFilter: "blur(6px)",
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
          className="tp-cmd"
          onClick={(e) => {
            e.stopPropagation();
            sound.blip();
            onRunCommand(cmd);
          }}
          style={{
            fontFamily: "var(--mono)",
            fontSize: 12.5,
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

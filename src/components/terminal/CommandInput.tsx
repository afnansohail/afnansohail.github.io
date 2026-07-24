import { useEffect, useRef, useState, type RefObject } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { ALIASES } from "./commands";

const SUGGESTION_DELAY_MS = 350;
const SUGGESTION_CANDIDATES = [
  ...Object.keys(ALIASES),
  "clear",
  "cls",
  "reset",
];

function findSuggestion(value: string): string | null {
  if (!value || /\s/.test(value)) return null;
  const lower = value.toLowerCase();
  return (
    SUGGESTION_CANDIDATES.find((c) => c !== lower && c.startsWith(lower)) ??
    null
  );
}

interface CommandInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  msg: string;
  msgColor: string;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function CommandInput({
  input,
  onInputChange,
  onSubmit,
  msg,
  msgColor,
  inputRef,
}: CommandInputProps) {
  const isDesktop = useIsDesktop();
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setSuggestion(null);
    window.clearTimeout(debounceRef.current);

    const match = findSuggestion(input);
    if (!match) return;

    debounceRef.current = window.setTimeout(() => {
      setSuggestion(match);
    }, SUGGESTION_DELAY_MS);

    return () => window.clearTimeout(debounceRef.current);
  }, [input]);

  const acceptSuggestion = () => {
    if (!suggestion) return;
    onInputChange(suggestion);
    setSuggestion(null);
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        borderTop: "1px solid var(--line)",
        padding: "14px 4px 18px",
      }}
    >
      {msg && (
        <div style={{ fontSize: 12, marginBottom: 9, color: msgColor }}>
          {msg}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            color: "var(--glow-bright)",
            fontSize: 13.5,
            whiteSpace: "nowrap",
          }}
        >
          guest@afnan:~$
        </span>
        <div style={{ position: "relative", flex: 1 }}>
          {suggestion && (
            <input
              aria-hidden
              readOnly
              tabIndex={-1}
              value={suggestion}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                background: "transparent",
                border: "1px solid transparent",
                outline: "none",
                pointerEvents: "none",
                color: "var(--dim)",
                fontFamily: "var(--mono)",
                fontSize: 13.5,
                lineHeight: "normal",
                boxSizing: "border-box",
                padding: 0,
                margin: 0,
              }}
            />
          )}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onSubmit();
                return;
              }
              if (suggestion && e.key === "Tab") {
                e.preventDefault();
                acceptSuggestion();
                return;
              }
              if (
                suggestion &&
                e.key === "ArrowRight" &&
                e.currentTarget.selectionStart === input.length &&
                e.currentTarget.selectionEnd === input.length
              ) {
                e.preventDefault();
                acceptSuggestion();
              }
            }}
            className="tp-in"
            placeholder="type a command…"
            spellCheck={false}
            autoComplete="off"
            style={{
              position: "relative",
              width: "100%",
              background: "transparent",
              border: "1px solid transparent",
              outline: "none",
              color: "#fff",
              fontFamily: "var(--mono)",
              fontSize: 13.5,
              lineHeight: "normal",
              boxSizing: "border-box",
              padding: 0,
              margin: 0,
              caretColor: "var(--glow)",
            }}
          />
        </div>
        {!isDesktop && suggestion && (
          <button
            type="button"
            onClick={acceptSuggestion}
            className="tp-pill"
            style={{
              flexShrink: 0,
              background: "transparent",
              border: "1px solid var(--glow-dim)",
              color: "var(--glow-bright)",
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 11.5,
              fontFamily: "var(--mono)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ⇥ {suggestion}
          </button>
        )}
      </div>
    </div>
  );
}

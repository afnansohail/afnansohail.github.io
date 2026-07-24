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
  msgTone: "dim" | "accent" | "error";
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function CommandInput({
  input,
  onInputChange,
  onSubmit,
  msg,
  msgTone,
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
      className="border-t border-(--line) px-1 py-3.5 pb-4.5"
      style={{ paddingBottom: "calc(1.125rem + env(safe-area-inset-bottom))" }}
    >
      {msg && (
        <div
          className={`mb-2.25 text-[12px] ${
            msgTone === "accent"
              ? "text-(--accent)"
              : msgTone === "error"
                ? "text-[#e07e7e]"
                : "text-(--dim)"
          }`}
        >
          {msg}
        </div>
      )}
      <div className="flex items-center gap-2.5">
        <span className="whitespace-nowrap text-[13.5px] text-(--glow-bright)">
          guest@afnan:~$
        </span>
        <div className="relative flex-1">
          {suggestion && (
            <input
              aria-hidden
              readOnly
              tabIndex={-1}
              value={suggestion}
              className="pointer-events-none absolute inset-0 box-border m-0 w-full border border-transparent bg-transparent p-0 text-[13.5px] leading-normal text-(--dim) outline-none"
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
            placeholder="type a command…"
            spellCheck={false}
            autoComplete="off"
            className="relative box-border m-0 w-full border border-transparent bg-transparent p-0 text-[13.5px] leading-normal text-white outline-none caret-(--glow) placeholder:text-[#4a4d5e]"
          />
        </div>
        {!isDesktop && suggestion && (
          <button
            type="button"
            onClick={acceptSuggestion}
            className="tp-pill shrink-0 whitespace-nowrap rounded-full border border-(--glow-dim) bg-transparent px-2.5 py-0.75 text-[11.5px] text-(--glow-bright)"
          >
            ⇥ {suggestion}
          </button>
        )}
      </div>
    </div>
  );
}

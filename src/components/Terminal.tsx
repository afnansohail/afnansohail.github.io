import { useCallback, useEffect, useRef, useState } from "react";
import { options } from "@/content";
import { useBootSequence } from "@/hooks/useBootSequence";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useTerminalTheme } from "@/hooks/useTerminalTheme";
import * as sound from "@/lib/sound";
import { getLowPowerPreference, setLowPowerEnabled } from "@/lib/lowPower";
import TerminalCanvas from "./terminal/TerminalCanvas";
import CRTEffects from "./terminal/CRTEffects";
import BootScreen from "./terminal/BootScreen";
import HeaderBar from "./terminal/HeaderBar";
import CommandBar from "./terminal/CommandBar";
import CommandInput from "./terminal/CommandInput";
import { ALIASES } from "./terminal/commands";
import { THEMES, DEFAULT_THEME } from "./terminal/themes";
import {
  Banner,
  Intro,
  SECTION_COMPONENTS,
  type SectionKey,
} from "./terminal/Sections";

const CLEAR_ANIM_MS = 380;

export default function Terminal() {
  const { booting, lineIdx, progress, ready } = useBootSequence();
  const isDesktop = useIsDesktop();
  const [reduceMotion, setReduceMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [order, setOrder] = useState<SectionKey[]>([]);
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [msgTone, setMsgTone] = useState<"dim" | "accent" | "error">("dim");
  const [muted, setMutedState] = useState(() => sound.isMuted());
  const [clearing, setClearing] = useState(false);
  const [lowPowerManual, setLowPowerManual] = useState(() => {
    const preference = getLowPowerPreference();
    return preference ?? !isDesktop;
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const feedRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const clearTimeoutRef = useRef<number | null>(null);
  const raf1Ref = useRef<number | null>(null);
  const raf2Ref = useRef<number | null>(null);

  const [theme, setTheme] = useTerminalTheme(rootRef);

  const focusInput = useCallback(() => {
    if (!isDesktop) return;
    inputRef.current?.focus();
  }, [isDesktop]);

  const handleRootClick = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) return;
    focusInput();
  }, [focusInput]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!ready) return;
    focusInput();
    if (feedRef.current) feedRef.current.scrollTop = 0;
  }, [ready]);

  const lowPowerForced = reduceMotion;
  const lowPowerMode = lowPowerForced || lowPowerManual;

  const scrollToSection = useCallback((key: SectionKey) => {
    if (raf1Ref.current !== null) {
      cancelAnimationFrame(raf1Ref.current);
      raf1Ref.current = null;
    }
    if (raf2Ref.current !== null) {
      cancelAnimationFrame(raf2Ref.current);
      raf2Ref.current = null;
    }

    raf1Ref.current = requestAnimationFrame(() => {
      raf2Ref.current = requestAnimationFrame(() => {
        const el = feedRef.current?.querySelector(
          `#sec-${key}`,
        ) as HTMLElement | null;
        if (el && feedRef.current) {
          feedRef.current.scrollTo({
            top: el.offsetTop - 12,
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current !== null) {
        clearTimeout(clearTimeoutRef.current);
      }
      if (raf1Ref.current !== null) {
        cancelAnimationFrame(raf1Ref.current);
      }
      if (raf2Ref.current !== null) {
        cancelAnimationFrame(raf2Ref.current);
      }
    };
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase().split(/\s+/)[0];
      if (!cmd) return;

      if (cmd === "clear" || cmd === "cls" || cmd === "reset") {
        if (clearing) return;
        setInput("");
        sound.blip();

        const finish = () => {
          setOrder([]);
          setClearing(false);
          setMsg("session cleared. type `help` to begin.");
          setMsgTone("dim");
          if (feedRef.current) feedRef.current.scrollTop = 0;
          focusInput();
        };

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        if (order.length === 0 || reduceMotion) {
          finish();
          return;
        }

        setClearing(true);
        clearTimeoutRef.current = window.setTimeout(() => {
          clearTimeoutRef.current = null;
          finish();
        }, CLEAR_ANIM_MS);
        return;
      }

      const target = ALIASES[cmd];
      if (!target) {
        setInput("");
        setMsg(`command not found: ${cmd}  —  try \`help\``);
        setMsgTone("error");
        sound.error();
        focusInput();
        return;
      }

      setOrder((prev) => [...prev.filter((k) => k !== target), target]);
      setInput("");
      setMsg(`✓ loaded: ${target}`);
      setMsgTone("accent");
      sound.success();
      focusInput();
      scrollToSection(target);
    },
    [clearing, focusInput, order.length, scrollToSection],
  );

  const toggleMuted = useCallback(() => {
    const next = !muted;
    sound.setMuted(next);
    setMutedState(next);
    if (!next) sound.blip();
  }, [muted]);

  const toggleLowPower = useCallback(() => {
    const next = !lowPowerManual;
    setLowPowerEnabled(next);
    setLowPowerManual(next);
    sound.blip();
  }, [lowPowerManual]);

  return (
    <div
      ref={rootRef}
      onClick={handleRootClick}
      className="fixed inset-0 overflow-hidden bg-(--background) font-(--mono) text-[#dcdcec]"
      style={{ ["--background" as string]: THEMES[DEFAULT_THEME].bg }}
    >
      <TerminalCanvas
        gridRgb={THEMES[theme].rgb}
        starRgb={THEMES[theme].star}
        starfield={options.starfield && !lowPowerMode}
        dprCap={lowPowerMode ? 1 : 2}
        targetFps={lowPowerMode ? 30 : 60}
        particleCount={lowPowerMode ? 28 : 80}
        gridGap={lowPowerMode ? 64 : 52}
      />

      <CRTEffects lowPower={lowPowerMode} />

      {booting && <BootScreen lineIdx={lineIdx} progress={progress} />}

      {ready && (
        <div className="absolute inset-0 z-30 flex justify-center">
          <div className="flex h-full w-full max-w-260 flex-col px-3 sm:px-5">
            <HeaderBar
              theme={theme}
              onThemeChange={setTheme}
              muted={muted}
              onToggleMuted={toggleMuted}
              lowPower={lowPowerManual}
              lowPowerForced={lowPowerForced}
              onToggleLowPower={toggleLowPower}
            />

            <CommandBar onRunCommand={runCommand} lowPower={lowPowerMode} />

            <div
              ref={feedRef}
              className="tp-scroll relative flex flex-1 flex-col overflow-y-auto px-1 pt-6 pb-5"
            >
              <Banner />
              <Intro />
              <div className={`${clearing ? "tp-clearing" : ""} flex flex-col`}>
                {order.map((key) => {
                  const Section = SECTION_COMPONENTS[key];
                  return <Section key={key} />;
                })}
              </div>
            </div>

            <CommandInput
              input={input}
              onInputChange={setInput}
              onSubmit={() => runCommand(input)}
              msg={msg}
              msgTone={msgTone}
              inputRef={inputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}

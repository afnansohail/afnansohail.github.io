import { content } from "@/content";

interface BootScreenProps {
  lineIdx: number;
  progress: number;
}

export default function BootScreen({ lineIdx, progress }: BootScreenProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-180">
        <div className="mb-4.5 text-[9.5px] text-(--dim) tracking-[.14em] sm:text-xs sm:tracking-[.35em]">
          AFNAN&nbsp;SOHAIL &nbsp;//&nbsp; PERSONAL OS &nbsp; v6.7.0
        </div>
        <div className="min-h-52.5 text-[10.5px] leading-[1.6] sm:text-[13.5px] sm:leading-[1.9]">
          {content.bootLines.slice(0, lineIdx).map((line, i) => (
            <div key={i} className="whitespace-pre-wrap text-[#c9cce0]">
              {line}
            </div>
          ))}
          <span className="inline-block h-4 w-2.25 align-[-2px] bg-(--glow) shadow-[0_0_10px_var(--glow)] animate-[tpBlink_1s_step-end_infinite]" />
        </div>
        <div className="mt-5.5 flex items-center gap-3.5">
          <div className="h-1.5 flex-1 overflow-hidden rounded-[3px] border border-(--line)">
            <div
              className="h-full bg-[linear-gradient(90deg,var(--glow-dim),var(--glow-bright))] shadow-[0_0_12px_var(--glow)] transition-[width] duration-180 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-13.5 text-right font-medium text-(--glow-bright)">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}

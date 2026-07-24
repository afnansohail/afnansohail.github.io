import { options } from "@/content";

interface CRTEffectsProps {
  lowPower?: boolean;
}

export default function CRTEffects({ lowPower = false }: CRTEffectsProps) {
  return (
    <>
      {!lowPower && options.scanlines && (
        <div className="pointer-events-none absolute inset-0 z-40 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_2px,rgba(0,0,0,.28)_3px,rgba(0,0,0,0)_4px)] mix-blend-multiply animate-[tpScan_.5s_linear_infinite]" />
      )}
      {!lowPower && options.crtFlicker && (
        <div className="pointer-events-none absolute inset-0 z-41 bg-(--glow) mix-blend-overlay animate-[tpFlicker_4s_infinite]" />
      )}
      <div
        className={`pointer-events-none absolute inset-0 z-42 ${
          lowPower
            ? "shadow-[inset_0_0_80px_rgba(0,0,0,.55)]"
            : "shadow-[inset_0_0_200px_rgba(0,0,0,.7),inset_0_0_60px_rgba(0,0,0,.5)]"
        }`}
      />
    </>
  );
}

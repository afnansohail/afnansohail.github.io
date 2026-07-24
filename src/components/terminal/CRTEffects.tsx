import { options } from "@/content";

interface CRTEffectsProps {
  lowPower?: boolean;
}

export default function CRTEffects({ lowPower = false }: CRTEffectsProps) {
  return (
    <>
      {!lowPower && options.scanlines && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 40,
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,.28) 3px, rgba(0,0,0,0) 4px)",
            animation: "tpScan .5s linear infinite",
            mixBlendMode: "multiply",
          }}
        />
      )}
      {!lowPower && options.crtFlicker && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 41,
            background: "var(--glow)",
            animation: "tpFlicker 4s infinite",
            mixBlendMode: "overlay",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 42,
          boxShadow: lowPower
            ? "inset 0 0 80px rgba(0,0,0,.55)"
            : "inset 0 0 200px rgba(0,0,0,.7), inset 0 0 60px rgba(0,0,0,.5)",
        }}
      />
    </>
  );
}

const STORAGE_KEY = "terminal-portfolio:muted";

let ctx: AudioContext | null = null;
let muted =
  typeof window !== "undefined" &&
  window.localStorage.getItem(STORAGE_KEY) === "1";
let visibilityListenerBound = false;

function bindVisibilityListener() {
  if (visibilityListenerBound || typeof document === "undefined") return;

  const onVisibilityChange = () => {
    if (!ctx) return;
    if (document.hidden && ctx.state === "running") {
      void ctx.suspend();
    }
  };

  document.addEventListener("visibilitychange", onVisibilityChange);
  visibilityListenerBound = true;
}

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor = window.AudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    bindVisibilityListener();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

interface ToneOptions {
  type?: OscillatorType;
  gain?: number;
  sweepTo?: number;
}

function tone(freq: number, duration: number, opts: ToneOptions = {}) {
  if (muted) return;
  const audioCtx = getContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const now = audioCtx.currentTime;
  const peak = opts.gain ?? 0.05;

  osc.type = opts.type ?? "square";
  osc.frequency.setValueAtTime(freq, now);
  if (opts.sweepTo) {
    osc.frequency.linearRampToValueAtTime(opts.sweepTo, now + duration);
  }

  gainNode.gain.setValueAtTime(0.0001, now);
  gainNode.gain.linearRampToValueAtTime(peak, now + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  osc.onended = () => {
    osc.disconnect();
    gainNode.disconnect();
  };
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

/** Soft UI click — command-bar buttons, theme dots, clear. */
export function blip() {
  tone(720, 0.05, { type: "square", gain: 0.04 });
}

/** A command resolved successfully. */
export function success() {
  tone(520, 0.06, { type: "square", gain: 0.05 });
  setTimeout(() => tone(760, 0.08, { type: "square", gain: 0.05 }), 55);
}

/** Unknown command. */
export function error() {
  tone(140, 0.18, { type: "sawtooth", gain: 0.05, sweepTo: 90 });
}

/** Snake: one grid tick. */
export function tick() {
  tone(300, 0.03, { type: "square", gain: 0.025 });
}

/** Snake: ate food. */
export function eat() {
  tone(500, 0.05, { type: "square", gain: 0.05, sweepTo: 900 });
}

/** Snake: game over. */
export function gameOver() {
  tone(400, 0.35, { type: "sawtooth", gain: 0.06, sweepTo: 80 });
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }
}

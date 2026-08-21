// supabase/functions/submit-score/index.ts
import { createClient } from "jsr:@supabase/supabase-js@2";
import leoProfanity from "npm:leo-profanity@1.8.0";
import { corsHeadersFor } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ??
  Deno.env.get("SUPABASE_SECRET_KEY") ??
  "";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

// Mirrors src/components/terminal/Game.tsx — keep these in sync if the grid
// size, initial snake length, or tick rate ever changes there.
const GRID_X = 22;
const GRID_Y = 13;
const INITIAL_SNAKE_LENGTH = 3;
const TICK_MS = 130;
const MAX_SCORE = GRID_X * GRID_Y - INITIAL_SNAKE_LENGTH; // 283

const NAME_MAX_LENGTH = 16;
const SESSION_MAX_AGE_MS = 20 * 60 * 1000; // 20 minutes
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function sanitizeName(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.trim().replace(/[^a-zA-Z0-9 _.-]/g, "");
  if (cleaned.length === 0 || cleaned.length > NAME_MAX_LENGTH) return null;
  if (!/[a-zA-Z]/.test(cleaned)) return null; // reject names with no letters at all
  return cleaned;
}

// Common leetspeak substitutions, applied before the profanity check (in
// addition to leo-profanity's own matching) so spelling a blocked word with
// digits/symbols (e.g. "5h1t") doesn't slip through.
const LEETSPEAK_MAP: Record<string, string> = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  $: "s",
};

function containsProfanity(name: string): boolean {
  const deLeeted = name
    .toLowerCase()
    .split("")
    .map((ch) => LEETSPEAK_MAP[ch] ?? ch)
    .join("");
  return leoProfanity.check(name) || leoProfanity.check(deLeeted);
}

function isValidScore(raw: unknown): raw is number {
  return (
    typeof raw === "number" &&
    Number.isInteger(raw) &&
    raw >= 0 &&
    raw <= MAX_SCORE
  );
}

function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

async function isRateLimited(ip: string): Promise<boolean> {
  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count, error: countError } = await supabase
    .from("submission_log")
    .select("id", { count: "exact", head: true })
    .eq("ip", ip)
    .gte("created_at", windowStart);

  await supabase.from("submission_log").insert({ ip });

  if (countError) return true;

  return (count ?? 0) >= RATE_LIMIT_MAX;
}

export default {
  fetch: async (req: Request) => {
    const cors = corsHeadersFor(req.headers.get("origin"));
    const json = (body: unknown, status = 200) =>
      new Response(JSON.stringify(body), {
        status,
        headers: { ...cors, "Content-Type": "application/json" },
      });

    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const ip = clientIp(req);
    if (await isRateLimited(ip)) {
      return json({ error: "Too many submissions, try again later." }, 429);
    }

    let body: { sessionId?: unknown; name?: unknown; score?: unknown };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }

    if (typeof body !== "object" || body === null) {
      return json({ error: "Invalid JSON body" }, 400);
    }

    const name = sanitizeName(body.name);
    if (!name) return json({ error: "Invalid name" }, 400);
    if (containsProfanity(name)) {
      return json({ error: "Please choose an appropriate name" }, 400);
    }
    if (!isValidScore(body.score)) return json({ error: "Invalid score" }, 400);
    if (typeof body.sessionId !== "string") {
      return json({ error: "Missing session" }, 400);
    }

    const { data: session, error: sessionError } = await supabase
      .from("game_sessions")
      .select("started_at, used_at")
      .eq("id", body.sessionId)
      .single();

    if (sessionError || !session || session.used_at) {
      return json({ error: "Invalid or already-used session" }, 400);
    }

    const startedAtMs = new Date(session.started_at).getTime();
    const elapsedMs = Date.now() - startedAtMs;
    const minPlausibleMs = body.score * TICK_MS;

    if (elapsedMs < minPlausibleMs || elapsedMs > SESSION_MAX_AGE_MS) {
      return json({ error: "Score not plausible for this session" }, 400);
    }

    const { data: markUsedRows, error: markUsedError } = await supabase
      .from("game_sessions")
      .update({ used_at: new Date().toISOString() })
      .eq("id", body.sessionId)
      .is("used_at", null)
      .select("id");

    if (markUsedError) {
      return json({ error: "Could not finalize session" }, 500);
    }

    if (!markUsedRows || markUsedRows.length !== 1) {
      return json({ error: "Invalid or already-used session" }, 400);
    }

    const { error: insertError } = await supabase
      .from("leaderboard")
      .insert({ name, score: body.score });

    if (insertError) {
      return json({ error: "Could not save score" }, 500);
    }

    return json({ ok: true });
  },
};

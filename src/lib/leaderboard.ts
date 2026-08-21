import { createClient } from "@supabase/supabase-js";

export interface LeaderboardEntry {
  name: string;
  score: number;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

export function isLeaderboardConfigured(): boolean {
  return supabase !== null;
}

export async function fetchTopScores(): Promise<LeaderboardEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("leaderboard")
    .select("name,score")
    .order("score", { ascending: false })
    .limit(10);
  if (error || !data) throw new Error(error?.message ?? "Failed to load scores");
  return data as LeaderboardEntry[];
}

async function callFunction<T>(name: string, body?: unknown): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${name}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(data.error ?? `Request to ${name} failed`);
  return data;
}

export async function startSession(): Promise<string | null> {
  if (!isLeaderboardConfigured()) return null;
  const { sessionId } = await callFunction<{ sessionId: string }>("start-session");
  return sessionId;
}

export async function submitScore(
  sessionId: string,
  name: string,
  score: number,
): Promise<void> {
  if (!isLeaderboardConfigured()) return;
  await callFunction("submit-score", { sessionId, name, score });
}

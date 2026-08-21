import { useEffect, useState, type SyntheticEvent } from "react";
import {
  fetchTopScores,
  isLeaderboardConfigured,
  submitScore,
  type LeaderboardEntry,
} from "@/lib/leaderboard";

const NAME_MAX_LENGTH = 16;

interface LeaderboardProps {
  score: number;
  gameOver: boolean;
  sessionId: string | null;
}

const stop = (e: SyntheticEvent) => e.stopPropagation();

export default function Leaderboard({ score, gameOver, sessionId }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLeaderboardConfigured()) return;
    fetchTopScores()
      .then(setEntries)
      .catch(() => setLoadError(true));
  }, []);

  useEffect(() => {
    if (!gameOver) setSubmitted(false);
  }, [gameOver]);

  if (!isLeaderboardConfigured()) return null;

  const handleSubmit = async () => {
    const trimmed = name.trim().slice(0, NAME_MAX_LENGTH);
    if (!trimmed || !sessionId) return;
    setSubmitting(true);
    try {
      await submitScore(sessionId, trimmed, score);
      const updated = await fetchTopScores();
      setEntries(updated);
      setSubmitted(true);
    } catch {
      setLoadError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-3 border-t border-(--line) pt-3 text-[12px] text-(--dim)">
      {gameOver && score > 0 && !submitted && sessionId && (
        <div className="mb-2.5 flex flex-wrap items-center gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onClick={stop}
            onKeyDown={(e) => {
              stop(e);
              if (e.key === "Enter") handleSubmit();
            }}
            maxLength={NAME_MAX_LENGTH}
            placeholder="your name"
            className="rounded-[6px] border border-(--line) bg-transparent px-2 py-1 text-(--glow-bright) outline-none"
          />
          <button
            type="button"
            disabled={submitting || !name.trim()}
            onClick={(e) => {
              stop(e);
              handleSubmit();
            }}
            onKeyDown={stop}
            className="tp-pill rounded-[6px] border border-(--line) px-2 py-1 text-(--glow-bright) disabled:opacity-50"
          >
            {submitting ? "submitting…" : "submit score"}
          </button>
        </div>
      )}
      <div className="mb-1 text-(--glow-bright)">top scores</div>
      {loadError && <div>leaderboard unavailable right now.</div>}
      {!loadError && entries.length === 0 && <div>no scores yet — be the first.</div>}
      {!loadError && entries.length > 0 && (
        <ol className="grid grid-cols-1 gap-0.5">
          {entries.map((entry, i) => (
            <li key={`${entry.name}-${entry.score}-${i}`} className="flex justify-between gap-3">
              <span>
                {i + 1}. {entry.name}
              </span>
              <span className="text-(--glow-bright)">{entry.score}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

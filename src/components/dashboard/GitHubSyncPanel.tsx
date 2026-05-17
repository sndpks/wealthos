import { useEffect, useState } from "react";

const REPO = "sndpks/wealthos";
const BRANCH = "main";

type Commit = {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
};

type State =
  | { status: "loading" }
  | { status: "ok"; commit: Commit; fetchedAt: Date }
  | { status: "error"; message: string };

function timeAgo(date: Date): string {
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function GitHubSyncPanel() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = async () => {
    setState({ status: "loading" });
    try {
      const res = await fetch(
        `https://api.github.com/repos/${REPO}/commits/${BRANCH}`,
        { headers: { Accept: "application/vnd.github+json" } },
      );
      if (!res.ok) {
        throw new Error(
          res.status === 404
            ? "Repo or branch not found (is the repo public?)"
            : `GitHub API error ${res.status}`,
        );
      }
      const data = await res.json();
      setState({
        status: "ok",
        fetchedAt: new Date(),
        commit: {
          sha: data.sha,
          message: (data.commit?.message ?? "").split("\n")[0],
          author: data.commit?.author?.name ?? "unknown",
          date: data.commit?.author?.date ?? "",
          url: data.html_url,
        },
      });
    } catch (e) {
      setState({
        status: "error",
        message: e instanceof Error ? e.message : "Failed to load",
      });
    }
  };

  useEffect(() => {
    load();
    const id = setInterval(load, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="mb-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                state.status === "ok"
                  ? "bg-emerald-500"
                  : state.status === "loading"
                    ? "bg-amber-500 animate-pulse"
                    : "bg-red-500"
              }`}
              aria-hidden
            />
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              GitHub sync
            </h2>
            <span className="text-xs text-muted-foreground">
              {REPO} · <span className="font-mono">{BRANCH}</span>
            </span>
          </div>

          <div className="mt-3 text-sm">
            {state.status === "loading" && (
              <p className="text-muted-foreground">Checking latest commit…</p>
            )}
            {state.status === "error" && (
              <p className="text-red-600 dark:text-red-400">{state.message}</p>
            )}
            {state.status === "ok" && (
              <div className="space-y-1">
                <p className="truncate font-medium text-foreground">
                  {state.commit.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  <span className="font-mono">
                    {state.commit.sha.slice(0, 7)}
                  </span>{" "}
                  · {state.commit.author} ·{" "}
                  {state.commit.date
                    ? timeAgo(new Date(state.commit.date))
                    : "—"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <button
            onClick={load}
            className="rounded-md border border-border px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
          >
            Refresh
          </button>
          {state.status === "ok" && (
            <a
              href={state.commit.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              View on GitHub →
            </a>
          )}
          {state.status === "ok" && (
            <span className="text-[10px] text-muted-foreground">
              Updated {timeAgo(state.fetchedAt)}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
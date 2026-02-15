import { query } from "$app/server";

interface CommitDateRequest {
	key: string;
	startCommit?: string;
	endCommit?: string;
	gitRepoLink?: string;
}

interface ResolvedDates {
	dateStarted?: string;
	dateFinished?: string;
	commitCount?: number;
}

// Module-level cache to avoid hitting GitHub's 60 req/hr unauthenticated rate limit.
// Specific commit SHAs are immutable, so cache for 24h. Dynamic queries (latest commit,
// commit count) can change, so cache for 1h.
const fetchCache = new Map<string, { data: unknown; expiresAt: number }>();
const IMMUTABLE_TTL = 24 * 60 * 60 * 1000;
// nah we're making it 24 hours it's okay to be stale
const DYNAMIC_TTL = 24 * 60 * 60 * 1000;

async function githubFetch(url: string, ttlMs: number): Promise<unknown | null> {
	const cached = fetchCache.get(url);
	if (cached && Date.now() < cached.expiresAt) {
		return cached.data;
	}
	try {
		const res = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
		if (!res.ok) return null;
		const data = await res.json();
		fetchCache.set(url, { data, expiresAt: Date.now() + ttlMs });
		return data;
	} catch {
		return null;
	}
}

function parseGithubCommitUrl(url: string): { owner: string; repo: string; sha: string } | null {
	const match = url.match(/github\.com\/([^/]+)\/([^/]+)\/commit\/([a-f0-9]+)/i);
	if (!match) return null;
	return { owner: match[1], repo: match[2], sha: match[3] };
}

function parseGithubRepoUrl(url: string): { owner: string; repo: string } | null {
	const match = url.match(/github\.com\/([^/]+)\/([^/]+)/i);
	if (!match) return null;
	return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

async function fetchCommitDate(owner: string, repo: string, sha: string): Promise<string | null> {
	const data = await githubFetch(
		`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`,
		IMMUTABLE_TTL
	);
	return (data as { commit?: { committer?: { date?: string } } })?.commit?.committer?.date ?? null;
}

async function fetchLatestCommitDate(owner: string, repo: string): Promise<string | null> {
	const data = await githubFetch(
		`https://api.github.com/repos/${owner}/${repo}/commits?sha=main&per_page=1`,
		DYNAMIC_TTL
	);
	if (!Array.isArray(data) || data.length === 0) return null;
	return data[0].commit?.committer?.date ?? null;
}

async function fetchCommitCount(
	owner: string,
	repo: string,
	baseSha: string,
	headSha: string
): Promise<number | null> {
	const data = await githubFetch(
		`https://api.github.com/repos/${owner}/${repo}/compare/${baseSha}...${headSha}`,
		DYNAMIC_TTL
	);
	return (data as { total_commits?: number })?.total_commits ?? null;
}

async function resolveCommitDates(
	refs: CommitDateRequest[]
): Promise<Record<string, ResolvedDates>> {
	const result: Record<string, ResolvedDates> = {};
	const promises: Promise<void>[] = [];

	for (const ref of refs) {
		const dates: ResolvedDates = {};
		result[ref.key] = dates;

		if (ref.startCommit) {
			const parsed = parseGithubCommitUrl(ref.startCommit);
			if (parsed) {
				promises.push(
					fetchCommitDate(parsed.owner, parsed.repo, parsed.sha).then((d) => {
						if (d) dates.dateStarted = d;
					})
				);
			}
		}

		if (ref.endCommit) {
			const parsed = parseGithubCommitUrl(ref.endCommit);
			if (parsed) {
				promises.push(
					fetchCommitDate(parsed.owner, parsed.repo, parsed.sha).then((d) => {
						if (d) dates.dateFinished = d;
					})
				);
			}
		} else if (ref.gitRepoLink) {
			const parsed = parseGithubRepoUrl(ref.gitRepoLink);
			if (parsed) {
				promises.push(
					fetchLatestCommitDate(parsed.owner, parsed.repo).then((d) => {
						if (d) dates.dateFinished = d;
					})
				);
			}
		}

		// Fetch commit count between start and end commits
		if (ref.startCommit) {
			const startParsed = parseGithubCommitUrl(ref.startCommit);
			if (startParsed) {
				if (ref.endCommit) {
					const endParsed = parseGithubCommitUrl(ref.endCommit);
					if (endParsed && endParsed.owner === startParsed.owner && endParsed.repo === startParsed.repo) {
						promises.push(
							fetchCommitCount(startParsed.owner, startParsed.repo, startParsed.sha, endParsed.sha).then((c) => {
								if (c != null) dates.commitCount = c;
							})
						);
					}
				} else if (ref.gitRepoLink) {
					// Compare start commit to HEAD of main
					promises.push(
						fetchCommitCount(startParsed.owner, startParsed.repo, startParsed.sha, "main").then((c) => {
							if (c != null) dates.commitCount = c;
						})
					);
				}
			}
		}
	}

	await Promise.all(promises);
	return result;
}

export const getCommitDateRemote = query("unchecked", resolveCommitDates);

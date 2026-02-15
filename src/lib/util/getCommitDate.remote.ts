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
	try {
		const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`, {
			headers: { Accept: "application/vnd.github.v3+json" }
		});
		if (!res.ok) return null;
		const data = await res.json();
		return data.commit?.committer?.date ?? null;
	} catch {
		return null;
	}
}

async function fetchLatestCommitDate(owner: string, repo: string): Promise<string | null> {
	try {
		const res = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/commits?sha=main&per_page=1`,
			{ headers: { Accept: "application/vnd.github.v3+json" } }
		);
		if (!res.ok) return null;
		const data = await res.json();
		if (Array.isArray(data) && data.length > 0) {
			return data[0].commit?.committer?.date ?? null;
		}
		return null;
	} catch {
		return null;
	}
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
	}

	await Promise.all(promises);
	return result;
}

export const getCommitDateRemote = query("unchecked", resolveCommitDates);

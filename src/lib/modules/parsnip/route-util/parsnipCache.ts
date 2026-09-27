import { json, type Handle, type RequestHandler } from "@sveltejs/kit";

export const PARSNIP_CACHE_TAG = "parsnip";

const EDGE_CACHE_HEADER = "cloudflare-cdn-cache-control";
const CACHE_DIRECTIVE_HEADERS = [EDGE_CACHE_HEADER, "cdn-cache-control", "cache-control"];

export interface ParsnipCacheOptions {
	/** seconds a page is served fresh from the edge */
	maxAge?: number;
	/** seconds a stale page may be served while it re-renders in the background */
	staleWhileRevalidate?: number;
	/** seconds a stale page may be served when re-rendering fails */
	staleIfError?: number;
}

/**
 * Edge-only headers for Workers Cache, applied with `setHeaders` in a parsnip load.
 * Uses `cloudflare-cdn-cache-control` rather than `cache-control` so browsers never hold a stale
 * page, and so adapter-cloudflare's own `caches.default` layer, which purging cannot reach,
 * does not store it either.
 */
export const parsnipCacheHeaders = ({
	maxAge = 300,
	staleWhileRevalidate = 86400,
	staleIfError = 86400
}: ParsnipCacheOptions = {}): Record<string, string> => ({
	[EDGE_CACHE_HEADER]: `public, max-age=${maxAge}, stale-while-revalidate=${staleWhileRevalidate}, stale-if-error=${staleIfError}`,
	"cache-tag": PARSNIP_CACHE_TAG
});

/**
 * Keeps Workers Cache opt-in: a response that sets no cache directive is marked `no-store` at the
 * edge, so enabling the cache does not heuristically cache dynamic routes such as remote functions.
 */
export const edgeCacheOptInHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	if (CACHE_DIRECTIVE_HEADERS.some((header) => response.headers.has(header))) {
		return response;
	}

	try {
		response.headers.set(EDGE_CACHE_HEADER, "no-store");
		return response;
	} catch {
		// headers of a proxied or redirect response are immutable
		const mutable = new Response(response.body, response);
		mutable.headers.set(EDGE_CACHE_HEADER, "no-store");
		return mutable;
	}
};

const sha256 = async (value: string) =>
	new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)));

const tokensMatch = async (given: string, expected: string) => {
	const [a, b] = await Promise.all([sha256(given), sha256(expected)]);
	let diff = 0;
	for (let i = 0; i < a.length; i++) {
		diff |= a[i] ^ b[i];
	}
	return diff === 0;
};

/**
 * POST handler that purges every parsnip page from Workers Cache. Call it after publishing to the
 * CMS with `Authorization: Bearer <token>`. Only the Worker can purge its own cache; the zone
 * purge API and dashboard do not reach it.
 */
export const createParsnipRevalidateHandler =
	(getToken: () => string | undefined): RequestHandler =>
	async ({ request, platform }) => {
		const token = getToken();
		if (!token) {
			return json({ success: false, error: "revalidate token is not configured" }, { status: 503 });
		}

		const given = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
		if (!(await tokensMatch(given, token))) {
			return json({ success: false, error: "unauthorized" }, { status: 401 });
		}

		const cache = platform?.ctx?.cache;
		if (!cache) {
			return json(
				{ success: false, error: "Workers Cache is not available on this platform" },
				{ status: 501 }
			);
		}

		const result = await cache.purge({ tags: [PARSNIP_CACHE_TAG] });
		return json(result, { status: result.success ? 200 : 502 });
	};

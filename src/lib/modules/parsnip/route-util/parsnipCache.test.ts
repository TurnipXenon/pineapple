import type { RequestEvent } from "@sveltejs/kit";
import { describe, expect, it, vi } from "vitest";
import {
	createParsnipRevalidateHandler,
	edgeCacheOptInHandle,
	PARSNIP_CACHE_TAG,
	parsnipCacheHeaders
} from "./parsnipCache";

describe("parsnipCacheHeaders", () => {
	it("sets an edge-only directive and the parsnip tag", () => {
		expect(parsnipCacheHeaders()).toEqual({
			"cloudflare-cdn-cache-control":
				"public, max-age=300, stale-while-revalidate=86400, stale-if-error=86400",
			"cache-tag": PARSNIP_CACHE_TAG
		});
	});

	it("never sets cache-control, so adapter-cloudflare's caches.default layer skips it", () => {
		expect(Object.keys(parsnipCacheHeaders({ maxAge: 60 }))).not.toContain("cache-control");
	});
});

describe("edgeCacheOptInHandle", () => {
	const run = (response: Response) =>
		edgeCacheOptInHandle({ event: {} as RequestEvent, resolve: async () => response });

	it("marks responses without a cache directive as no-store at the edge", async () => {
		const response = await run(new Response("ok"));

		expect(response.headers.get("cloudflare-cdn-cache-control")).toBe("no-store");
	});

	it("leaves responses that opted in untouched", async () => {
		const response = await run(new Response("ok", { headers: parsnipCacheHeaders() }));

		expect(response.headers.get("cloudflare-cdn-cache-control")).toContain("max-age=300");
	});

	it("respects an explicit cache-control", async () => {
		const response = await run(new Response("ok", { headers: { "cache-control": "max-age=60" } }));

		expect(response.headers.has("cloudflare-cdn-cache-control")).toBe(false);
	});

	it("copies responses whose headers are immutable", async () => {
		const response = await run(Response.redirect("https://example.com/", 307));

		expect(response.status).toBe(307);
		expect(response.headers.get("location")).toBe("https://example.com/");
		expect(response.headers.get("cloudflare-cdn-cache-control")).toBe("no-store");
	});
});

describe("createParsnipRevalidateHandler", () => {
	const purge = vi.fn();
	const call = (
		token: string | undefined,
		authorization: string | undefined,
		platform: unknown = { ctx: { cache: { purge } } }
	) =>
		createParsnipRevalidateHandler(() => token)({
			request: new Request("https://example.com/api/parsnip/revalidate", {
				method: "POST",
				headers: authorization ? { authorization } : {}
			}),
			platform
		} as unknown as RequestEvent);

	it("refuses when no token is configured", async () => {
		expect((await call(undefined, "Bearer anything")).status).toBe(503);
	});

	it("rejects a missing or wrong token", async () => {
		expect((await call("secret", undefined)).status).toBe(401);
		expect((await call("secret", "Bearer nope")).status).toBe(401);
		expect(purge).not.toHaveBeenCalled();
	});

	it("reports when Workers Cache is unavailable", async () => {
		expect((await call("secret", "Bearer secret", {})).status).toBe(501);
	});

	it("purges the parsnip tag", async () => {
		purge.mockResolvedValueOnce({ success: true, errors: [] });

		const response = await call("secret", "Bearer secret");

		expect(response.status).toBe(200);
		expect(purge).toHaveBeenCalledWith({ tags: [PARSNIP_CACHE_TAG] });
	});

	it("surfaces a failed purge", async () => {
		purge.mockResolvedValueOnce({ success: false, errors: [{ code: 1, message: "rate limited" }] });

		expect((await call("secret", "Bearer secret")).status).toBe(502);
	});
});

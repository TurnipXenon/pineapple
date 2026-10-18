import { describe, expect, it } from "vitest";
import { resolvePreviewUrl } from "./resolvePreviewUrl";

const baseUrl = "https://cms.example.com";

describe("resolvePreviewUrl", () => {
	it("returns undefined when there is no preview", () => {
		expect(resolvePreviewUrl(undefined, baseUrl)).toBeUndefined();
		expect(resolvePreviewUrl("", baseUrl)).toBeUndefined();
	});

	it("prefixes the base url for a relative preview", () => {
		expect(resolvePreviewUrl("Deeper/niko.webp", baseUrl)).toBe(
			"https://cms.example.com/Deeper/niko.webp"
		);
	});

	it("keeps an absolute https preview untouched", () => {
		const preview = "https://photos.example.com/photos/a.jpeg";
		expect(resolvePreviewUrl(preview, baseUrl)).toBe(preview);
	});

	it("keeps an absolute http preview untouched", () => {
		const preview = "http://photos.example.com/photos/a.jpeg";
		expect(resolvePreviewUrl(preview, baseUrl)).toBe(preview);
	});

	it("treats a relative path that merely contains a url as relative", () => {
		expect(resolvePreviewUrl("notes/https://not-a-url.png", baseUrl)).toBe(
			"https://cms.example.com/notes/https://not-a-url.png"
		);
	});
});

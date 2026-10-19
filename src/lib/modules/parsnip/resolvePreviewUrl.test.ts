import { describe, expect, it } from "vitest";
import { resolvePreviewUrl } from "./resolvePreviewUrl";

const baseUrl = "https://cms.example.com";

describe("resolvePreviewUrl", () => {
	it("returns undefined when there is no preview", () => {
		expect(resolvePreviewUrl(undefined, baseUrl)).toBeUndefined();
		expect(resolvePreviewUrl("", baseUrl)).toBeUndefined();
	});

	it("points a relative preview at its og variant under the base url", () => {
		expect(resolvePreviewUrl("Deeper/niko.webp", baseUrl)).toBe(
			"https://cms.example.com/.variants/Deeper/niko.webp.og.jpg"
		);
	});

	it("maps every eligible extension, case-insensitively, keeping the full filename", () => {
		for (const name of ["a.jpg", "a.JPEG", "a.Png", "a.webp", "a.avif"]) {
			expect(resolvePreviewUrl(name, baseUrl)).toBe(
				`https://cms.example.com/.variants/${name}.og.jpg`
			);
		}
	});

	it("keeps the original for a relative preview without variants", () => {
		for (const name of ["Deeper/niko.gif", "Deeper/niko.svg", "Deeper/niko.png.txt"]) {
			expect(resolvePreviewUrl(name, baseUrl)).toBe(`https://cms.example.com/${name}`);
		}
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
			"https://cms.example.com/.variants/notes/https://not-a-url.png.og.jpg"
		);
	});
});

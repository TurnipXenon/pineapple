import { afterEach, describe, expect, it, vi } from "vitest";
import type { Image, ImageReference, Root, RootContent } from "mdast";
import type { ParsnipEmbedWikilink } from "../imageMetadata";
import { slugPageServerLoad } from "./slugPageServerLoad";

vi.mock("$pkg/util/env-getter", () => ({ getCmsBaseUrl: () => "https://cms.test" }));
afterEach(() => {
	vi.unstubAllGlobals();
});

describe("image collection transformation", () => {
	it("preserves complete records and existing ordinary-image-only grouping", async () => {
		const image: Image = {
			type: "image",
			url: "mug.jpg",
			alt: "Authored|400",
			title: "Coffee",
			fileAccessor: { target: "blog/mug.jpg", basePath: "mug.jpg", isEmbed: true },
			imageMetadata: { alt: "Resolved", width: 400, presentation: "inset" }
		};
		const second: Image = { type: "image", url: "second.jpg", alt: "Second" };
		const wiki: ParsnipEmbedWikilink = {
			type: "embedWikilink",
			value: "mug.jpg",
			fileAccessor: image.fileAccessor!,
			imageMetadata: image.imageMetadata
		};
		const reference: ImageReference = {
			type: "imageReference",
			identifier: "cup",
			referenceType: "full",
			fileAccessor: image.fileAccessor,
			imageMetadata: image.imageMetadata
		};
		const children: RootContent[] = [
			{ type: "paragraph", children: [image] },
			{ type: "paragraph", children: [second] },
			{ type: "paragraph", children: [{ type: "text", value: "Break" }] },
			{ type: "paragraph", children: [wiki] },
			{ type: "paragraph", children: [reference] }
		];
		const ast: Root = { type: "root", children };
		const fetchMock = vi
			.fn()
			.mockResolvedValueOnce({
				ok: true,
				json: async () => ({ files: [{ slug: "mug", path: "mug.ast.json" }] })
			})
			.mockResolvedValueOnce({ ok: true, json: async () => ({ basename: "Mug", ast: { ast } }) });
		vi.stubGlobal("fetch", fetchMock);
		const { parsnipEntry } = await slugPageServerLoad({ params: { slug: "mug" } });
		const result = parsnipEntry.ast.ast.children;
		expect(result[0].type).toBe("imageCollection");
		if (result[0].type !== "imageCollection") {
			throw new Error("Expected image collection");
		}
		expect(result[0].children).toEqual([image, second]);
		expect(result[0].children[0]).toBe(image);
		expect(result[0].children[0]).toMatchObject({
			alt: "Authored|400",
			title: "Coffee",
			fileAccessor: image.fileAccessor,
			imageMetadata: { alt: "Resolved", width: 400, presentation: "inset" }
		});
		expect(result[2]).toBe(children[3]);
		expect(result[3]).toBe(children[4]);
		expect(fetchMock).toHaveBeenCalledTimes(2);
	});
});

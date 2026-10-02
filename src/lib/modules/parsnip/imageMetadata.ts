import type { Image, Link } from "mdast";

export interface ParsnipImageMetadata {
	alt?: string;
	width?: number;
	height?: number;
	presentation?: "default" | "inset" | "wide";
}

export interface ParsnipImageFileAccessor {
	target: string;
	isEmbed: boolean;
	basePath?: string;
}

export interface ParsnipImageProps {
	url?: string;
	alt?: string | null;
	title?: string | null;
	fileAccessor?: ParsnipImageFileAccessor;
	imageMetadata?: ParsnipImageMetadata;
	withDescription?: boolean;
}

export interface ParsnipEmbedWikilink {
	type: "embedWikilink";
	value: string;
	fileAccessor: ParsnipImageFileAccessor;
	imageMetadata?: ParsnipImageMetadata;
}

export interface ParsnipWikilink {
	type: "wikilink";
	value: string;
	fileAccessor: {
		target: string;
		isEmbed: false;
		basePath: string;
		slug: string;
	};
}

export interface ParsnipImageCollection {
	type: "imageCollection";
	children: (Image | Link)[];
}

declare module "mdast" {
	interface Image {
		fileAccessor?: ParsnipImageFileAccessor;
		imageMetadata?: ParsnipImageMetadata;
	}
	interface ImageReference {
		fileAccessor?: ParsnipImageFileAccessor;
		imageMetadata?: ParsnipImageMetadata;
	}
	interface PhrasingContentMap {
		embedWikilink: ParsnipEmbedWikilink;
		wikilink: ParsnipWikilink;
	}
	interface RootContentMap {
		imageCollection: ParsnipImageCollection;
	}
}

export function normalizeImageMetadata(metadata?: ParsnipImageMetadata): ParsnipImageMetadata {
	const result: ParsnipImageMetadata = {};
	if (typeof metadata?.alt === "string") {
		result.alt = metadata.alt;
	}
	for (const axis of ["width", "height"] as const) {
		const value = metadata?.[axis];
		if (typeof value === "number" && Number.isSafeInteger(value) && value > 0) {
			result[axis] = value;
		}
	}
	if (
		metadata?.presentation === "default" ||
		metadata?.presentation === "inset" ||
		metadata?.presentation === "wide"
	) {
		result.presentation = metadata.presentation;
	}
	return result;
}

/** The publisher already resolved native syntax and shared defaults; authored AST fields stay intact. */
export function getParsnipImageData(image: ParsnipImageProps, cmsBaseUrl: string) {
	const metadata = normalizeImageMetadata(image.imageMetadata);
	const basePath = image.fileAccessor?.basePath;
	const isLocal = typeof basePath === "string" && basePath.length > 0;
	return {
		src: isLocal
			? cmsBaseUrl.replace(/\/+$/, "") + "/" + basePath.replace(/^\/+/, "")
			: (image.url ?? ""),
		alt: metadata.alt ?? image.alt ?? "",
		title: image.title ?? undefined,
		metadata,
		isLocal
	};
}

export function imageDimensionStyle(metadata: ParsnipImageMetadata): string | undefined {
	const values = normalizeImageMetadata(metadata);
	const styles: string[] = [];
	if (values.width) {
		styles.push("width: " + values.width + "px");
	}
	if (values.height) {
		styles.push("height: " + values.height + "px");
	}
	return styles.length ? styles.join("; ") : undefined;
}

/** Preserve the existing gallery fallback/description override, but never query local CMS assets. */
export function shouldFetchPhotoDetails(
	url: string,
	alt: string,
	showDescription: boolean,
	isLocal: boolean
): boolean {
	return (
		!isLocal &&
		(!alt || showDescription) &&
		(url.includes("rabiole") || url.includes("photo-gallery") || url.includes("photos"))
	);
}

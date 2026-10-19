// the publisher generates a small JPEG thumbnail (fits 1200×1200) for local previews of these types
const OG_ELIGIBLE_EXTENSION = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Resolves a published entry's preview into a usable image URL.
 *
 * An absolute http(s) URL is used as-is; anything else is treated as a path
 * relative to the base blog path. Eligible images resolve to the publisher's
 * `.variants/<path>.og.jpg` thumbnail, since previews are used for link-preview
 * cards (og:image) and nav cards; GIF/SVG keep the original.
 */
export const resolvePreviewUrl = (
	preview: string | undefined,
	baseUrl: string | undefined
): string | undefined => {
	if (!preview) {
		return undefined;
	}

	if (/^https?:\/\//i.test(preview)) {
		return preview;
	}

	if (OG_ELIGIBLE_EXTENSION.test(preview)) {
		return `${baseUrl}/.variants/${preview}.og.jpg`;
	}

	return `${baseUrl}/${preview}`;
};

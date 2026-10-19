// the publisher generates a small JPEG thumbnail (fits 1200×1200) for local previews of these types
const OG_ELIGIBLE_EXTENSION = /\.(jpe?g|png|webp|avif)$/i;

/**
 * Resolves a published entry's preview into an image URL: http(s) as-is,
 * otherwise relative to the base blog path, using the og thumbnail when eligible.
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

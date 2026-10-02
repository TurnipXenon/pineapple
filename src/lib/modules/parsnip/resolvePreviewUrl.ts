/**
 * Resolves a published entry's preview into a usable image URL.
 *
 * An absolute http(s) URL is used as-is; anything else is treated as a path
 * relative to the base blog path.
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

	return `${baseUrl}/${preview}`;
};

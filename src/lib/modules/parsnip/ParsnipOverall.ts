export interface SimplifiedEntry {
	/**
	 * path to the source of data relative to base blog path
	 * acts as our ID
	 */
	path: string;
	/**
	 * url path we want this particular blog to show up in
	 */
	slug: string;
	/**
	 * url of preview image relative to base blog path
	 */
	preview?: string;
	previewAlt?: string;
	tagline?: string;
}

export interface ParsnipEntrySummary extends SimplifiedEntry {
	/**
	 * Name of the markdown file or title
	 */
	basename: string;
	name: string;
	tags: string[];
	stat: {
		/**
		 * unix time
		 */
		ctime: number;
		/**
		 * unix time
		 */
		mtime: number;
	}
}

export interface TagEntry {
	name: string;
	entries: SimplifiedEntry[];
}

export interface ParsnipOverall {
	files: ParsnipEntrySummary[];
	tags: TagEntry[];
	baseUrl: string;
}

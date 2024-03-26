export interface PageMeta {
	// generated meta
	relativeLink: string;
	nestedPages: PageMeta[];

	// defined meta
	title: string; // defaults to directory name
	tags: string[];

	/**
	 * Images are only limited to absolute paths (includes files in static folder)
	 */
	image?: string;
	imageAlt?: string;
	description?: string;
	datePublished?: string;
	lastUpdated?: string;
}

/**
 * todo: doc
 * @param parentList
 * @param child
 */
export const findPageMetaParent = (parentList: PageMeta[], child: PageMeta): boolean => {
	let isChild = false;

	parentList.every(parent => {
		if (child.relativeLink.startsWith(`${parent.relativeLink}/`)) {
			const isNestedChild = findPageMetaParent(parent.nestedPages, child);
			if (!isNestedChild) {
				parent.nestedPages.push(child);
			}
			isChild = true;
			return false;
		}

		return true;
	});

	return isChild;
};

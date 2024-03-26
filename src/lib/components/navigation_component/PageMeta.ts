export interface PageMeta {
	relativeLink: string;
	title: string;
	tags: string[];
	nestedPages: PageMeta[];
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


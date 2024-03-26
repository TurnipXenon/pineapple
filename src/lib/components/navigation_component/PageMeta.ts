import type { RawGlob } from "$pkg";

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
	shouldGroup?: boolean;
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

export type ParsePageMetaCompareFn = ((a: PageMeta, b: PageMeta) => number);

export const parsePageMeta = (fileList: Record<string, unknown>,
															compareFn?: ParsePageMetaCompareFn): PageMeta[] => {
	const pageFlatList: PageMeta[] = [];
	// save for the future
	// let pageGroupedList: PageMeta[] = [];

	for (const path in fileList) {
		const pathParts = path.split("/");
		pathParts.pop();

		// get title
		const title = pathParts[pathParts.length - 1].replaceAll("-", " ");

		// get url path
		const subPath = pathParts.filter(s => {
			return s !== "." && s.indexOf("(") !== 0;
		});


		// todo: consider
		// subPath.unshift("/misc");
		const meta: PageMeta = {
			relativeLink: subPath.join("/"),
			title,
			tags: [],
			nestedPages: []
			// todo: transform the data in server.ts?
		};


		const body = (fileList[path] as RawGlob).default as string;
		// let metadata : undefined | Map<string, string | string[]>;
		if (body.startsWith("<!--")) {
			// todo: absorb more metadata
			const metadata = JSON.parse(body.slice("<!--".length, body.indexOf("-->")));
			meta.title = metadata["title"] ?? meta.title;
			meta.tags = metadata["tags"];
			meta.description = metadata["description"];
			meta.datePublished = metadata["datePublished"];
			meta.lastUpdated = metadata["lastUpdated"];
			meta.shouldGroup = metadata["shouldGroup"] as boolean;

			meta.image = metadata["image"];
			if (meta.image) {
				meta.imageAlt = metadata["imageAlt"];
				if (!meta.imageAlt) {
					console.warn(`Accessibility issues: image alt missing for image ${meta.image}`);
				}
			}
		}

		pageFlatList.push(meta);
	}

	pageFlatList.sort((a, b) => a.relativeLink.localeCompare(b.relativeLink));

	// find groupings
	// todo: we don't even have use for this yet!
	// pageFlatList.forEach(p => {
	// 	if (!findPageMetaParent(pageGroupedList, p)) {
	// 		pageGroupedList.push(p);
	// 	}
	// });

	if (compareFn) {
		pageFlatList.sort(compareFn);
	}

	return pageFlatList;
};
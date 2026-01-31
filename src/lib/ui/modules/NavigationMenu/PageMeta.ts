import type { RawGlob } from "$pkg/util/util";

export interface PageMeta {
	datePublished?: string;
	description?: string;

	imageAlt?: string; // defaults to directory name
	/**
	 * imageID is an ID that NavigationMenu can use to identify imported images
	 *
	 * To use imageID:
	 * 1. Add the imageID entry to the meta.json for the page
	 * 2. Create a typescript file with the variable ImageMap: Map<string, string>
	 * 3. Add a new entry with your imageID as key, and the image url as the value. Since this is
	 * Typescript, you can use import ImageUrl from "./path.png" as you would normally do.N
	 * 4. Add ImageMap as an argument to your NavigationMenu.
	 * Overall, this involves four files
	 * - Your navigation page: ./+page.svelte
	 * - Your image map typescript: ImageMap.ts
	 * - The page you want with an image represented in the navigation: ./topic1/+page.svelte
	 * - The meta for that page: ./topic1/meta.json
	 *
	 * imageID takes precedence over imageURL
	 */
	imageID?: string;

	/**
	 * imageURL is only limited to absolute paths (includes files in static folder)
	 *
	 * if imageID is defined, this will be ignored
	 */
	imageUrl?: string;

	lastUpdated?: string;
	nestedPages: PageMeta[];

	/**
	 * relativeLink is generated automatically. This will be ignored in meta.json.
	 */
	relativeLink: string;
	shouldGroup?: boolean;
	shouldHide?: boolean;
	tags: string[];

	/**
	 * title defaults to the directory name if it's an empty string.
	 */
	title: string;
}

export interface SimplePageMeta {
	datePublished?: string;
	description?: string;

	imageAlt?: string; // defaults to directory name
	/**
	 * imageID is an ID that NavigationMenu can use to identify imported images
	 *
	 * To use imageID:
	 * 1. Add the imageID entry to the meta.json for the page
	 * 2. Create a typescript file with the variable ImageMap: Map<string, string>
	 * 3. Add a new entry with your imageID as key, and the image url as the value. Since this is
	 * Typescript, you can use import ImageUrl from "./path.png" as you would normally do.N
	 * 4. Add ImageMap as an argument to your NavigationMenu.
	 * Overall, this involves four files
	 * - Your navigation page: ./+page.svelte
	 * - Your image map typescript: ImageMap.ts
	 * - The page you want with an image represented in the navigation: ./topic1/+page.svelte
	 * - The meta for that page: ./topic1/meta.json
	 *
	 * imageID takes precedence over imageURL
	 */
	imageID?: string;

	/**
	 * imageURL is only limited to absolute paths (includes files in static folder)
	 *
	 * if imageID is defined, this will be ignored
	 */
	imageUrl?: string;

	lastUpdated?: string;

	shouldGroup?: boolean;
	shouldHide?: boolean;
	tags: string[];

	/**
	 * title defaults to the directory name if it's an empty string.
	 */
	title: string;
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
															jsonList: Record<string, unknown>,
															imageMap: Map<string, string>,
															compareFn?: ParsePageMetaCompareFn): PageMeta[] => {
	const pageFlatList: PageMeta[] = [];
	// save for the future
	// let pageGroupedList: PageMeta[] = [];
	const jsonMap = new Map<string, { [k: string]: unknown }>();
	Object.keys(jsonList).forEach(path => {
		const pathEnd = path.split("../").pop() as string;
		const pathParts = pathEnd.split("/");
		pathParts.pop();

		// get url path
		const subPath = pathParts.filter(s => {
			return s !== "." && s.indexOf("(") !== 0;
		});

		try {
			jsonMap.set(subPath.join("/"), JSON.parse((jsonList[path] as RawGlob).default));
		} catch (e) {
			console.error(`Error parsing json at: ${path}: ${e}`);
		}

	});

	for (const path in fileList) {
		if (path.includes('[...')) {
			continue;
		}

		const pathEnd = path.split("../").pop() as string;
		const pathParts = pathEnd.split("/");
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


		const metadata = jsonMap.get(meta.relativeLink);
		if (metadata) {
			meta.title = metadata["title"] as string ?? meta.title;
			meta.tags = metadata["tags"] as string[] ?? [];
			meta.description = metadata["description"] as string;
			meta.datePublished = metadata["datePublished"] as string;
			meta.lastUpdated = metadata["lastUpdated"] as string;
			meta.shouldGroup = metadata["shouldGroup"] as boolean;
			meta.shouldHide = metadata["shouldHide"] as boolean;

			meta.imageID = metadata["imageID"] as string;
			meta.imageUrl = imageMap.get(meta.imageID) ?? metadata["imageUrl"] as string;

			if (meta.imageUrl) {
				meta.imageAlt = metadata["imageAlt"] as string;
				if (!meta.imageAlt) {
					console.warn(`Accessibility issues: image alt missing for image ${meta.imageUrl}`);
				}
			}
		}

		if (meta.shouldHide) {
			continue;
		}

		pageFlatList.push(meta);
	}

	pageFlatList.sort((a, b) => a.relativeLink.localeCompare(b.relativeLink));

	// find groupings
	// grouping should be BEFORE the external sort
	// todo: we don't even have use for this yet!
	// pageFlatList.forEach(p => {
	// 	if (!findPageMetaParent(pageGroupedList, p)) {
	// 		pageGroupedList.push(p);
	// 	}
	// });

	if (compareFn) {
		pageFlatList.sort(compareFn);
	} else {
		pageFlatList.sort(DefaultPageMetaSorter);
	}

	return pageFlatList;
};

export const parsePageMetaNested = (args: {
	fileList: Record<string, unknown>;
	jsonList: Record<string, unknown>;
	imageMap: Map<string, string>;
	compareFn?: ParsePageMetaCompareFn;
}): PageMeta[] => {
	const pageFlatList = parsePageMeta(args.fileList, args.jsonList, args.imageMap, args.compareFn);
	const pageMap = new Map(pageFlatList.map(page => [page.relativeLink, page]));
	const nestedChildLinks = new Set<string>();

	pageFlatList.forEach(page => {
		if (!page.relativeLink) {
			if (page.title === ".") {
				page.title = "Home";
			}
			return;
		}

		const parts = page.relativeLink.split("/");
		for (let i = parts.length - 1; i > 0; i--) {
			const parentLink = parts.slice(0, i).join("/");
			const parent = pageMap.get(parentLink);
			if (parent && page.relativeLink.startsWith(`${parent.relativeLink}/`)) {
				const alreadyNested = parent.nestedPages.some(nested => nested.relativeLink === page.relativeLink);
				if (!alreadyNested) {
					parent.nestedPages.push(page);
				}
				nestedChildLinks.add(page.relativeLink);
				break;
			}
		}
	});

	// dont include links that have parents in the base page list
	return pageFlatList.filter(page => !nestedChildLinks.has(page.relativeLink));
};

const AWins = -1;
const BWins = 1;

/**
 * Prioritizes, in order, recently lastUpdated or datePublished, has description, then title
 *
 * @param a
 * @param b
 * @constructor
 */
export const DefaultPageMetaSorter: ParsePageMetaCompareFn = (a, b) => {
	const aDate = a.lastUpdated || a.datePublished;
	const bDate = b.lastUpdated || b.datePublished;

	if (aDate && !bDate) {
		return AWins;
	} else if (!aDate && bDate) {
		return BWins;
	} else if (aDate && bDate) {
		// we invert the value because we want the dates to be in descending order
		return -aDate.localeCompare(bDate);
	}

	if (a.description && !b.description) {
		return AWins;
	} else if (!a.description && b.description) {
		return BWins;
	}

	return a.title.localeCompare(b.title);
};

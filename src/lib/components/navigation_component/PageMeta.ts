import type { RawGlob } from "$pkg/util/util";

export interface PageMeta {
	// generated meta
	relativeLink: string;
	nestedPages: PageMeta[];

	// defined meta
	title: string; // defaults to directory name
	tags: string[];

	/**
	 * imageID is an ID that NavigationComponent can use to identify imported images
	 *
	 * To use imageID:
	 * 1. Add the imageID entry to the meta.json for the page
	 * 2. Create a typescript file with the variable ImageMap: Map<string, string>
	 * 3. Add a new entry with your imageID as key, and the image url as the value. Since this is
	 * Typescript, you can use import ImageUrl from "./path.png" as you would normally do.
	 * 4. Add ImageMap as an argument to your NavigationComponent.
	 * Overall, this involves four files
	 * - Your navigation page: ./+page.svelte
	 * - Your image map typescript: ImageMap.ts
	 * - The page you want with an image represented in the navigation: ./topic1/+page.svelte
	 * - The meta for that page: ./topic1/meta.json
	 */
	imageID?: string;

	/**
	 * imageURL is only limited to absolute paths (includes files in static folder)
	 */
	imageUrl?: string;
	imageAlt?: string;
	description?: string;
	datePublished?: string;
	lastUpdated?: string;
	shouldGroup?: boolean;
	shouldHide?: boolean;
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
		const pathParts = path.split("/");
		pathParts.pop();

		// get title
		// const title = pathParts[pathParts.length - 1].replaceAll("-", " ");

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
	}

	return pageFlatList;
};
<!--
OverridableMeta is convenient Svelte component allowing each page to override the head meta values
based on their +page.ts.

For example:
<code>
// +page.ts

import type { OverridableMetaProps } from "$pkg";

export const load = async (): Promise<OverridableMetaProps> => {
	return {
		title: "CustomTitle",
	};
};
</code>
-->

<script lang="ts">
	import { page } from "$app/state";
	import { pinyaHead } from "$pkg/ui/templates/runes.svelte";

	interface Props {
		rootUrl?: string;
		title?: string;
		ogTitle?: string;
		ogDescription?: string;
		ogImage?: string[];
	}

	let {
		rootUrl = undefined,
		title = undefined,
		ogTitle = undefined,
		ogDescription = undefined,
		ogImage = []
	}: Props = $props();

	if (rootUrl) {
		pinyaHead.rootUrl = rootUrl;
	}
	if (title) {
		pinyaHead.title = title;
	}
	if (ogTitle) {
		pinyaHead.ogTitle = ogTitle;
	}
	if (ogDescription) {
		pinyaHead.ogDescription = ogDescription;
	}
	if (ogImage) {
		pinyaHead.ogImage = ogImage.map(img => {
			if (img.startsWith('/')) {
				return `${pinyaHead.rootUrl}${img}`
			}

			return img;
		});
	}
</script>

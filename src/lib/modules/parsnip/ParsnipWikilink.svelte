<script lang="ts">
	import { getWebBaseUrl } from "$pkg/util/env-getter";

	interface Wikilink {
		type: "wikilink",
		value: string;
		fileAccessor: {
			target: string;
			isEmbed: false;
			basePath: string;
			slug: string;
		}
	}

	const { wikilink }: { wikilink: Wikilink } = $props();
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
<a href={`${getWebBaseUrl()}/${wikilink.fileAccessor.slug}`} data-sveltekit-reload>{wikilink.fileAccessor.target}</a>

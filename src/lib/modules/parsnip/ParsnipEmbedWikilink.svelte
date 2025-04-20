<script lang="ts">
	import { getCmsBaseUrl } from "$pkg/util/env-getter";

	interface EmbedWikilink {
		type: 'embedWikilink',
		value: string;
		fileAccessor: {
			target: string;
			isEmbed: false;
			basePath: string;
		}
	}

	const { wikilink } : { wikilink: EmbedWikilink } = $props();
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
<img src={`${getCmsBaseUrl()}/${wikilink.fileAccessor.basePath}`} alt=""/>

<script lang="ts">
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
<img src={`${import.meta.env.VITE_PARSNIP_BASE_URL}/${wikilink.fileAccessor.basePath}`} alt=""/>

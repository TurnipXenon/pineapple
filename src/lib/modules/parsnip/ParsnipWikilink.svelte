<script lang="ts">
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
	console.log(wikilink);
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
<a href={`${import.meta.env.VITE_WEB_BASE_URL}/${wikilink.fileAccessor.slug}`}>{wikilink.fileAccessor.target}</a>

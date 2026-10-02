<script lang="ts">
	import { getCmsBaseUrl } from "$pkg/util/env-getter";
	import { getParsnipImageData, type ParsnipEmbedWikilink } from "./imageMetadata";
	import ParsnipImageMedia from "./ParsnipImageMedia.svelte";

	const { wikilink }: { wikilink: ParsnipEmbedWikilink } = $props();
	const image = $derived(getParsnipImageData(wikilink, getCmsBaseUrl()));
</script>

<ParsnipImageMedia url={image.src} alt={image.alt} imageMetadata={image.metadata} />

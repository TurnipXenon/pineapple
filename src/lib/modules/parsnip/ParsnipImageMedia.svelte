<script lang="ts">
	import {
		imageDimensionStyle,
		normalizeImageMetadata,
		type ParsnipImageMetadata
	} from "./imageMetadata";

	const {
		url,
		alt,
		title,
		imageMetadata
	}: {
		url: string;
		alt: string;
		title?: string | null;
		imageMetadata?: ParsnipImageMetadata;
	} = $props();
	const metadata = $derived(normalizeImageMetadata(imageMetadata));
	const presentation = $derived(metadata.presentation ?? "default");
</script>

<img
	class="parsnip-image-media"
	data-presentation={presentation}
	class:has-dimensions={!!(metadata.width || metadata.height)}
	class:has-width={!!metadata.width}
	src={url}
	{alt}
	title={title ?? undefined}
	width={metadata.width}
	height={metadata.height}
	style={imageDimensionStyle(metadata)}
/>

<style>
	img {
		aspect-ratio: auto;
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		min-width: 0;
		margin: auto;
		object-fit: contain;
		border-radius: var(--radius-sm);
	}

	img[data-presentation="default"]:not(.has-dimensions) {
		max-height: min(50vh, 24lh);
	}

	img[data-presentation="inset"]:not(.has-width) {
		max-width: min(100%, 24rem);
	}

	img[data-presentation="wide"] {
		width: 100%;
	}

	img.has-dimensions {
		max-height: none;
	}
</style>

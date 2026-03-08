<script lang="ts">

	import { getPhotoCollectionMeta } from "$pkg/modules/parsnip/external-images/externalImages.remote";
	import ParsnipImage from "$pkg/modules/parsnip/external-images/ParsnipImage.svelte";
	import type { Image } from "mdast";
	import { untrack } from "svelte";

	const { url, imageList }: { url?: string, imageList?: Image[] } = $props();

	const withDescription = untrack(() => url?.includes("with-description=true") ?? false);

	let data = $state<{
		photos: {
			id: string,
			mediaUrl: string,
			altText?: string,
			description?: string,
			tags?: string[]
		}[]
	} | undefined>();

	$effect(() => {
		if (url) {
			getPhotoCollectionMeta(url)
				.then(d => data = d);
		}
	});
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
{#if imageList}
	<div class="parsnip-image-collection">
		{#each imageList as image (image.url)}
			<ParsnipImage url={image.url} alt="" />
		{/each}
	</div>
{:else if data}
	<div class="parsnip-image-collection">
		{#each data.photos as photo (photo.id)}
			<ParsnipImage url={photo.mediaUrl} alt={photo.altText ?? ""} {withDescription} />
		{/each}
	</div>
{:else}
	<p>Loading...</p>
{/if}

<style>
    .parsnip-image-collection {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: stretch;
        gap: 0.5rem 0.5lh;
    }

    :global {
        .parsnip-image-collection > * {
            flex: 1 1 24rem;
            width: 0;
        }
    }
</style>

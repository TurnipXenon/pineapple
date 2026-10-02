<script lang="ts">
	import { getPhotoCollectionMeta } from "$pkg/modules/parsnip/external-images/externalImages.remote";
	import ParsnipImage from "$pkg/modules/parsnip/external-images/ParsnipImage.svelte";
	import { untrack } from "svelte";
	import type { ParsnipImageCollection } from "../imageMetadata";

	const { url, imageList }: { url?: string; imageList?: ParsnipImageCollection["children"] } =
		$props();
	const withDescription = untrack(() => url?.includes("with-description=true") ?? false);

	let data = $state<
		| {
				photos: {
					id: string;
					mediaUrl: string;
					altText?: string;
					description?: string;
					tags?: string[];
				}[];
		  }
		| undefined
	>();

	$effect(() => {
		if (url) {
			getPhotoCollectionMeta(url).then((d) => (data = d));
		}
	});
</script>

{#if imageList}
	<div class="parsnip-image-collection">
		{#each imageList as image (image)}
			<div class="parsnip-image-collection-item">
				<ParsnipImage {...image} />
			</div>
		{/each}
	</div>
{:else if data}
	<div class="parsnip-image-collection">
		{#each data.photos as photo (photo.id)}
			<div class="parsnip-image-collection-item">
				<ParsnipImage url={photo.mediaUrl} alt={photo.altText ?? ""} {withDescription} />
			</div>
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

	.parsnip-image-collection-item {
		flex: 1 1 24rem;
		min-width: 0;
		max-width: 100%;
	}
</style>

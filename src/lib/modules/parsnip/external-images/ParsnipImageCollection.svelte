<script lang="ts">

	import { getParagraphImageStateContext } from "$pkg/modules/parsnip/route-util/parsnipBlogContext.svelte";
	import { getPhotoMeta } from "./externalImages.remote";

	const { url }: { url: string } = $props();
	let alt = $state("");

	if (url.includes("rabiole") || url.includes("photo-gallery")) {
		getPhotoMeta(url)
			.then(data => {
				if (data) {
					alt = data;
				}
			});
	}

	getParagraphImageStateContext().value = "image-found";
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
<img src={url} {alt} />

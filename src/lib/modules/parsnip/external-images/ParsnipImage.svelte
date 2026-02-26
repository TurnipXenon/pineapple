<script lang="ts">

	import { getPhotoMeta } from "./externalImages.remote";

	const { url, alt = "" }: { url: string, alt: string } = $props();
	let _alt = $state(alt);

	$effect(() => {
		if (_alt) {
			return;
		}

		if (url.includes("rabiole") || url.includes("photo-gallery")) {
			getPhotoMeta(url).then(data => {
				if (data) _alt = data;
			});
		}
	});
</script>

<!-- todo(turnip): determine appropriate media -->
<!-- todo(turnip): add alt text -->
<img src={url} alt={_alt} />

<style>
	img {
			aspect-ratio: auto;
			display: block;
	}
</style>

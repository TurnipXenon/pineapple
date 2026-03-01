<script lang="ts">

	import { untrack } from "svelte";
	import { getPhotoDetails } from "./externalImages.remote";

	const { url, alt = "", withDescription = false }: { url: string, alt: string, withDescription?: boolean } = $props();
	let _alt = $state(untrack(() => alt));

	const showDescription = untrack(() => withDescription || url.includes("with-description=true"));

	const galleryBase = untrack(() => url
		.replace(/[?#].*$/, "")
		.replace(/^(https?:\/\/)(rabiole|photos)\./, "$1photo-gallery.")
		.replace(/\/(api\/)?photos\/.*$/, ""));

	let details = $state<{ altText: string, description: string, tags: string[], createdAt: string } | null>(null);

	$effect(() => {
		if (_alt && !showDescription) {
			return;
		}

		if (url.includes("rabiole") || url.includes("photo-gallery")) {
			getPhotoDetails(url).then(data => {
				if (data) {
					details = data;
					_alt = data.altText;
				}
			});
		}
	});
</script>

<!-- todo(turnip): determine appropriate media -->
{#if showDescription}
	<div class="parsnip-image-described">
		<img src={url} alt={details?.altText ?? _alt} />
		{#if details}
			<div class="parsnip-image-meta">
				{#if details.description}<p>{details.description}</p>{/if}
				{#if details.createdAt}<p class="date">{new Date(details.createdAt).toLocaleDateString()}</p>{/if}
				{#if details.tags.length}
					<ul class="tags">
						{#each details.tags as tag}
							<li><a href="{galleryBase}/photos?tags={tag}" target="_blank">{tag}</a></li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<img src={url} alt={_alt} />
{/if}

<style>
    img {
        aspect-ratio: auto;
        display: block;
        border-radius: var(--radius-sm);
        max-height: min(50vh, 24lh);
        margin: auto;
		    object-fit: contain;
    }

    .parsnip-image-described {
        border: 1px solid currentColor;
        border-radius: var(--radius-sm);
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .parsnip-image-meta {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .parsnip-image-meta p {
        margin: 0;
    }

    .parsnip-image-meta .date {
        opacity: 0.7;
        font-size: 0.875em;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .tags li {
        background: color-mix(in srgb, currentColor 10%, transparent);
        border-radius: 0.25rem;
        padding: 0.125rem 0.375rem;
        font-size: 0.8em;
    }

    .tags li a {
        text-decoration: none;
        color: inherit;
    }

    .tags li a:hover {
        text-decoration: underline;
    }
</style>

<script lang="ts">
	import { getCmsBaseUrl } from "$pkg/util/env-getter";
	import ParsnipImageMedia from "../ParsnipImageMedia.svelte";
	import {
		getParsnipImageData,
		shouldFetchPhotoDetails,
		type ParsnipImageProps
	} from "../imageMetadata";
	import { getPhotoDetails } from "./externalImages.remote";

	const {
		url,
		alt = "",
		title,
		fileAccessor,
		imageMetadata,
		withDescription = false
	}: ParsnipImageProps = $props();
	const image = $derived(
		getParsnipImageData({ url, alt, title, fileAccessor, imageMetadata }, getCmsBaseUrl())
	);
	const showDescription = $derived(
		!image.isLocal && (withDescription || (url?.includes("with-description=true") ?? false))
	);
	const galleryBase = $derived(
		image.src
			.replace(/[?#].*$/, "")
			.replace(/^(https?:\/\/)(rabiole|photos)\./, "$1photo-gallery.")
			.replace(/\/(api\/)?photos\/.*$/, "")
	);

	let details = $state<{
		altText: string;
		description: string;
		tags: string[];
		createdAt: string;
	} | null>(null);

	$effect(() => {
		const current = image;
		const description = showDescription;
		details = null;
		if (!shouldFetchPhotoDetails(current.src, current.alt, description, current.isLocal)) {
			return;
		}
		let active = true;
		getPhotoDetails(current.src).then((data) => {
			if (active && data) {
				details = data;
			}
		});
		return () => {
			active = false;
		};
	});
</script>

{#if showDescription}
	<div class="parsnip-image-described">
		<ParsnipImageMedia
			url={image.src}
			alt={details?.altText ?? image.alt}
			title={image.title}
			imageMetadata={image.metadata}
		/>
		{#if details}
			<div class="parsnip-image-meta">
				{#if details.description}<p>{details.description}</p>{/if}
				{#if details.createdAt}<p class="date">
						{new Date(details.createdAt).toLocaleDateString()}
					</p>{/if}
				{#if details.tags.length}
					<ul class="tags">
						{#each details.tags as tag, index (index)}
							<li>
								<a href={galleryBase + "/photos?tags=" + tag} target="_blank" rel="external"
									>{tag}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<ParsnipImageMedia
		url={image.src}
		alt={details?.altText ?? image.alt}
		title={image.title}
		imageMetadata={image.metadata}
	/>
{/if}

<style>
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

		a::after {
			top: -0.125lh;
			left: 0.2em;
		}
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

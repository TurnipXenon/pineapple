<script lang="ts">
	import {
		imageDimensionStyle,
		normalizeImageMetadata,
		type ParsnipImageMetadata
	} from "./imageMetadata";
	import { PinyaButton } from "$pkg/ui/elements/index";

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

	let showImage = $state(false);

	const zoomOutClick = () => {
		showImage = false;
	}

	const zoomInClick = () => {
		showImage = true;
	};

	// dont add listener for every image
	$effect(() => {
		if (!showImage) {
			return;
		}
		const onKeydown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				zoomOutClick();
			}
		};
		window.addEventListener("keydown", onKeydown);
		return () => window.removeEventListener("keydown", onKeydown);
	});
</script>

{#snippet renderImage(actualPresentation: string)}
	<img
		class="parsnip-image-media"
		data-presentation={actualPresentation}
		class:has-dimensions={!!(metadata.width || metadata.height || actualPresentation === "full")}
		class:has-width={!!metadata.width || actualPresentation === "full"}
		src={url}
		{alt}
		title={title ?? undefined}
		width={metadata.width}
		height={metadata.height}
		style={imageDimensionStyle(metadata)}
	/>
{/snippet}

{#if (showImage)}
	<div
		onclick={zoomOutClick}
		class="parsnip-overlay"
		role="presentation"
	>
		<PinyaButton
			class="btn-parsnip-overlay-close"
			onclick={zoomOutClick}
			aria-label="Close"
		>
			✕
		</PinyaButton>
		{@render renderImage("full")}
	</div>
{/if}

<div class="parsnip-media-container">
	<PinyaButton class="btn-parsnip-media-zoom" onclick={zoomInClick}>
		Zoom in
	</PinyaButton>
	{@render renderImage(presentation)}
</div>


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

    .parsnip-media-container {
        position: relative;
    }

    :global(.btn-parsnip-media-zoom) {
        position: absolute;
        bottom: 4px;
        right: 4px;
        z-index: 1;
		    opacity: 0.8;
    }

    .parsnip-overlay {
        position: fixed;
		    width: 100%;
		    height: 100%;
				top: 0;
		    left: 0;
		    z-index: 150;
		    background-color: rgba(0, 0, 0, 0.5);

		    img {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            width: 100%;
				    height: 100%;
		    }
    }

    :global(.btn-parsnip-overlay-close) {
		    position: fixed;
		    top: 1lh;
		    right: 1em;
		    z-index: 151;
    }
</style>

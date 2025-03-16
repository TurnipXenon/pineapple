<script lang="ts">
    import {LazyAssetStatus, LazyAssetType} from "$lib/components/LazyAssetType";
    import BgTiledAres from "$lib/assets/bg_tiled/bg_tiled_ares.png";
    import {onMount} from "svelte";


	// in pixels

	// playsinline autoplay muted loop
	// whatever your heart's content
	interface Props {
		src: string;
		alt: string;
		width: string;
		height: string;
		props?: any;
	}

	let {
		src,
		alt,
		width,
		height,
		props = $bindable({})
	}: Props = $props();
	// todo: add size and alt text

	props = {
		...props,
		alt,
		width,
		height
	};

	// auto detect asset type
	let extension = $state("");
	const getAssetType = (): LazyAssetType => {
		const srcArray = src.split(".");
		extension = srcArray[srcArray.length - 1];
		switch (extension) {
			case "png":
			case "webp":
			case "gif":
			case "jpg":
				return LazyAssetType.Image;
			case "ogg":
			case "webm":
			case "mp4":
				return LazyAssetType.Video;
			default:
				console.log(`Unknown asset type for: ${src}`);
				return LazyAssetType.Unknown;
		}
	};
	const assetType: LazyAssetType = getAssetType();

	let actualSrc = $state("");
	let status: LazyAssetStatus = $state(LazyAssetStatus.Loading);

	onMount(async () => {
		const path = src.includes("https://") ? src : `${window.location.origin}${src}`;

        switch(assetType) {
            case LazyAssetType.Image: {
                const img = new Image();
                img.onload = () => {
                    actualSrc = path;
                    status = LazyAssetStatus.Loaded;
                }
                img.src = path;
                break;
            }
            case LazyAssetType.Video: {
                fetch(path)
                    .then(resp => resp.blob())
                    .then(blob => {
                        actualSrc = URL.createObjectURL(blob);
                        status = LazyAssetStatus.Loaded;
                    })
                    .catch(error => {
                        console.warn(error);
                        status = LazyAssetStatus.Error;
                    });
                break;
            }
            case LazyAssetType.Unknown: {
                console.warn("Unknown asset: ", path)
                status = LazyAssetStatus.Error;
                break;
            }

        }
	});
</script>

{#if status === LazyAssetStatus.Loaded}
	{#if assetType === LazyAssetType.Image}
		<img src={actualSrc} alt="Placeholder image" {...props} />
	{:else if assetType === LazyAssetType.Video}
		<video playsinline autoplay muted loop {...props} poster={BgTiledAres} style="object-fit: scale-down">
			<source src={actualSrc} type={`video/${extension}`} />
			Your browser does not support the video tag.
		</video>
	{:else}
		<img src={actualSrc} alt="Placeholder image" />
	{/if}
{:else}
	<img class="rotate" src={BgTiledAres} {...props} style="object-fit: scale-down" />
{/if}

<style lang="postcss">
    .rotate {
        animation: rotation 4s infinite linear;
    }

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
</style>

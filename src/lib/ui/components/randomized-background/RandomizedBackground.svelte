<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { fade } from 'svelte/transition';

	import BgTiledAres from '$pkg/assets/bg_tiled/bg_tiled_ares.png';
	import BgTiledCorn from '$pkg/assets/bg_tiled/bg_tiled_corn.png';
	import BgTiledPineapple from '$pkg/assets/bg_tiled/bg_tiled_pineapple.png';
	import BgTiledReinhard from '$pkg/assets/bg_tiled/bg_tiled_reinhard.png';
	import BgTiledTomato from '$pkg/assets/bg_tiled/bg_tiled_tomato.png';
	import BgTiledTurnip from '$pkg/assets/bg_tiled/bg_tiled_turnip.png';
	import RandomizedImage from '$pkg/ui/components/randomized-background/RandomizedImage.svelte';
	import { generatedDailySeed, mulberry32Generator } from '$pkg/util/util';
	import { appState } from "$pkg/ui/templates/PinyaPageLayout/pinyaPageLayoutRunes.svelte.js";

	let { enabled }: {
		enabled: boolean
	} = $props();

	const imageList = [BgTiledAres, BgTiledCorn, BgTiledPineapple, BgTiledReinhard, BgTiledTomato, BgTiledTurnip];

	const seed = generatedDailySeed();
	const rng = mulberry32Generator(seed);

	const shuffle = <T>(array: T[]): T[] => {
		// from: community wiki @ https://stackoverflow.com/a/2450976/17836168
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(rng() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	};

	let generatedImageList: string[] = $state([]);

	$effect(() => {
		let gi: string[] = [];
		for (let i = 0; i < 20; i++) {
			shuffle(imageList);
			gi = gi.concat(imageList);
		}
		generatedImageList = gi;
	});

	let bgStyle = $derived(`opacity: ${appState.bgOpacity}`);
</script>

<svelte:head>
	<!-- from: https://dev.to/khromov/preloading-images-in-svelte-465h	-->
	{#each imageList as image, idx (idx)}
		<link rel="preload" as="image" href={image} />
	{/each}
	<link
		as="video"
		href="https://video.twimg.com/ext_tw_video/1318728494256410624/pu/vid/640x360/TMklz6hiTkQu3xhn.mp4"
		rel="preload"
	/>
</svelte:head>

<!--todo: add a letterbox beyond 1960px + 16 rem-->
{#if enabled && generatedImageList.length > 0}
	<div
		class="default-background"
		aria-hidden="true"
		style={bgStyle}
		transition:fade
	>
		{#each generatedImageList as imageItem, idx (idx)}
			<RandomizedImage src={imageItem} {rng} />
		{/each}
	</div>
{/if}

<style>
    .default-background {
        position: fixed;
        display: flex;
        top: -8rem;
        left: 50%;
        transform: translate(-50%, 0);
        width: calc(100vw + 16rem);
        max-width: 1960px;
        height: calc(100vh + 16rem);
        flex-wrap: wrap;
        overflow: hidden;
        z-index: -10;
    }
</style>

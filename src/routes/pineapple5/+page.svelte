<script lang="ts">
	import { localizeHref } from "$pkg/external/paraglide/runtime.js";
	import { PinyaCard } from "$pkg/ui/elements/PinyaCard/index";
	import { PinyaButton } from "$pkg/ui/elements/PinyaButton/index";
	import { enableUniversalOverlaySvelte4 } from "$pkg";
	import { setIgnoreOverlayOverride } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { onMount } from "svelte";

	setIgnoreOverlayOverride(true);
	onMount(() => {
		enableUniversalOverlaySvelte4.set(true);
	});
</script>

<PinyaCard>
	<main>
		<h1 class="mb-8" style="font-weight: bolder">Pineapple 5: Directory</h1>

		<div class="turnip-menu">
			<PinyaButton
				classes="text-wrap"
				onclick={() => {location.href = localizeHref('pineapple');}}
			>
				Pineapple playground
			</PinyaButton>
			<PinyaButton
				classes="text-wrap"
				onclick={() => {location.href = localizeHref('seaweed2');}}
			>
				<div class="text-wrap">
					Seaweed playground
				</div>
			</PinyaButton>
			<PinyaButton onclick={() => {location.href = localizeHref('components');}}>
				Components
			</PinyaButton>
			<PinyaButton onclick={() => {location.href = localizeHref('pineapple5');}}>
				Pineapple 5
			</PinyaButton>
		</div>
	</main>
</PinyaCard>

<style>
    .turnip-menu {
        padding: 2em;
        display: flex;
        gap: 2em;
        flex-direction: column;
    }

    main {
        display: flex;
        flex-direction: column;
        text-align: start;
        gap: 0.5lh;
    }
</style>

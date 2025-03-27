<script lang="ts">
	import { localizeHref } from "$pkg/paraglide/runtime.js";
	import { PinyaCard } from "$pkg/ui/elements/PinyaCard/index";
	import { PinyaButton } from "$pkg/ui/elements/PinyaButton/index";
</script>

<PinyaCard>
	<main>
		<h1 class="mb-8" style="font-weight: bolder">Directory</h1>

		<div class="turnip-menu">
			<PinyaButton onclick={() => {location.href = localizeHref('pineapple');}}>
				<div class="text-wrap">
					Pineapple playground (still broken)
				</div>
			</PinyaButton>
			<PinyaButton onclick={() => {location.href = localizeHref('seaweed2');}}>
				Seaweed <b>2</b> playground
			</PinyaButton>
			<PinyaButton onclick={() => {location.href = localizeHref('components');}}>
				Components
			</PinyaButton>
			<PinyaButton disabled={true} onclick={() => {}}>
				Seaweed (deprecated)
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

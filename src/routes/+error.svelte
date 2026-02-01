<script lang="ts">
	import { browser } from "$app/environment";
	import { onDestroy, onMount } from "svelte";
	import { ErrorYarn } from "./ErrorYarn";
	import { PinyaCard } from "$pkg/ui/elements/index";
	import { appState, PinyaBase, PinyaPageLayout } from "$pkg/ui/templates/index";
	import { dialogManager } from "$pkg";

	appState.allowDialog = true;
	appState.enableDialogOnByDefault = true;

	onMount(() => {
		ErrorYarn.setDialogTree();
	});

	onDestroy(() => {
		if (browser) {
			dialogManager.toggleDialogOverlay();
		}
	});
</script>

<PinyaBase>
	<PinyaPageLayout>
		<PinyaCard widthClass="w-lg">
			<h1>Page not found...</h1>
			<p>Have a farting seal</p>

			<blockquote class="twitter-tweet">
				<p dir="ltr" lang="en">
					Going to be 96 years old showing this to the geriatric ward nurses my pushing the emergency help button and they
					run in and i just show them this for the 30th time that day <a href="https://t.co/YqjP1Uox2Q"
				>pic.twitter.com/YqjP1Uox2Q</a
				>
				</p>
				&mdash; ᶻ 𝗓 𐰁 (@felidfang)<a href="https://twitter.com/felidfang/status/1325145574572744705?ref_src=twsrc%5Etfw"
			>November 7, 2020</a
			>
			</blockquote>
			<script async charset="utf-8" src="https://platform.twitter.com/widgets.js"></script>
		</PinyaCard>
	</PinyaPageLayout>
</PinyaBase>

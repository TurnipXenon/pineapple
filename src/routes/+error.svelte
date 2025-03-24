<script>
	import { onDestroy } from "svelte";
	import { dialogManager } from "$lib/components/dialog_manager/DialogManagerStore.ts";
	import { ErrorYarn } from "./ErrorYarn";

	ErrorYarn.setDialogTree();

	onDestroy(() => {
		dialogManager.setDialogToDefault();
	});
</script>

<div class="card default-card">
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
</div>

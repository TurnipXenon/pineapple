<script lang="ts">
	import { type EntryProps } from "./EntryProps";
	import { ItchLogoHotLink } from "$pkg/consts";
	import Card from "$pkg/components/Card.svelte";

	export let props: EntryProps;
</script>
<Card overrideStyle="align-self: flex-start;">
	<section class="game-card itch-promo" slot="content">
		<h1 class="mb-12 text-center">Check out my itch.io page for more games</h1>

		<section class="game-link-section">
			<button type="button" class="btn variant-filled-primary turnip-button"
			        role="link"
			        title="https://turnipxenon.itch.io/"
			        on:click={() => window.open("https://turnipxenon.itch.io/")}>
				<img src={ItchLogoHotLink} class="long-btn-image" alt="itch icon">
				<span>TurnipXenon</span>
			</button>
		</section>

	</section>
</Card>

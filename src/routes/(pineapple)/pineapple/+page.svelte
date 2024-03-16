<script lang="ts">
	import { PUBLIC_CRINGE_USERNAME } from "$env/static/public";
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "./TestCard.svelte";

	let testingQueueNumber = 1;
	const testingRandomPhrases = [
		"Niko",
		"Niko the Baikal seal",
		"Niko the Baikal seal\nfrom Toba Aquarium"
	];
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_CRINGE_USERNAME}'s Home</title>
	<meta content="Welcome to {PUBLIC_CRINGE_USERNAME}'s Home" name="og:title" />
	<meta
		content="Welcome to {PUBLIC_CRINGE_USERNAME}'s home! It's a neat place to be at if you're feeling lost. Come hang around!"
		name="og:description"
	/>
</svelte:head>

<div class="card default-card">

	<button
		class="btn variant-filled-secondary"
		on:click={() => {
			showComponentInToast({component: TestCard});
		}}><h3>Test custom toast</h3></button>
	<button
		class="btn variant-filled-secondary"
		on:click={() => {
			showTextInToast(`${testingQueueNumber} ${testingRandomPhrases[testingQueueNumber]}`);
			testingQueueNumber = (testingQueueNumber + 1) % testingRandomPhrases.length;
		}}><h3>Handy toast</h3></button>
</div>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
</style>

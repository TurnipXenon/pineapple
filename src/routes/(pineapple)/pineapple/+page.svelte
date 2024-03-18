<script lang="ts">
	import { PUBLIC_CRINGE_USERNAME } from "$env/static/public";
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import { parseYarn } from "$pkg/scripts/pineapple_fiber/PineappleFiberParser";
	import { dialogManager } from "$pkg";

	let testingQueueNumber = 1;
	const testingRandomPhrases = [
		"Niko",
		"Niko the Baikal seal",
		"Niko the Baikal seal\nfrom Toba Aquarium"
	];

	const dialogTree = parseYarn(TestDialogYarn);
	// todo: parse the result
	// todo: run the interpreter when needed
	// todo: do parsing in dialogManager
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
			showComponentInToast({componentAndProps: {component: TestCard, props: undefined}});
		}}><h3>Test custom toast</h3></button>
	<button
		class="btn variant-filled-secondary"
		on:click={() => {
			showTextInToast(`${testingQueueNumber} ${testingRandomPhrases[testingQueueNumber]}`);
			testingQueueNumber = (testingQueueNumber + 1) % testingRandomPhrases.length;
		}}><h3>Handy toast</h3></button>
	<button
		class="btn variant-filled-secondary"
		on:click={() => {
				dialogManager.setDialogTree(dialogTree);
				dialogManager.toggleDialogOverlay();
		}}><h3>Test dialog</h3></button>
</div>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
</style>

<script lang="ts">
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import { Card, dialogManager } from "$pkg";


	let testingQueueNumber = 1;
	const testingRandomPhrases = [
		"Niko",
		"Niko the Baikal seal",
		"Niko the Baikal seal\nfrom Toba Aquarium"
	];
	const testDialogYarn = TestDialogYarn;

	let parsed = false;
	const onTestDialogClick = () => {
		if (!parsed) {
			dialogManager.parseAndSetDialogTree(testDialogYarn).then(() => {
				dialogManager.toggleDialogOverlay();
			});
			parsed = true;
		} else {
			dialogManager.toggleDialogOverlay();
		}
	};
</script>

<Card>
	<div slot="content" class="default-card">
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
			on:click={onTestDialogClick}><h3>Test dialog</h3></button>
	</div>
</Card>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
</style>

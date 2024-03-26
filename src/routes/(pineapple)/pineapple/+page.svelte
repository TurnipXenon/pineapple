<script lang="ts">
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import { Card, dialogManager } from "$pkg";
	import NavigationComponent from "$pkg/components/navigation_component/NavigationComponent.svelte";
	import { ImageMap } from "./(extra-pages)/ImageMap";

	// region Toast test scripts
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
	// endregion


	// todo: fix fragile relative reference to the root
	const fileList = import.meta.glob("./**/+page.svelte", { query: "?raw" });
	const jsonList = import.meta.glob("./**/meta.json", { query: "?raw", eager: true });
</script>

<div class="pineapple-container">
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

	<NavigationComponent title="Navigation Component Test"
	                     fileList={fileList}
	                     jsonList={jsonList}
	                     imageMap={ImageMap}
	                     parentSubpath="/pineapple/">
	</NavigationComponent>
</div>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }

    .pineapple-container {
        display: flex;
        flex-direction: column;
    }
</style>

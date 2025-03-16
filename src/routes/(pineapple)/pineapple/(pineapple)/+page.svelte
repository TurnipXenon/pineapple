<script lang="ts">
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import { Card, dialogManager, enableDialogueOverlay } from "$pkg";
	import NavigationComponent from "$pkg/components/navigation_component/NavigationComponent.svelte";
	import { ImageMap } from "./ImageMap";
	import PineappleSlideToggle from "$pkg/components/PineappleSlideToggle.svelte";

	enableDialogueOverlay.set(false);

	// region Toast test scripts
	let testingQueueNumber = $state(1);
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
	const fileList = import.meta.glob("./../**/+page.svelte", { query: "?raw" });
	const jsonList = import.meta.glob("./../**/meta.json", { query: "?raw", eager: true });
	let allowPagination = $state(true);
</script>

<Card>
	{#snippet content()}
		<div  class="default-card">
			<button
				class="btn preset-filled-secondary-500"
				onclick={() => {
			showComponentInToast({componentAndProps: {component: TestCard, props: undefined}});
		}}><h3>Test custom toast</h3></button>
			<button
				class="btn preset-filled-secondary-500"
				onclick={() => {
			showTextInToast(`${testingQueueNumber} ${testingRandomPhrases[testingQueueNumber]}`);
			testingQueueNumber = (testingQueueNumber + 1) % testingRandomPhrases.length;
		}}><h3>Handy toast</h3></button>
			<button
				class="btn preset-filled-secondary-500"
				onclick={onTestDialogClick}><h3>Test dialog</h3></button>
			<div>
				<PineappleSlideToggle name="advanced-setting-slider"
				                      bind:checked={allowPagination}>
					Allow pagination: {allowPagination ? "On" : "Off"}
				</PineappleSlideToggle>
			</div>
		</div>
	{/snippet}
</Card>

<NavigationComponent title="Navigation Component Test"
                     fileList={fileList}
                     jsonList={jsonList}
                     imageMap={ImageMap}
                     shouldAllowControl={allowPagination}
                     parentSubpath="/pineapple/">
</NavigationComponent>

<style lang="postcss">
    .default-card {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }
</style>

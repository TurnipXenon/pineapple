<script lang="ts">
	import { showComponentInToast, showTextInToast } from "$pkg/components/pineapple/toast/Toast";
	import TestCard from "$pkg/components/pineapple/toast/custom-toast/TestCustomToast.svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import NavigationMenu from "$pkg/ui/modules/NavigationMenu/NavigationMenu.svelte";
	import { ImageMap } from "./ImageMap";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import { getDialogManager } from "$pkg/components/dialog_manager/DialogMangerInit";
	import PinyaCard from "$pkg/ui/elements/PinyaCard/PinyaCard.svelte";
	import { PinyaButton } from "$pkg/ui/elements/index";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";

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
		getDialogManager().then(dm => {
			if (!parsed) {
				dm.parseAndSetDialogTree(testDialogYarn).then(() => {
					dm.toggleDialogOverlay();
				});
				parsed = true;
			} else {
				dm.toggleDialogOverlay();
			}
		});
	};
	// endregion

	// todo: fix fragile relative reference to the root
	const fileList = import.meta.glob("./../**/+page.svelte", { query: "?raw" });
	const jsonList = import.meta.glob("./../**/meta.json", { query: "?raw", eager: true });
	let allowPagination = $state(true);
</script>

<div class="mb-8">
	<PinyaCard widthClass="w-auto" flexClass="flex flex-row gap-4 items-center justify-center flex-wrap">
		<PinyaButton
			onclick={() => {
			showComponentInToast({componentAndProps: {component: TestCard, props: undefined}});
		}}>
			<div class="fake-h4">Test custom toast</div>
		</PinyaButton>
		<PinyaButton
			onclick={() => {
			showTextInToast(`${testingQueueNumber} ${testingRandomPhrases[testingQueueNumber]}`);
			testingQueueNumber = (testingQueueNumber + 1) % testingRandomPhrases.length;
		}}>
			<div class="fake-h4">Handy toast</div>
		</PinyaButton>
		<PinyaButton
			onclick={onTestDialogClick}
		>
			<div class="fake-h4">Test dialog</div>
		</PinyaButton>
		<div>
			<PineappleSwitch
				name="advanced-setting-slider"
				bind:checked={allowPagination}>
				Allow pagination: {allowPagination ? "On" : "Off"}
			</PineappleSwitch>
		</div>
	</PinyaCard>
</div>

<NavigationMenu
	title="Navigation Component Test"
	fileList={fileList}
	jsonList={jsonList}
	imageMap={ImageMap}
	shouldAllowControl={allowPagination}
	parentSubpath="/pineapple/">
</NavigationMenu>

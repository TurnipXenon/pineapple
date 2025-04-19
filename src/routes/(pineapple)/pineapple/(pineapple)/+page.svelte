<script lang="ts">
	import { onMount } from "svelte";
	import TestDialogYarn from "./TestDialog.yarn?raw";
	import NavigationMenu from "$pkg/ui/modules/NavigationMenu/NavigationMenu.svelte";
	import { ImageMap } from "./ImageMap";
	import { enableDialogueOverlay } from "$pkg/components/dialog_manager/DialogManagerStore";
	import PinyaCard from "$pkg/ui/elements/PinyaCard/PinyaCard.svelte";
	import { PinyaButton } from "$pkg/ui/elements/index";
	import PineappleSwitch from "$pkg/ui/elements/PineappleSwitch.svelte";
	import { dialogManager } from "$pkg";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	enableDialogueOverlay.set(false);

	let parsed = false;
	const onTestDialogClick = () => {
		if (!parsed) {
			dialogManager.parseAndSetDialogTree(TestDialogYarn).then(() => {
				dialogManager.toggleDialogOverlay();
			});
			parsed = true;
		} else {
			dialogManager.toggleDialogOverlay();
		}
	};

	// todo: fix fragile relative reference to the root
	const fileList = import.meta.glob("./../**/+page.svelte", { query: "?raw" });
	const jsonList = import.meta.glob("./../**/meta.json", { query: "?raw", eager: true });
	let allowPagination = $state(true);
</script>

<div class="mb-8">
	<PinyaCard widthClass="w-auto" flexClass="flex flex-row gap-4 items-center justify-center flex-wrap">
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
	parentSubpath="/pineapple/"
	parsnipOverall={data.parsnipOverall}
>
</NavigationMenu>

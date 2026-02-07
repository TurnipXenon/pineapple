<script lang="ts">
	import { enableUniversalOverlaySvelte4 } from "$pkg";
	import { appState } from "$pkg/ui/templates/index";
	import {
		setEnableDialogOverlayContext,
		setEnableDialogPreferenceContext,
		setEnablePortraitContext,
		setIgnoreOverlayOverride,
		setOverlayTypeContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { createLocalStore } from "$pkg/util/localStore.svelte";
	import { onMount } from "svelte";

	let { children } = $props();

	setEnablePortraitContext(createLocalStore("enable-portrait"));
	setOverlayTypeContext(createLocalStore("overlay-type"));

	/**
	 * how do we want to use this context???
	 *
	 * let testValue = getContext(key)
	 *
	 * testValue.value <= read
	 * testValue.setValue(value) = write
	 *
	 *
	 * let c = getContext('enablePortraitContext');
	 * c.value?
	 * c.setValue
	 */

	// special logic since we would need to change the extensions for all the typescript code if we dont
	const enableDialogPrefStore = createLocalStore("enable-dialog-preference");
	setEnableDialogPreferenceContext(enableDialogPrefStore);

	let enableDialog = $state({ value: enableDialogPrefStore.value });
	setEnableDialogOverlayContext(enableDialog);
	let ignoreOverlaySet = $state({ value: true });
	setIgnoreOverlayOverride(ignoreOverlaySet);
	onMount(() => {
		enableUniversalOverlaySvelte4.subscribe((value) => {
			if (appState.allowDialog === false && value) {
				// force disable if appState allowDialog = false
				enableUniversalOverlaySvelte4.set(false);
				enableDialog.value = false;
				return;
			}

			if (appState.enableDialogOnByDefault === false) {
				enableDialog.value = false;
				return;
			}

			if (ignoreOverlaySet.value) {
				ignoreOverlaySet.value = false;
				// force initial value?
				enableUniversalOverlaySvelte4.set(enableDialogPrefStore.value);
				enableDialog.value = enableDialogPrefStore.value;
			} else {
				enableDialog.value = value;
			}
		});

		// if putting more onMount here, maybe add some associations to not make code confusing
	});
</script>

{@render children()}

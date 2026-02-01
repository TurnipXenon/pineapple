<script lang="ts">
	import { enableUniversalOverlaySvelte4 } from "$pkg";
	import {
		getIgnoreOverlayOverride,
		setEnableDialogOverlayContext,
		setEnableDialogPreferenceContext,
		setEnablePortraitContext,
		setIgnoreOverlayOverride,
		setOverlayTypeContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions.svelte";
	import { createLocalStore } from "$pkg/util/localStore.svelte";
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

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

	const enableDialogOverlayStore = writable($enableDialogPrefStore);
	setEnableDialogOverlayContext(enableDialogOverlayStore);
	setIgnoreOverlayOverride(true);
	let ignoreOverlaySet = getIgnoreOverlayOverride();
	onMount(() => {
		enableUniversalOverlaySvelte4.subscribe((value) => {
			if (ignoreOverlaySet) {
				ignoreOverlaySet = false;
				// force initial value?
				enableUniversalOverlaySvelte4.set($enableDialogPrefStore);
				enableDialogOverlayStore.set($enableDialogPrefStore);
			} else {
				enableDialogOverlayStore.set(value);
			}
		});

		// if putting more onMount here, maybe add some associations to not make code confusing
	});
</script>

{@render children()}

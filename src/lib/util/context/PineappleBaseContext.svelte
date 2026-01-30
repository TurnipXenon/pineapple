<script lang="ts">
	import { enableUniversalOverlaySvelte4 } from "$pkg";
	import {
		getEnableDialogOverlayContext, getIgnoreOverlayOverride,
		setEnableDialogOverlayContext,
		setEnablePortraitContext, setIgnoreOverlayOverride,
		setOverlayTypeContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions";
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
	setEnableDialogOverlayContext(createLocalStore("enable-dialog-overlay"));
	let _enableDialogOverlayRunes = getEnableDialogOverlayContext();
	setIgnoreOverlayOverride(true);
	let ignoreOverlaySet = getIgnoreOverlayOverride();
	onMount(() => {
		enableUniversalOverlaySvelte4.subscribe((value) => {
			if (ignoreOverlaySet) {
				ignoreOverlaySet = false;
				// force initial value?
				enableUniversalOverlaySvelte4.set(_enableDialogOverlayRunes.value);
			} else {
				console.log('subscribing enable-dialog-overlay')
				_enableDialogOverlayRunes.value = value;
			}
		});

		// if putting more onMount here, maybe add some associations to not make code confusing
	});
</script>

{@render children()}

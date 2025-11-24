<script lang="ts">
	import {
		setEnableDialogOverlayContext,
		setEnablePortraitContext,
		setOverlayTypeContext
	} from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { createLocalStore } from "$pkg/util/localStore.svelte";

	let { children } = $props();

	setEnablePortraitContext(createLocalStore("enable-portrait"));
	setEnableDialogOverlayContext(createLocalStore("enable-dialog-overlay"));
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
</script>

{@render children()}

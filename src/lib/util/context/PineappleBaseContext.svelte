<script lang="ts">
	import { setEnablePortraitContext } from "$pkg/util/context/pineappleBaseContextDefinitions";
	import { createLocalStore } from "$pkg/util/localStore.svelte";

	let { children } = $props();

	setEnablePortraitContext(createLocalStore("enablePortrait"));

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

<script lang="ts">
	import { createLocalStore } from "$pkg/util/localStore.svelte";
	import { setContext } from "svelte";

	let { children } = $props();

	setContext("enablePortraitContext", createLocalStore("enablePortrait"));

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

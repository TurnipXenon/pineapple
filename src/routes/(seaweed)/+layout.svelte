<script lang="ts">
	import { initializeStores, Toast } from "@skeletonlabs/skeleton";
	import { Modal } from "@skeletonlabs/skeleton";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initializeStores();
</script>

<Modal />
<Toast />

{@render children?.()}

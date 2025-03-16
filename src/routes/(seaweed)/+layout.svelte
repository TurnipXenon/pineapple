<script lang="ts">
	import { ToastProvider } from "@skeletonlabs/skeleton-svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	initializeStores();
</script>

<!--todo: figure out modal-->
<!--<Modal />-->
<ToastProvider />

{@render children?.()}

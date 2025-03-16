<script lang="ts">
	import PinyaBaseLayout from "$pkg/components/pineapple/PineappleBaseLayout.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<PinyaBaseLayout showDialogByDefault={true}>
	{@render children?.()}
</PinyaBaseLayout>


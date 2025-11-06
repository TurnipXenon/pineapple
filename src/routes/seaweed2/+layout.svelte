<script lang="ts">
	import PinyaBase from "$pkg/ui/templates/pinya-base/pinyaBaseRunes.svelte.js";

	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>


<PinyaBase>
	{@render children?.()}
</PinyaBase>


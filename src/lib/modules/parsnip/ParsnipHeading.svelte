<script lang="ts">
	import ParsnipPhrasingChildren from "$pkg/modules/parsnip/ParsnipPhrasingChildren.svelte";
	import type { Heading } from "mdast";

	const { heading }: { heading: Heading } = $props();
</script>

{#if heading.depth === 1}
	<h2><ParsnipPhrasingChildren phrasingChildren={heading.children}/></h2>
{:else if heading.depth === 2}
	<h3><ParsnipPhrasingChildren phrasingChildren={heading.children}/></h3>
{:else if heading.depth === 3}
	<h4><ParsnipPhrasingChildren phrasingChildren={heading.children}/></h4>
{:else if heading.depth === 4}
	<h5><ParsnipPhrasingChildren phrasingChildren={heading.children}/></h5>
{:else if heading.depth === 5}
	<h6><ParsnipPhrasingChildren phrasingChildren={heading.children}/></h6>
{:else if heading.depth === 6}
	<p><ParsnipPhrasingChildren phrasingChildren={heading.children}/></p>
{/if}

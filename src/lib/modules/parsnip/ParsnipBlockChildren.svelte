<script lang="ts">
	import ParsnipHeading from "$pkg/modules/parsnip/ParsnipHeading.svelte";
	import ParsnipList from "$pkg/modules/parsnip/ParsnipList.svelte";
	import ParsnipParagraph from "$pkg/modules/parsnip/ParsnipParagraph.svelte";
	import ParsnipPhrasingChildren from "$pkg/modules/parsnip/ParsnipPhrasingChildren.svelte";
	import { CodeBlock } from "$pkg/ui/elements/index";
	import type { Content } from "mdast";
	import Self from "./ParsnipBlockChildren.svelte";

	const { blockChildren, shouldUnwrapParagraph = false }
		: { blockChildren: Content[], shouldUnwrapParagraph?: boolean } = $props();
</script>

{#each blockChildren as child (child)}
	{#if child.type === 'paragraph'}
		{#if shouldUnwrapParagraph}
			<ParsnipPhrasingChildren phrasingChildren={child.children} />
		{:else}
			<ParsnipParagraph paragraph={child} />
		{/if}
	{:else if child.type === 'heading'}
		<ParsnipHeading heading={child} />
	{:else if child.type === 'thematicBreak'}
		<hr>
	{:else if child.type === 'blockquote'}
		<!-- todo: do advanced things like callout blocks -->
		<blockquote>
			<Self blockChildren={child.children} />
		</blockquote>
	{:else if child.type === 'yaml'}
		<!-- do nothing -->
	{:else if child.type === 'code'}
		<CodeBlock code={child.value} lang={child.lang ?? 'markdown'} />
	{:else if child.type === 'list'}
		<ParsnipList list={child} />
	{:else}
		<p>{JSON.stringify(child, undefined, 2)}</p>
	{/if}
{/each}

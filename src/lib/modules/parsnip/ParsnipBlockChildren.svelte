<script lang="ts">
	import ParsnipImageCollection from "$pkg/modules/parsnip/external-images/ParsnipImageCollection.svelte";
	import ParsnipHeading from "$pkg/modules/parsnip/ParsnipHeading.svelte";
	import ParsnipList from "$pkg/modules/parsnip/ParsnipList.svelte";
	import ParsnipParagraph from "$pkg/modules/parsnip/ParsnipParagraph.svelte";
	import ParsnipPhrasingChildren from "$pkg/modules/parsnip/ParsnipPhrasingChildren.svelte";
	import type { CodeBlockLang } from "$pkg/ui/elements/CodeBlock/CodeBlockProps";
	import { CodeBlock } from "$pkg/ui/elements/index";
	import type { Content } from "mdast";
	import Self from "./ParsnipBlockChildren.svelte";

	const { blockChildren, shouldUnwrapParagraph = false }
		: { blockChildren: Content[], shouldUnwrapParagraph?: boolean } = $props();

	const KNOWN_BLOCK_TYPES = new Set(['paragraph', 'heading', 'thematicBreak', 'blockquote', 'yaml', 'code', 'list', 'imageCollection']);

	$effect(() => {
		for (const child of blockChildren) {
			if (!KNOWN_BLOCK_TYPES.has(child.type)) {
				console.warn('[Parsnip] Unknown block child type:', child.type, child);
			}
		}
	});

	function parseLang(lang: string | null | undefined): CodeBlockLang {
		return (lang ?? 'markdown') as CodeBlockLang;
	}
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
		<CodeBlock code={child.value} lang={parseLang(child.lang)} />
	{:else if child.type === 'list'}
		<ParsnipList list={child} />
	{:else if child.type === 'imageCollection'}
		<ParsnipImageCollection url="" imageList={child.children} />
	{/if}
{/each}

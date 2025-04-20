<script lang="ts">
	import ParsnipEmbedWikilink from "$pkg/modules/parsnip/ParsnipEmbedWikilink.svelte";
	import ParsnipWikilink from "$pkg/modules/parsnip/ParsnipWikilink.svelte";
	import { type PhrasingContent } from "mdast";
	import Self from "./ParsnipPhrasingChildren.svelte";

	const { phrasingChildren }: { phrasingChildren: PhrasingContent[] } = $props();
</script>

{#each phrasingChildren as child (child)}
	{#if child.type === 'text'}
		{child.value}
	{:else if child.type === 'strong'}
		<strong>
			<Self phrasingChildren={child.children} />
		</strong>
	{:else if child.type === 'inlineCode'}
		<code class="inline-code">{child.value}</code>
	{:else if child.type === 'link'}
		<a href={child.url}>
			<Self phrasingChildren={child.children} />
		</a>
	{:else if child.type === 'embedWikilink'}
		<ParsnipEmbedWikilink wikilink={child} />
	{:else if child.type === 'wikilink'}
		<ParsnipWikilink wikilink={child} />
	{:else }
		{JSON.stringify(child, undefined, 2)}
	{/if}
{/each}

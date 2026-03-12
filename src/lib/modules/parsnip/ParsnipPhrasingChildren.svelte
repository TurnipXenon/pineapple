<script lang="ts">
	import ParsnipImage from "$pkg/modules/parsnip/external-images/ParsnipImage.svelte";
	import ParsnipImageCollection from "$pkg/modules/parsnip/external-images/ParsnipImageCollection.svelte";
	import ParsnipEmbedWikilink from "$pkg/modules/parsnip/ParsnipEmbedWikilink.svelte";
	import ParsnipWikilink from "$pkg/modules/parsnip/ParsnipWikilink.svelte";
	import { type PhrasingContent } from "mdast";
	import Self from "./ParsnipPhrasingChildren.svelte";
	import { page } from "$app/state";

	const { phrasingChildren }: { phrasingChildren: PhrasingContent[] } = $props();
</script>

{#each phrasingChildren as child (child)}
	{#if child.type === "text"}
		{child.value}
	{:else if child.type === "strong"}
		<strong>
			<Self phrasingChildren={child.children} />
		</strong>
	{:else if child.type === "emphasis"}
		<em>
			<Self phrasingChildren={child.children} />
		</em>
	{:else if child.type === "inlineCode"}
		<code class="inline-code">{child.value}</code>
	{:else if child.type === "link"}
		{#if child.url.includes("photo-gallery")}
			<ParsnipImageCollection url={child.url} />
		{:else}
			{@const isExternal =
				child.url.startsWith("https://") && !child.url.startsWith(page.url.origin)}
			<a href={child.url} target="_blank" rel={isExternal ? "external" : undefined}>
				<Self phrasingChildren={child.children} />
			</a>
		{/if}
	{:else if child.type === "html"}
		<!--	todo: special logic here -->
		<!--	for now, let's leave it empty	-->
	{:else if child.type === "image"}
		<ParsnipImage {...child} />
	{:else if child.type === "embedWikilink"}
		<ParsnipEmbedWikilink wikilink={child} />
	{:else if child.type === "wikilink"}
		<ParsnipWikilink wikilink={child} />
	{:else}
		{JSON.stringify(child, undefined, 2)}
	{/if}
{/each}

<script lang="ts">
	import ParsnipPhrasingChildren from "$pkg/modules/parsnip/ParsnipPhrasingChildren.svelte";
	import { type Paragraph } from "mdast";
	import ParsnipEmbedWikilink from "$pkg/modules/parsnip/ParsnipEmbedWikilink.svelte";
	// <!--	determine if we want to wrap it with p or not -->
	const { paragraph }: { paragraph: Paragraph } = $props();

	const isAllImages = paragraph.children.every(b => b.type === "embedWikilink");
</script>

{#if (isAllImages)}
	<!-- every embedwikilink are images so far? -->
	<div class="wiki-image-group">
		{#each paragraph.children as imgEl, idx (idx)}
			<ParsnipEmbedWikilink wikilink={imgEl as ParsnipEmbedWikilink} />
		{/each}
	</div>
{:else }
	<p>
		<ParsnipPhrasingChildren phrasingChildren={paragraph.children} />
	</p>
{/if}

<!--style stoken from src/lib/modules/parsnip/external-images/ParsnipImageCollection.svelte:52-->
<style>
	.wiki-image-group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: stretch;
      gap: 0.5rem 0.5lh;
	}

	:global(.wiki-image-group>*) {
      flex: 1 1 24rem;
      min-width: 0;
      max-width: 100%;
	}
</style>

<script lang="ts">
	import { PinyaCard } from "$pkg/ui/elements/PinyaCard";
	import type { ProjectGroup, SnippetMeta } from "$pkg/ui/templates/SeaweedLayout";

	let {
		title,
		entryList,
		projectComponentProps,
	}: ProjectGroup = $props();

	const isSpecial = $derived(entryList.length % 3 === 1);

	let normalUiList: SnippetMeta[] = $derived(isSpecial
		? [...entryList.slice(0, -4)]
		: [...entryList]);
	let overflowUiList: SnippetMeta[] = $derived(isSpecial
		? [...entryList.slice(-4)]
		: []);
</script>

<div class="mt-8 flex flex-col items-center">
	<PinyaCard widthClass="w-full" className="mb-8">
		<h2 class="m-auto">{title}</h2>
	</PinyaCard>
	<div class="normal-project-container">
		{#each normalUiList as ui (ui.key)}
			{@render ui.component(projectComponentProps ?? {})}
		{/each}
	</div>
	<div class="overflow-project-container">
		{#each overflowUiList as ui (ui.key)}
			{@render ui.component(projectComponentProps ?? {})}
		{/each}
	</div>
</div>

<!--todo: implement in seaweedlayout #migration-->
<!--{@html styleStr}-->

<!-- Force tailwind to pickup some classes -->
<div class="hidden rounded-2xl hover:brightness-110"></div>

<style>
    .normal-project-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: auto;
        /* 3 containers + 2 gaps + extra rem */
        max-width: calc((28rem * 3) + 5rem);
        justify-content: center;
        margin-bottom: 2rem;
        align-items: start;
    }

    .overflow-project-container {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        margin: auto;
        /* 2 containers + 1 gap + extra rem */
        max-width: calc((28rem * 2) + 3rem);
        justify-content: center;
        align-items: start;
    }
</style>

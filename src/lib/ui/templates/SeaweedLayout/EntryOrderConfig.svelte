<script lang="ts">
	import type { ProjectGroup, SnippetMeta } from "$pkg/ui/templates/index";
	import ProjectGroupConfig from "$pkg/ui/templates/SeaweedLayout/ProjectGroupConfig.svelte";

	interface Props {
		layout: ProjectGroup[];
		orderUrl: string;
		allEntries: SnippetMeta[];
	}

	let {
		layout = $bindable(),
		orderUrl = $bindable(),
		allEntries
	}: Props = $props();
</script>

<br>
<h3>Site ordering</h3>
<blockquote>Sorry! This part of the website is still WIP, but here it is anyway. As long as it functions</blockquote>

<!-- formatting: group1:entry1|entry2,group2:entry3
 : <= separates the group header, the entries, and the class
 | <= separates each entries
 , <= separates each group
 -->
<div class="advanced-setting-list">
	{#each layout as group, groupIndex (group.key)}
		<ProjectGroupConfig
			bind:layout={layout}
			bind:orderUrl={orderUrl}
			{allEntries}
			{group}
			{groupIndex}
		/>
	{/each}
</div>

<style lang="postcss">
    .advanced-setting-list {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>

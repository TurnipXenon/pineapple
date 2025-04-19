<script lang="ts">
	import type { PageMeta } from "$pkg";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();

	const pageMeta: PageMeta = $derived.by(() => {
		return {
			nestedPages: [],
			relativeLink: "",
			tags: data.parsnipEntry.tags,
			title: data.parsnipEntry.basename,
			datePublished: new Date(data.parsnipEntry.stat.ctime).toLocaleString(),
			lastUpdated: new Date(data.parsnipEntry.stat.mtime).toLocaleString()
		};
	});
</script>

<BlogTemplate pageMeta={pageMeta}>
	{#each data.parsnipEntry.ast.ast.children as child (child)}
		{#if child.type === 'paragraph'}
			<p>{JSON.stringify(child.children, undefined, 2)}</p>
		{:else}
			<p>{child.type}</p>
		{/if}
	{/each}
</BlogTemplate>

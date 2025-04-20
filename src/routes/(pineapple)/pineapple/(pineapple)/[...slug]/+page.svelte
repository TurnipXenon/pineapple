<script lang="ts">
	import type { PageMeta } from "$pkg";
	import ParsnipBlockChildren from "$pkg/modules/parsnip/ParsnipBlockChildren.svelte";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();

	const pageMeta: PageMeta = $derived({
		nestedPages: [],
		relativeLink: "",
		tags: data.parsnipEntry.tags,
		title: data.parsnipEntry.basename,
		datePublished: new Date(data.parsnipEntry.stat.ctime).toLocaleString(),
		lastUpdated: new Date(data.parsnipEntry.stat.mtime).toLocaleString()
	});
</script>

<BlogTemplate pageMeta={pageMeta}>
	<ParsnipBlockChildren blockChildren={data.parsnipEntry.ast.ast.children} />
</BlogTemplate>

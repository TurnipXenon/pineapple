<script lang="ts">
	import { OverridableMeta, type PageMeta } from "$pkg";
	import ParsnipBlockChildren from "$pkg/modules/parsnip/ParsnipBlockChildren.svelte";
	import type { ParsnipEntry } from "$pkg/modules/parsnip/ParsnipEntry";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";

	const { parsnipEntry }: { parsnipEntry: ParsnipEntry } = $props();

	const pageMeta: PageMeta = $derived({
		nestedPages: [],
		relativeLink: "",
		tags: parsnipEntry.tags,
		title: parsnipEntry.basename,
		datePublished: new Date(parsnipEntry.stat.ctime).toLocaleString(),
		lastUpdated: new Date(parsnipEntry.stat.mtime).toLocaleString()
	});
</script>

<OverridableMeta
	title={parsnipEntry.basename}
	ogTitle={parsnipEntry.basename}
	ogDescription=""
	ogImage={parsnipEntry.preview}
/>

<BlogTemplate pageMeta={pageMeta}>
	<ParsnipBlockChildren blockChildren={parsnipEntry.ast.ast.children} />
</BlogTemplate>

<script lang="ts">
	import type { PageMeta } from "$pkg/ui/modules/NavigationMenu/PageMeta";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";
	import ParsnipBlockChildren from "../ParsnipBlockChildren.svelte";
	import type { ParsnipEntry } from "../ParsnipEntry";

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

<BlogTemplate pageMeta={pageMeta}>
	<ParsnipBlockChildren blockChildren={parsnipEntry.ast.ast.children} />
</BlogTemplate>

<script lang="ts">
	import { OverridableMeta } from "$pkg/modules/overrideable_meta/index";
	import type { PageMeta } from "$pkg/ui/modules/NavigationMenu/PageMeta";
	import { getCmsBaseUrl } from "$pkg/util/env-getter";
	import ParsnipBlockChildren from "../ParsnipBlockChildren.svelte";
	import type { ParsnipEntry } from "../ParsnipEntry";
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
	ogDescription={parsnipEntry.tagline}
	ogImage={`${getCmsBaseUrl()}/${parsnipEntry.preview}`}
/>

<BlogTemplate pageMeta={pageMeta}>
	<ParsnipBlockChildren blockChildren={parsnipEntry.ast.ast.children} />
</BlogTemplate>

<script lang="ts">
	import pageMeta from "./meta.json";
	import { page } from "$app/stores";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";
</script>

<BlogTemplate pageMeta={pageMeta}>
	<p>{$page.url}</p>
</BlogTemplate>

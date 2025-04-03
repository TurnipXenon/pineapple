<script lang="ts">
	import pageMeta from "./meta.json";
	import { page } from "$app/state";
	import BlogTemplate from "$pkg/ui/templates/blog_template/BlogTemplate.svelte";
</script>

<BlogTemplate pageMeta={pageMeta} shouldFillWholePage={true}>
	<p>{page.url}</p>
	<h1>Test aoisdhfaks fasd fadskdfh kadsfhasjkfasd fklasdklf hadsklf adshfladslfadsf </h1>
	<h1>Test aoisdhfaks fasd fadskdfh kadsfhasjkfasd fklasdklf hadsklf adshfladslfadsf </h1>
	<h1>Test aoisdhfaks fasd fadskdfh kadsfhasjkfasd fklasdklf hadsklf adshfladslfadsf </h1>
	<h1>Test aoisdhfaks fasd fadskdfh kadsfhasjkfasd fklasdklf hadsklf adshfladslfadsf </h1>
	<h1>Test aoisdhfaks fasd fadskdfh kadsfhasjkfasd fklasdklf hadsklf adshfladslfadsf </h1>
</BlogTemplate>

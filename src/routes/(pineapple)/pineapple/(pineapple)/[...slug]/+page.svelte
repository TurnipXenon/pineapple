<script lang="ts">
	import ParsnipBlog from "$pkg/modules/parsnip/route-util/ParsnipBlog.svelte";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();
</script>

<ParsnipBlog parsnipEntry={data.parsnipEntry} />

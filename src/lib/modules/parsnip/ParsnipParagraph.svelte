<script lang="ts">
	import ParsnipPhrasingChildren from "$pkg/modules/parsnip/ParsnipPhrasingChildren.svelte";
	import { type Paragraph } from "mdast";
	// <!--	determine if we want to wrap it with p or not -->
	const { paragraph }: { paragraph: Paragraph } = $props();
</script>

<p>
	<ParsnipPhrasingChildren phrasingChildren={paragraph.children} />
</p>

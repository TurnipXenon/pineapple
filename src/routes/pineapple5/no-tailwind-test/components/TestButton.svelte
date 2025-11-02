<script lang="ts">

	// import type { Snippet } from "svelte";

	// interface Props {
	// 	// children: Snippet;
	// }

	import type { HTMLAttributes } from "svelte/elements";

	let _props: HTMLAttributes<HTMLDivElement> = $props();
</script>
<div {..._props}>
	<div>1</div>
	<div>2</div>
</div>

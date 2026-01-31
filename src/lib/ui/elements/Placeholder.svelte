<!-- TODO: Documentation: consider documentation showcase -->

<!-- @component Placeholder
 todo: consider current-surface scss
 -->

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";

	let {
		isCircle = false,
		classes = '',
		...props
	}: {
		isCircle?: boolean;
		classes?: string;
	} & HTMLAttributes<HTMLDivElement>= $props();
</script>

<div
	{...props}
	class="
	{isCircle ?'placeholder-circle' : 'placeholder'}
	animate-pulse bg-surface-600 dark:bg-surface-800
	{classes}
"
></div>

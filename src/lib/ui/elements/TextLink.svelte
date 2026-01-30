<!-- @component TextLink
 todo: consider current-surface scss
 -->

<script lang="ts">
	import { type Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";

	let {
		children,
		...props
	}: { href: string, children: Snippet } & HTMLAnchorAttributes = $props();
</script>

<a
	{...props}
	class="visited:text-surface-950 dark:visited:text-surface-400">
	{@render children?.()}
</a>

<style>
</style>

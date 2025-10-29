<!-- TODO: Migration: review and migrate this component -->

<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		children,
		href
	}: { href: string, children: Snippet } = $props();
</script>

<a
	{href}
	class="visited:text-surface-950 dark:visited:text-surface-400">
	{@render children?.()}
</a>

<style>
</style>

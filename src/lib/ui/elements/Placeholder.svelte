<script lang="ts">
	let {
		isCircle = false,
		classes = '',
	}: {
		isCircle?: boolean;
		classes?: string;
	} = $props();
</script>

<div
	class="
	{isCircle ?'placeholder-circle' : 'placeholder'}
	animate-pulse bg-surface-600 dark:bg-surface-800
	{classes}
"
></div>

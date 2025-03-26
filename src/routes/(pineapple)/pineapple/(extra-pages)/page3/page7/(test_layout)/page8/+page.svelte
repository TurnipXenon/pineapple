<script lang="ts">
	import { Card } from "$pkg/components/index";
	import { page } from "$app/stores";
</script>

<Card>
	{#snippet content()}
		<h1  class="default-card">{$page.url}</h1>
	{/snippet}
</Card>
<script lang="ts">
	import { page } from "$app/stores";
	import { Card } from "$pkg/components/index";
</script>

<Card>
	{#snippet content()}
		<h1  class="default-card">{$page.url}</h1>
	{/snippet}
</Card>
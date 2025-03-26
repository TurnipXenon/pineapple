<script>
	import { Card } from "$pkg/components/index.js";
	import { page } from "$app/stores";
</script>

<Card>
	{#snippet content()}
		<h1  class="default-card">{$page.url}</h1>
	{/snippet}
</Card>
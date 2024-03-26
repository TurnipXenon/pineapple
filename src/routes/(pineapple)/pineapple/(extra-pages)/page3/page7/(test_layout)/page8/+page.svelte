<script>
	import { Card } from "$pkg";
	import { page } from "$app/stores";
</script>

<Card>
	<h1 slot="content" class="default-card">{$page.url}</h1>
</Card>
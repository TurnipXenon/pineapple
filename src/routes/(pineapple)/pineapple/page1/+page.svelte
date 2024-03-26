<!--{
	"title": "Custom title for page 1",
	"image": "/favicon.png",
	"tags": ["random"]
}-->
<script>
	import { Card } from "$pkg";
	import { page } from "$app/stores";
</script>

<Card>
	<h1 slot="content" class="default-card">{$page.url}</h1>
</Card>
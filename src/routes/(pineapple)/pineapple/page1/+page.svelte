<!--{
	"title": "Custom title for page 1",
	"image": "$pkg/assets/characters/ares/ares_happy.webp"
}-->
<script>
	import { Card } from "$pkg";
	import { page } from "$app/stores";
</script>

<Card>
	<h1 slot="content" class="default-card">{$page.url}</h1>
</Card>
<script lang="ts">
	import { page } from "$app/stores";
	import { PinyaCard } from "$pkg/ui/elements/index";
</script>

<PinyaCard>
	<h1 class="default-card">{$page.url}</h1>
</PinyaCard>
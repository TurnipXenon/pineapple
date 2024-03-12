<script lang="ts">
	import PinyaBaseLayout from "$lib/components/layouts/PineappleBaseLayout.svelte";
	import { PUBLIC_CRINGE_USERNAME } from "$env/static/public";
</script>

<svelte:head>
	<title>{PUBLIC_CRINGE_USERNAME}</title>
	<meta content="summary" name="Turnip time!" />
	<meta content="@{PUBLIC_CRINGE_USERNAME}" name="twitter:site" />
	<meta content="@{PUBLIC_CRINGE_USERNAME}" name="twitter:creator" />
	<meta content="https://www.{PUBLIC_CRINGE_USERNAME}.com/" name="og:url" />
	<meta content="{PUBLIC_CRINGE_USERNAME} | Home" name="og:title" />
	<meta
		content="I have no idea! Anyway... Hi! I don't know what I'm doing! Also check out my games!"
		name="og:description"
	/>
	<meta content="https://www.{PUBLIC_CRINGE_USERNAME}.com/default-card.png" property="og:image" />
</svelte:head>

<PinyaBaseLayout>
	<slot />
</PinyaBaseLayout>


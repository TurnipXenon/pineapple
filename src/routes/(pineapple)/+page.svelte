<script>
	import { PUBLIC_CRINGE_USERNAME } from "$env/static/public";


	import { createGoToFunction } from "$pkg/util/util";
	import { Card } from "$pkg";
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_CRINGE_USERNAME}'s Home</title>
	<meta content="Welcome to {PUBLIC_CRINGE_USERNAME}'s Home" name="og:title" />
	<meta
		content="Welcome to {PUBLIC_CRINGE_USERNAME}'s home! It's a neat place to be at if you're feeling lost. Come hang around!"
		name="og:description"
	/>
</svelte:head>

<Card>
	<div slot="content" class="content">
		<h1 class="mb-8" style="font-weight: bolder">Directory</h1>

		<div class="turnip-menu">
			<button on:click={createGoToFunction("pineapple")}><h2>Pineapple playground</h2></button>
			<button on:click={createGoToFunction("portfolio")}><h2>Seaweed playground</h2></button>
		</div>
	</div>
</Card>

<style lang="postcss">
    .turnip-menu {
        padding: 2em;
        display: flex;
        gap: 2em;
        flex-direction: column;
    }

    button {
        @apply btn variant-filled-secondary;
    }

    .content {
        padding: 2em;
        text-align: center;
    }
</style>

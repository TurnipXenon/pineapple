<script>
	import { PUBLIC_CRINGE_USERNAME } from "$env/static/public";

	import { createGoToFunction } from "$pkg/util/create_go_to_function";
	import PineappleBaseLayout from "$pkg/components/pineapple/PineappleBaseLayout.svelte";
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_CRINGE_USERNAME}'s Home</title>
	<meta content="Welcome to {PUBLIC_CRINGE_USERNAME}'s Home" name="og:title" />
	<meta
		content="Welcome to {PUBLIC_CRINGE_USERNAME}'s home! It's a neat place to be at if you're feeling lost. Come hang around!"
		name="og:description"
	/>
</svelte:head>

<div class="card default-card">
	<h1 class="mb-8">Directory</h1>

	<div class="btn-group-vertical variant-filled-secondary">
		<button on:click={createGoToFunction("pineapple")}><h2>Pineapple playground</h2></button>
		<button on:click={createGoToFunction("portfolio")}><h2>Seaweed playrground</h2></button>
	</div>
</div>

<style lang="postcss">
    .btn-group-vertical button {
        padding: 2em;
    }

    .default-card {
        text-align: center;
        padding-inline-end: 0;
        @apply p-16;
    }
</style>

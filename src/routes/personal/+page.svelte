<script>
    import {PUBLIC_CRINGE_USERNAME} from "$env/static/public";
</script>

<svelte:head>
	<title>Welcome to {PUBLIC_CRINGE_USERNAME}'s Home</title>
	<meta content="Welcome to {PUBLIC_CRINGE_USERNAME}'s Home" name="og:title"/>
	<meta
			content="Welcome to {PUBLIC_CRINGE_USERNAME}'s home! It's a neat place to be at if you're feeling lost. Come hang around!"
			name="og:description"
	/>
</svelte:head>

<div class="card default-card">

		<h1 class="mb-8">Directory</h1>

		<div class="btn-group-vertical variant-filled-secondary">
			<button onclick="location.href='/about'"><h2>About</h2></button>
			<button onclick="location.href='/socials'"><h2>Socials</h2></button>
			<button onclick="location.href='/game-dev'"><h2>Game development</h2></button>
			<button onclick="location.href='/blogs'"><h2>Blogs</h2></button>
			<button onclick="location.href='/misc'"><h2>Miscellaneous</h2></button>
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

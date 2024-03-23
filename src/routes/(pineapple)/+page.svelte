<script>
	import { createGoToFunction } from "$pkg/util/util";
	import { Card } from "$pkg";
</script>

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
